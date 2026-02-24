
export interface OptionDto {
    id?: number;
    optionText: string;
    isCorrect: boolean;
}

export interface QuestionDto {
    id?: number;
    questionText: string;
    questionOrder: number;
    optionDtos: OptionDto[];
}

export interface VideoDto {
    id?: number;
    title: string;
    description: string;
    videoUrl: string; // The public_id for saving
    viewVideoUrl?: string; // The full URL for viewing
    durationSeconds: number;
    videoOrder?: number; // Making optional as it wasn't in the initial JSON but requested
    questionDtos: QuestionDto[];
    createdAt?: string;
}

export interface UserDto {
    id?: number;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string;
    email: string;
    employeeId: string;
    password?: string | null;
    createdAt?: string;
    isExamCompleted?: boolean;
    employeeName?: string | null;
    isActive?: boolean | null;
    userType?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface FileUploadResponse {
    data: {
        public_id: string;
        url: string;
    };
    success: boolean;
}
