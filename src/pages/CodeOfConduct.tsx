import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Shield,
    Play,
    CheckCircle2,
    AlertCircle,
    Loader2,
    LogOut,
    Award,
    ChevronRight,
    Info,
    Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { videoService } from "@/services/videoService";
import { VideoListItem, VideoResponse } from "@/types/video";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";
import { refreshAuthToken, updateUserExamStatus } from "@/services/authService";

export default function CodeOfConduct() {
    // ── All sorted video IDs from the API (source of truth for ordering) ──────
    const [allSortedVideoIds, setAllSortedVideoIds] = useState<number[]>([]);
    // ── IDs the user has already passed — stored in localStorage as JSON array ─
    const [completedVideoIds, setCompletedVideoIds] = useState<number[]>([]);
    // ── The video ID currently being shown to the user ────────────────────────
    const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);

    const [videoData, setVideoData] = useState<VideoResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isVideoFullyWatched, setIsVideoFullyWatched] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [currentTimeDisplay, setCurrentTimeDisplay] = useState("00:00");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef<HTMLVideoElement>(null);
    const maxTimeWatchedRef = useRef<number>(0);

    const { user } = useSelector((state: RootState) => state.auth);
    // Key is user-scoped so two drivers on the same device never clash
    const PROGRESS_KEY = user ? `ausempi_coc_progress_${user.id}` : "ausempi_coc_progress_guest";

    // ── Helpers ───────────────────────────────────────────────────────────────
    /** Read completed video ID set from localStorage (safe parse). */
    const readCompletedIds = (key: string): number[] => {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.map(Number) : [];
        } catch {
            return [];
        }
    };

    /** Persist updated completed ID set to localStorage. */
    const writeCompletedIds = (key: string, ids: number[]) => {
        localStorage.setItem(key, JSON.stringify(ids));
    };

    // ── Step 1: Load all videos, cross-reference with completed IDs ───────────
    useEffect(() => {
        // AUTHORITY CHECK: if backend says exam is done, skip everything.
        // This is the only source of truth for a fully-completed exam.
        if (user?.isExamCompleted) {
            setIsCompleted(true);
            setIsLoading(false);
            return;
        }

        const loadVideos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const allVideos: VideoListItem[] = await videoService.getAllVideos();

                // Sort: explicit videoOrder first (asc), then createdAt as stable fallback
                const sorted = [...allVideos].sort((a, b) => {
                    const aOrder = a.videoOrder ?? Number.MAX_SAFE_INTEGER;
                    const bOrder = b.videoOrder ?? Number.MAX_SAFE_INTEGER;
                    if (aOrder !== bOrder) return aOrder - bOrder;
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });

                const sortedIds = sorted.map((v) => v.id);
                setAllSortedVideoIds(sortedIds);

                if (sortedIds.length === 0) {
                    setError("No training modules are available at the moment. Please contact administration.");
                    setIsLoading(false);
                    return;
                }

                // Read which video IDs this user has already passed from localStorage.
                // We do NOT trust an integer index anymore — we compare actual IDs.
                const doneIds = readCompletedIds(PROGRESS_KEY);
                setCompletedVideoIds(doneIds);

                // Remaining = videos in the current live list that are NOT yet completed.
                // This automatically handles admin add/delete correctly:
                //   - deleted video IDs in doneIds are ignored (not in sortedIds)
                //   - newly added video IDs appear in sortedIds and are not in doneIds
                const remaining = sortedIds.filter((id) => !doneIds.includes(id));

                if (remaining.length === 0) {
                    // All current videos are done — treat as complete locally.
                    // Note: isExamCompleted on backend is the true authority;
                    // this covers the edge case where the flag hasn't synced yet.
                    setIsCompleted(true);
                    setIsLoading(false);
                } else {
                    // Show the first remaining video in sorted order
                    setCurrentVideoId(remaining[0]);
                    // fetchVideo is triggered by the useEffect below
                }
            } catch (err) {
                console.error("Error loading video list:", err);
                setError("An error occurred while loading the training modules. Please try again later.");
                setIsLoading(false);
            }
        };

        loadVideos();
    }, [user, PROGRESS_KEY]);

    // ── Step 2: Fetch video detail whenever the current video ID changes ───────
    useEffect(() => {
        if (currentVideoId !== null) {
            fetchVideo(currentVideoId);
        }
    }, [currentVideoId]);


    const fetchVideo = async (id: number) => {
        setIsLoading(true);
        setError(null);
        setUserAnswers({});
        setIsPlaying(false);
        setIsVideoFullyWatched(false);
        setVideoProgress(0);
        setCurrentTimeDisplay("00:00");
        maxTimeWatchedRef.current = 0;

        try {
            const data = await videoService.getVideoById(id);
            setVideoData(data);
        } catch (err: unknown) {
            console.error("Error fetching video:", err);
            setError("An Error Occurred In the Process. Please contact the administration or try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await dispatch(logout());
        // Cookies.remove("refreshToken");
        // navigate("/driver-login");
    };

    const handleOptionChange = (questionId: number, optionId: number) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleSubmit = async () => {
        if (!videoData || currentVideoId === null) return;

        const totalQuestions = videoData.questionDtos.length;
        const answeredCount = Object.keys(userAnswers).length;

        if (answeredCount < totalQuestions) {
            toast.error("Incomplete Quiz", {
                description: "Please answer all questions before submitting."
            });
            return;
        }

        setIsSubmitLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const result = await videoService.submitAssessment(videoData.id, userAnswers);

            if (result.passed) {
                toast.success("Assessment Passed!", {
                    description: `Your assessment has been validated. You scored ${result.score.toFixed(0)}%.`
                });

                // Add the just-passed video ID to the completed set and persist it.
                // We store IDs — not an index — so admin changes never corrupt progress.
                const updatedCompleted = [...completedVideoIds, currentVideoId];
                writeCompletedIds(PROGRESS_KEY, updatedCompleted);
                setCompletedVideoIds(updatedCompleted);

                // Remaining = live sorted list minus every completed ID
                const remaining = allSortedVideoIds.filter(
                    (id) => !updatedCompleted.includes(id)
                );

                if (remaining.length === 0) {
                    // No more videos left — update exam status on the backend,
                    // then refresh the token so Redux gets the latest isExamCompleted,
                    // and only then show the congratulations screen.
                    try {
                        if (user?.id) {
                            await updateUserExamStatus(user.id, 1);
                        }
                    } catch (statusErr) {
                        console.error("Failed to update exam status:", statusErr);
                        toast.error("Status Update Failed", {
                            description: "Could not record your exam completion. Please contact administration."
                        });
                    }

                    try {
                        await refreshAuthToken();
                    } catch (refreshErr) {
                        console.error("Token refresh after exam completion failed:", refreshErr);
                        // Non-fatal — the user still completed the exam; Redux will
                        // pick up the correct state on the next proactive refresh.
                    }

                    setIsCompleted(true);
                } else {
                    // Move to the next remaining video in sorted order
                    setCurrentVideoId(remaining[0]);
                }
            } else {
                toast.error("Assessment Failed", {
                    description: `You scored ${result.score.toFixed(0)}%. An 80% pass rate is required. Please review the video and try again.`
                });
            }
        } catch (err) {
            console.error("Submission error:", err);
            toast.error("Submission Failed", {
                description: "An error occurred while validating your assessment. Please try again."
            });
        } finally {
            setIsSubmitLoading(false);
        }
    };

    if (isLoading && !isCompleted) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground animate-pulse font-display tracking-widest text-sm uppercase">Preparing your conduct module...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-3xl font-display font-bold mb-4 text-white">System Error</h1>
                <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
                    {error}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button
                        onClick={() => {
                            setError(null);
                            setIsLoading(true);
                            if (currentVideoId !== null) {
                                fetchVideo(currentVideoId);
                            } else {
                                window.location.reload();
                            }
                        }}
                        variant="outline"
                        className="border-primary/20 hover:bg-primary/5"
                    >
                        Try Again
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                        className="border-primary/20 hover:bg-primary/5"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Return to Home
                    </Button>
                    <Button onClick={handleLogout} variant="ghost" className="text-muted-foreground">
                        Sign Out
                    </Button>
                </div>
            </div>
        );
    }

    if (isCompleted) {
        const clean = (v?: string | null) => (v && v !== "null" ? v : "");
        const driverName =
            clean(user?.employeeName)
            || [clean(user?.firstName), clean(user?.lastName)].filter(Boolean).join(" ")
            || "Driver";

        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                {/* Animated Background Orbs */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/20 blur-[180px] rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-200px] left-1/4 w-[600px] h-[600px] bg-yellow-500/10 blur-[140px] rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-[-100px] right-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full"
                    />
                    {/* Floating particles */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-primary/60"
                            style={{
                                left: `${8 + i * 8}%`,
                                bottom: "-10px",
                            }}
                            animate={{
                                y: [0, -(400 + (i % 4) * 120)],
                                opacity: [0, 0.8, 0],
                                x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5)],
                            }}
                            transition={{
                                duration: 4 + (i % 4),
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 flex flex-col items-center max-w-xl w-full">
                    {/* Award Badge with rings */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                        className="relative mb-10"
                    >
                        {/* Pulsing rings */}
                        <motion.div
                            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full bg-primary/30"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                            className="absolute inset-0 rounded-full bg-primary/20"
                        />
                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-yellow-500/20 border border-primary/40 flex items-center justify-center shadow-2xl shadow-primary/20">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-yellow-400/10 border border-primary/30 flex items-center justify-center">
                                <Award className="w-14 h-14 text-primary drop-shadow-[0_0_12px_rgba(var(--primary)/0.8)]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.25em] uppercase mb-5">
                            <CheckCircle2 className="w-3 h-3" />
                            Training Complete
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-display font-bold mb-3 text-gradient-gold leading-tight">
                            Congratulations!
                        </h1>
                        {driverName !== "Driver" ? (
                            <p className="text-xl text-white/70 font-light mb-2">
                                Well done, <span className="text-white font-semibold">{driverName}</span>
                            </p>
                        ) : null}
                    </motion.div>

                    {/* Completion Certificate Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="w-full mt-8 mb-8 p-6 rounded-sm bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-4 text-left">
                            <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-white font-display font-semibold text-base mb-1">
                                    Code of Conduct — Certified
                                </h2>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    You have successfully completed all Employer Code of Conduct training modules and all assessments with a passing score. Your commitment to our standards has been recorded.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-3 w-full"
                    >
                        <Button
                            onClick={() => navigate("/")}
                            className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest h-12 rounded-sm shadow-xl shadow-primary/10"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Return to Home
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="flex-1 text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 h-12 rounded-sm uppercase tracking-widest text-xs font-bold"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-foreground flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 py-4 px-6 lg:px-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-display text-lg font-bold text-white tracking-wide">Code of Conduct</h1>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Driver Assessment Module</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end gap-1.5 mr-4">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Progress</span>
                        <div className="flex items-center gap-3">
                            {/* completedVideoIds that are still in the live list = genuinely done modules */}
                            {(() => {
                                const doneInList = allSortedVideoIds.filter((id) => completedVideoIds.includes(id)).length;
                                const total = allSortedVideoIds.length;
                                return (
                                    <>
                                        <span className="text-xs font-mono text-primary">
                                            {doneInList} / {total}
                                        </span>
                                        <Progress
                                            value={total > 0 ? (doneInList / total) * 100 : 0}
                                            className="w-32 h-1.5"
                                        />
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/")}
                        className="text-muted-foreground hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest font-bold"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-muted-foreground hover:text-white hover:bg-white/5 transition-all text-xs uppercase tracking-widest font-bold"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Exit
                    </Button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-6 py-12 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Video and Info */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative aspect-video rounded-sm overflow-hidden border border-white/10 bg-black group"
                        >
                            {videoData?.viewVideoUrl && (
                                <video
                                    key={videoData.viewVideoUrl}
                                    ref={playerRef}
                                    controls={isVideoFullyWatched}
                                    controlsList="nodownload"
                                    className="w-full h-full object-contain"
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onEnded={() => setIsVideoFullyWatched(true)}
                                    onTimeUpdate={(e) => {
                                        const vid = e.currentTarget;
                                        if (vid.duration) {
                                            setVideoProgress((vid.currentTime / vid.duration) * 100);
                                        }
                                        const m = Math.floor(vid.currentTime / 60).toString().padStart(2, '0');
                                        const s = Math.floor(vid.currentTime % 60).toString().padStart(2, '0');
                                        setCurrentTimeDisplay(`${m}:${s}`);

                                        if (!isVideoFullyWatched && playerRef.current) {
                                            if (playerRef.current.currentTime > maxTimeWatchedRef.current + 1) {
                                                playerRef.current.currentTime = maxTimeWatchedRef.current;
                                            } else {
                                                maxTimeWatchedRef.current = playerRef.current.currentTime;
                                            }
                                        }
                                    }}
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    {/* Explicit type tells the browser this is MP4 even though the URL has no extension */}
                                    <source src={videoData.viewVideoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            {/* Custom Progress Bar for Uncompleted Video */}
                            {!isVideoFullyWatched && isPlaying && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 z-10 pointer-events-none animate-in fade-in duration-500">
                                    <div className="px-6 pb-3 flex justify-between items-center text-xs font-mono text-primary font-bold">
                                        <span>{currentTimeDisplay}</span>
                                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] tracking-widest uppercase animate-pulse">
                                            Watching Required
                                        </div>
                                        <span>
                                            {Math.floor((videoData?.durationSeconds || 0) / 60).toString().padStart(2, '0')}:
                                            {((videoData?.durationSeconds || 0) % 60).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 w-full relative flex-shrink-0">
                                        <div
                                            className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_12px_rgba(var(--primary)/0.6)] transition-all duration-300 ease-linear"
                                            style={{ width: `${videoProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {!isPlaying && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-all group-hover:bg-black/20"
                                    onClick={() => {
                                        playerRef.current?.play();
                                    }}
                                >
                                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 transform transition-transform group-hover:scale-110">
                                        <Play className="w-8 h-8 text-black fill-black ml-1" />
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                                {/* Position of this video in the live sorted list (1-indexed) */}
                                Module {currentVideoId !== null ? allSortedVideoIds.indexOf(currentVideoId) + 1 : "—"}
                            </div>
                            <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">{videoData?.title}</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed font-light">
                                {videoData?.description}
                            </p>

                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
                                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/5">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Duration</span>
                                    <p className="text-white font-mono">
                                        {Math.floor((videoData?.durationSeconds || 0) / 60)}:{(videoData?.durationSeconds || 0) % 60 < 10 ? '0' : ''}{(videoData?.durationSeconds || 0) % 60} mins
                                    </p>
                                </div>
                                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/5">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Questions</span>
                                    <p className="text-white font-mono">{videoData?.questionDtos.length} Required</p>
                                </div>
                                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Pass Mark</span>
                                    <p className="text-primary font-mono font-bold">80% Minimum</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Quiz */}
                    <div className={`lg:col-span-4 sticky top-32 transition-all duration-500 ${!isVideoFullyWatched ? "blur-md pointer-events-none select-none opacity-60" : ""}`}>
                        <Card className="bg-white/[0.03] border-white/10 rounded-sm shadow-2xl overflow-hidden">
                            <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Self Assessment</span>
                                </div>
                                <CardTitle className="text-xl font-display text-white">Quiz Module</CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">Answer correctly to proceed to the next module.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-10 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                                {videoData?.questionDtos.map((question, index) => (
                                    <div key={question.id} className="space-y-4">
                                        <div className="flex gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center border border-primary/30">
                                                {index + 1}
                                            </span>
                                            <h3 className="text-sm font-medium text-white/90 leading-relaxed">{question.questionText}</h3>
                                        </div>

                                        <RadioGroup
                                            className="gap-3 ml-9"
                                            value={userAnswers[question.id]?.toString()}
                                            onValueChange={(val) => handleOptionChange(question.id, parseInt(val))}
                                        >
                                            {question.optionDtos.map((option) => (
                                                <div key={option.id} className="flex items-center space-x-3 group animate-in fade-in slide-in-from-left-2 duration-300">
                                                    <RadioGroupItem
                                                        value={option.id.toString()}
                                                        id={`opt-${option.id}`}
                                                        className="border-white/20 text-primary focus:ring-primary h-4 w-4"
                                                    />
                                                    <Label
                                                        htmlFor={`opt-${option.id}`}
                                                        className="text-xs text-muted-foreground cursor-pointer group-hover:text-white transition-colors py-1"
                                                    >
                                                        {option.optionText}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="flex-col gap-4 border-t border-white/5 bg-white/[0.02] pt-6">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitLoading}
                                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest text-xs h-12 rounded-sm shadow-xl shadow-primary/5"
                                >
                                    {isSubmitLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            Submit Assessment
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                                {/* <div className="flex items-center gap-2 text-muted-foreground/40 italic">
                                    <Info className="w-3 h-3" />
                                    <span className="text-[9px]">Assessment results are recorded and validated server-side.</span>
                                </div> */}
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/2 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 opacity-50" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>
        </div>
    );
}
