import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import api from "@/services/api";
import { VideoDto, PaginatedResponse } from "@/types/admin";
import { CrudTable } from "@/components/admin/common/CrudTable";
import { ConfirmDeleteModal } from "@/components/admin/common/ConfirmDeleteModal";
import { VideoForm, VideoFormValues } from "@/components/admin/video/VideoForm";

/**
 * Cloudinary returns /image/upload/ even for videos when the public_id has no extension.
 * Replace it with /video/upload/ so the browser can stream the file correctly.
 */
const toVideoUrl = (url?: string): string | undefined => {
    if (!url) return url;
    return url.replace("/image/upload/", "/video/upload/");
};

export default function VideoMasterData() {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search input: wait 400 ms after the user stops typing before firing the query
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Reset to first page whenever the search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<VideoDto | null>(null);
    const [deletingItem, setDeletingItem] = useState<VideoDto | null>(null);
    // Track which row ID is currently being loaded for edit
    const [loadingEditId, setLoadingEditId] = useState<number | null>(null);

    // Fetch paginated videos list
    const { data: videosData, isLoading } = useQuery({
        queryKey: ["videos", currentPage, debouncedSearch],
        queryFn: async () => {
            const searchParam = debouncedSearch
                ? `&search=${encodeURIComponent(debouncedSearch)}`
                : "";
            const response = await api.get<PaginatedResponse<VideoDto>>(
                `/v1/videos?page=${currentPage}&size=10${searchParam}`,
                { requiresAuth: true }
            );
            return response.data;
        },
        enabled: isAuthenticated,
        placeholderData: (previousData) => previousData,
    });

    // Create Video Mutation
    const createMutation = useMutation({
        mutationFn: async (newVideo: VideoFormValues) => {
            const { id, viewVideoUrl, ...payload } = newVideo;
            const response = await api.post("/v1/videos", payload, { requiresAuth: true });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos"] });
            toast.success("Video created successfully");
            handleCloseModal();
        },
        onError: (err: unknown) => {
            console.error("Create error", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to create video", {
                description: error.response?.data?.message || "Something went wrong",
            });
        },
    });

    // Update Video Mutation
    const updateMutation = useMutation({
        mutationFn: async (updatedVideo: VideoFormValues) => {
            if (!editingItem?.id) throw new Error("Missing ID for update");
            const { viewVideoUrl, ...payload } = updatedVideo;
            const response = await api.patch(
                `/v1/videos`,
                payload,
                { requiresAuth: true }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos"] });
            toast.success("Video updated successfully");
            handleCloseModal();
        },
        onError: (err: unknown) => {
            console.error("Update error", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to update video", {
                description: error.response?.data?.message || "Something went wrong",
            });
        },
    });

    // Delete Video Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(`/v1/videos/${id}`, { requiresAuth: true });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos"] });
            toast.success("Video deleted successfully");
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
        },
        onError: (err: unknown) => {
            console.error("Delete error", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to delete video", {
                description: error.response?.data?.message || "Something went wrong",
            });
        },
    });

    // Memoize so VideoForm only sees a new `initialData` reference when editingItem
    // actually changes — not on every re-render (e.g. caused by invalidateQueries).
    // Without this, the spread `{ ...editingItem }` creates a new object every render,
    // which triggers form.reset() and wipes the user's in-progress edits.
    const initialFormData = useMemo(() => {
        if (!editingItem) return undefined;
        return {
            ...editingItem,
            durationSeconds: Number(editingItem.durationSeconds),
            videoOrder: editingItem.videoOrder || 1,
            viewVideoUrl: toVideoUrl(editingItem.viewVideoUrl),
        };
    }, [editingItem]);

    const handleCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    /**
     * Fetch full video detail by ID before opening the edit modal.
     * The list endpoint may return partial data (e.g., missing optionDtos inside questionDtos),
     * so we always fetch the authoritative detail from GET /v1/videos/{id}.
     */
    const handleEdit = async (item: VideoDto) => {
        if (!item.id) return;
        setLoadingEditId(item.id);
        try {
            const response = await api.get<VideoDto>(`/v1/videos/${item.id}`, {
                requiresAuth: true,
            });
            const video = response.data;
            // Normalise the Cloudinary URL: the API returns /image/upload/ for videos
            video.viewVideoUrl = toVideoUrl(video.viewVideoUrl);
            setEditingItem(video);
            setIsModalOpen(true);
        } catch (err) {
            console.error("Failed to fetch video detail", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to load video details", {
                description: error.response?.data?.message || "Please try again",
            });
        } finally {
            setLoadingEditId(null);
        }
    };

    const handleDelete = (item: VideoDto) => {
        setDeletingItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        createMutation.reset();
        updateMutation.reset();
    };

    const handleFormSubmit = (data: VideoFormValues) => {
        if (editingItem) {
            console.log(data, 'ccascsc')
            updateMutation.mutate({ ...data, id: editingItem.id });
        } else {
            createMutation.mutate(data);
        }
    };

    const confirmDelete = () => {
        if (deletingItem?.id) {
            deleteMutation.mutate(deletingItem.id);
        }
    };

    // Data is filtered server-side via the &search= query param; use it directly.
    const filteredData = videosData?.data || [];

    const columns = [
        { key: "id", label: "ID" },
        { key: "title", label: "Title" },
        {
            key: "durationSeconds",
            label: "Duration",
            render: (row: VideoDto) =>
                `${Math.floor(row.durationSeconds / 60)}m ${row.durationSeconds % 60}s`,
        },
        {
            key: "questions",
            label: "Questions",
            render: (row: VideoDto) => row.questionDtos?.length || 0,
        },
        {
            key: "createdAt",
            label: "Created At",
            render: (row: VideoDto) =>
                row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">Video Master Data</h1>
                    <p className="text-muted-foreground mt-1">Manage training videos and quizzes.</p>
                </div>
                <Button
                    onClick={handleCreate}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New Video
                </Button>
            </div>

            <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border border-border">
                <Search className="h-5 w-5 text-muted-foreground ml-2" />
                <Input
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                />
            </div>

            <CrudTable
                data={filteredData}
                columns={columns}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loadingEditId={loadingEditId}
                currentPage={videosData?.currentPage || 1}
                totalPages={videosData?.totalPages || 1}
                onPageChange={setCurrentPage}
            />

            {/* Create / Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleCloseModal()}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-display">
                            {editingItem ? "Edit Video" : "Create New Video"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <VideoForm
                            initialData={initialFormData}
                            onSubmit={handleFormSubmit}
                            onCancel={handleCloseModal}
                            isLoading={createMutation.isPending || updateMutation.isPending}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={deletingItem?.title}
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
}
