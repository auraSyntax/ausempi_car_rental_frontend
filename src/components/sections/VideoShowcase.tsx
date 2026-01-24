import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from "lucide-react";
import videoSrc from "@/assets/ausempi-video.mp4";
import thumbnailSrc from "@/assets/ausempi-video-thumbnail.avif";

const VideoShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(containerRef, { amount: 0.2 });

    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0.1, 0.4], isMobile ? [1, 1] : [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const y = useTransform(scrollYProgress, [0.1, 0.4], isMobile ? [0, 0] : [100, 0]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;

            // Check if video is already ready
            if (videoRef.current.readyState >= 3) {
                setIsVideoReady(true);
            }

            if (isInView && isPlaying) {
                // Use a promise to handle the potential play() rejection (e.g., due to browser restrictions)
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Auto-play was prevented
                        setIsPlaying(false);
                    });
                }
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView, isPlaying]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                // When pausing, ensure controls are visible on mobile
                if (isMobile) setIsHovered(true);
            } else {
                videoRef.current.play();
                // When playing, hide controls after starting
                if (isMobile) setIsHovered(false);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);

            // When unmuting, if volume is 0, set it to 0.5
            if (!newMuted && volume === 0) {
                setVolume(0.5);
                videoRef.current.volume = 0.5;
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            if (newVolume > 0) {
                videoRef.current.muted = false;
                setIsMuted(false);
            } else {
                videoRef.current.muted = true;
                setIsMuted(true);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current && containerRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const clickedPos = (x / rect.width) * videoRef.current.duration;
            videoRef.current.currentTime = clickedPos;
        }
    };

    // Auto-hide controls on mobile after inactivity when playing
    useEffect(() => {
        if (isMobile && isHovered && isPlaying) {
            const timer = setTimeout(() => {
                setIsHovered(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isHovered, isPlaying, isMobile]);

    return (
        <section className="relative w-full section-padding overflow-hidden bg-[#050505]">
            {/* Editorial Background Text */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden w-full h-full items-center justify-center">
                <span className="text-[18vw] font-display font-black text-white/[0.02] whitespace-nowrap leading-none tracking-tighter uppercase">
                    Ausempi
                </span>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
            </div>

            <div className="container-luxury relative z-10">
                <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-primary">Cinematic Experience</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black mb-8 leading-[1.1] tracking-tight text-white"
                    >
                        Experience Luxury <br className="hidden sm:block" />
                        <span className="text-gradient-gold block italic">In Motion</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-white/50 text-base sm:text-lg md:text-xl max-w-2xl font-body leading-relaxed"
                    >
                        Witness the unparalleled commitment to service and style that defines
                        Ausempi. Every journey is a cinematic masterpiece of comfort and precision.
                    </motion.p>
                </div>

                <motion.div
                    ref={containerRef}
                    style={{ scale, opacity, y }}
                    onMouseEnter={() => !isMobile && setIsHovered(true)}
                    onMouseLeave={() => !isMobile && setIsHovered(false)}
                    onClick={() => isMobile && setIsHovered(!isHovered)}
                    className="relative group aspect-[4/3] sm:aspect-video w-full max-w-6xl mx-auto rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0A0A0A]"
                >
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={thumbnailSrc}
                        className="w-full h-full object-cover"
                        loop
                        muted={isMuted}
                        playsInline
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onCanPlay={() => setIsVideoReady(true)}
                    />

                    {/* Thumbnail Overlay (Fallback/Loading) */}
                    <AnimatePresence>
                        {!isVideoReady && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 z-10"
                            >
                                <img
                                    src={thumbnailSrc}
                                    alt="Video Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Subtle Overlay */}
                    <div className={`absolute inset-0 bg-black/30 transition-opacity duration-700 ${isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'}`} />

                    {/* ALWAYS Center Play/Pause Button Container */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <AnimatePresence>
                            {(!isPlaying || isHovered) && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePlay();
                                    }}
                                    className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-black transition-all duration-500 shadow-2xl group/btn"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 fill-current" />
                                    ) : (
                                        <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 fill-current ml-1.5" />
                                    )}
                                    <div className="absolute inset-[-8px] rounded-full border border-white/5 group-hover/btn:border-primary/50 transition-colors duration-500 animate-pulse" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Control Bar - Polished and Responsive */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isHovered || !isPlaying ? 1 : 0,
                            y: isHovered || !isPlaying ? 0 : 30
                        }}
                        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-30"
                    >
                        <div className="flex flex-col gap-4 sm:gap-6">
                            {/* Premium Progress Bar */}
                            <div
                                className="group/progress relative w-full h-1 sm:h-1.5 bg-white/10 rounded-full cursor-pointer transition-all hover:h-2 sm:hover:h-2.5"
                                onClick={handleSeek}
                            >
                                <div
                                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                    style={{ width: `${progress}%` }}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-xl scale-0 group-hover/progress:scale-100 transition-transform duration-300"
                                    style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                                />
                            </div>

                            {/* Controls Bar */}
                            <div className="flex items-center justify-between text-white/90">
                                <div className="flex items-center gap-4 sm:gap-8">
                                    <button onClick={togglePlay} className="hover:text-primary transition-all duration-300 transform hover:scale-110 active:scale-95" aria-label={isPlaying ? "Pause" : "Play"}>
                                        {isPlaying ? <Pause size={isMobile ? 20 : 24} className="fill-current" /> : <Play size={isMobile ? 20 : 24} className="fill-current" />}
                                    </button>

                                    <div className="flex items-center gap-2 sm:gap-4 group/volume relative">
                                        <button onClick={toggleMute} className="hover:text-primary transition-all duration-300 transform hover:scale-110" aria-label={isMuted ? "Unmute" : "Mute"}>
                                            {(isMuted || volume === 0) ? <VolumeX size={isMobile ? 20 : 24} /> : <Volume2 size={isMobile ? 20 : 24} />}
                                        </button>
                                        <div className="flex w-0 group-hover/volume:w-24 overflow transition-all duration-500 ease-in-out items-center">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                className="volume-slider w-20 sm:w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all shrink-0"
                                                style={{
                                                    background: `linear-gradient(to right, hsl(var(--primary)) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.2) ${(isMuted ? 0 : volume) * 100}%)`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-6">
                                    <div className="flex items-center bg-black/40 backdrop-blur-md px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/5">
                                        <span className="text-[9px] sm:text-[11px] font-bold tracking-widest tabular-nums font-body">
                                            {Math.floor((videoRef.current?.currentTime || 0) / 60)}:
                                            {Math.floor((videoRef.current?.currentTime || 0) % 60).toString().padStart(2, '0')}
                                        </span>
                                        <span className="mx-1.5 sm:mx-2 text-white/20">/</span>
                                        <span className="text-[9px] sm:text-[11px] font-bold tracking-widest opacity-40 tabular-nums font-body">
                                            {Math.floor(duration / 60)}:
                                            {Math.floor(duration % 60).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                    <button
                                        className="hover:text-primary transition-all duration-300 transform hover:scale-110 p-1"
                                        onClick={() => videoRef.current?.requestFullscreen()}
                                        title="Fullscreen"
                                    >
                                        <Maximize2 size={isMobile ? 18 : 20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Corner Info */}
                    <div className="absolute top-5 left-5 lg:top-8 lg:left-8 hidden md:flex items-center gap-3 p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 opacity-60">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">AUSEMPI</span>
                            {/* <span className="text-[9px] text-white/40 uppercase tracking-[0.1em]">Ultra HD 4K</span> */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoShowcase;
