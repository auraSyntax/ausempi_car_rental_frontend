import api from "./api";
import { VideoListItem, VideoResponse } from "../types/video";

/**
 * Two fixes applied to every Cloudinary video URL:
 * 1. Swap /image/upload/ → /video/upload/ (wrong resource type from backend).
 * 2. Append .mp4 when no extension is present — Cloudinary requires a format
 *    extension to stream a video; without it the request returns an error.
 */
const fixCloudinaryVideoUrl = (url: string): string => {
    if (!url) return url;

    // Fix resource type: /image/upload/video_... → /video/upload/video_...
    let fixed = url.replace(/\/image\/upload\/(video_)/, "/video/upload/$1");

    // Append .mp4 if the public ID has no file extension
    // Matches Cloudinary URLs: .../video/upload/<optional_transforms>/<public_id>
    const isCloudinaryVideo = /\/video\/upload\//.test(fixed);
    const hasExtension = /\.[a-zA-Z0-9]{2,5}(\?|$)/.test(fixed.split("/").pop() ?? "");
    if (isCloudinaryVideo && !hasExtension) {
        fixed = fixed + ".mp4";
    }

    return fixed;
};

const normaliseVideoResponse = (data: VideoResponse): VideoResponse => ({
    ...data,
    videoUrl: fixCloudinaryVideoUrl(data.videoUrl ?? ""),
    viewVideoUrl: fixCloudinaryVideoUrl(data.viewVideoUrl ?? ""),
});

const normaliseVideoListItem = (item: VideoListItem): VideoListItem => ({
    ...item,
    videoUrl: fixCloudinaryVideoUrl(item.videoUrl ?? ""),
});

export const videoService = {
    getVideoById: async (id: number): Promise<VideoResponse> => {
        const response = await api.get<VideoResponse>(`/v1/videos/${id}`, {
            requiresAuth: true,
        });
        return normaliseVideoResponse(response.data);
    },

    getAllVideos: async (): Promise<VideoListItem[]> => {
        const response = await api.get<VideoListItem[]>(`/v1/videos/all`, {
            requiresAuth: true,
        });
        return response.data.map(normaliseVideoListItem);
    },

    submitAssessment: async (videoId: number, answers: Record<number, number>): Promise<{ score: number; passed: boolean }> => {
        const payload = Object.entries(answers).map(([questionId, optionId]) => ({
            questionId: parseInt(questionId),
            selectedOptionId: optionId,
        }));

        const response = await api.post<{ score: number; passed: boolean }>(
            `/v1/videos/${videoId}/submit`,
            payload,
            { requiresAuth: true }
        );
        return response.data;
    },
};
