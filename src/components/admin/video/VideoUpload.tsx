
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, X, Film, AlertCircle, FileVideo, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import { cn } from "@/lib/utils";

interface VideoUploadProps {
    value?: string;
    onChange: (value: string) => void;
    previewUrl?: string; // Initial URL for editing
    className?: string;
    error?: string;
}

export const VideoUpload = ({ value, onChange, previewUrl, className, error }: VideoUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentPreview, setCurrentPreview] = useState<string | null>(previewUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Update preview if prop changes (e.g. form reset or data load) AND we haven't just uploaded something new
        if (previewUrl && !isUploading) {
            setCurrentPreview(previewUrl);
        }
    }, [previewUrl, isUploading]);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        // 1. File Type (extension and mime)
        const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        // Basic extension check as well
        const validExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

        if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
            toast.error("Invalid file type", {
                description: "Please upload a valid video file (MP4, WebM, OGG).",
            });
            return;
        }

        // 2. Size (10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            toast.error("File too large", {
                description: "Video size must be less than 10MB.",
            });
            return;
        }

        // Upload Logic
        setIsUploading(true);
        setProgress(0);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post("/v1/file-upload/upload-video", formData, {
                requiresAuth: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || file.size)
                    );
                    setProgress(percentCompleted);
                },
            });

            const { data, success } = response.data;

            if (success) {
                onChange(data.public_id);
                setCurrentPreview(data.url);
                toast.success("Video uploaded successfully");
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
            toast.error("Upload failed", {
                description: "Please try again later.",
            });
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = "";
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = async () => {
        // Instant UI update
        setCurrentPreview(null);
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";

        // Background delete call (placeholder as per requirements)
        if (value) {
            try {
                // await api.delete(`/file-upload/delete-video/${value}`); 
                console.log(`Background delete video: ${value}`);
            } catch (err) {
                console.error("Failed to delete video in background", err);
            }
        }
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Upload State or Preview State */}
            {currentPreview ? (
                <div className="relative rounded-lg overflow-hidden border border-border bg-black/50 group aspect-video flex items-center justify-center">
                    <video
                        src={currentPreview}
                        controls
                        className="max-h-full w-full object-contain"
                    />

                    {/* Remove Button Overlay */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemove}
                            className="h-8 w-8 rounded-full shadow-lg"
                        >
                            <X size={16} />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    {isUploading ? (
                        <div className="border border-border border-dashed rounded-lg p-10 flex flex-col items-center justify-center bg-muted/20 space-y-4 h-64">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                <UploadCloud className="h-10 w-10 text-primary relative animate-bounce" />
                            </div>
                            <div className="w-full max-w-xs space-y-2 text-center">
                                <p className="text-sm font-medium animate-pulse">Uploading Video...</p>
                                <Progress value={progress} className="h-2" />
                                <p className="text-xs text-muted-foreground">{progress}%</p>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "cursor-pointer group relative border border-input border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center space-y-4 h-64 transition-all hover:bg-muted/10 hover:border-primary/50",
                                error && "border-destructive/50 bg-destructive/5"
                            )}
                        >
                            <div className="p-4 rounded-full bg-muted/50 group-hover:bg-primary/20 transition-colors">
                                <Film className={cn("h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors", error && "text-destructive")} />
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                                    Click to upload video
                                </p>
                                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                                    MP4, WebM or OGG (max 10MB)
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 text-destructive text-sm mt-2">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};
