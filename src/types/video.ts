export interface OptionDto {
    id: number;
    optionText: string;
}

export interface QuestionDto {
    id: number;
    questionText: string;
    questionOrder: number;
    optionDtos: OptionDto[];
}

export interface VideoResponse {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    viewVideoUrl: string;
    durationSeconds: number;
    createdAt: string;
    questionDtos: QuestionDto[];
}

export interface VideoListItem {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    durationSeconds: number;
    createdAt: string;
    videoOrder?: number;
}
