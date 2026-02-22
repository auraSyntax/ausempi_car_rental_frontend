import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import api from "@/services/api";
import { UserDto, PaginatedResponse } from "@/types/admin";
import { CrudTable } from "@/components/admin/common/CrudTable";
import { ConfirmDeleteModal } from "@/components/admin/common/ConfirmDeleteModal";
import { UserForm, UserFormValues } from "@/components/admin/user/UserForm";

export default function UserMasterData() {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    // ── Pagination & search state ──────────────────────────────────────────────
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    // ── Modal / selection state ────────────────────────────────────────────────
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<UserDto | null>(null);
    const [deletingItem, setDeletingItem] = useState<UserDto | null>(null);
    const [loadingEditId, setLoadingEditId] = useState<number | null>(null);

    // ── Fetch paginated users ──────────────────────────────────────────────────
    const { data: usersData, isLoading } = useQuery({
        queryKey: ["users", currentPage, debouncedSearch],
        queryFn: async () => {
            const searchParam = debouncedSearch
                ? `&search=${encodeURIComponent(debouncedSearch)}`
                : "";
            const response = await api.get<PaginatedResponse<UserDto>>(
                `/v1/users?page=${currentPage}&size=10${searchParam}`,
                { requiresAuth: true }
            );
            return response.data;
        },
        enabled: isAuthenticated,
        placeholderData: (previousData) => previousData,
    });

    // ── Create Mutation ────────────────────────────────────────────────────────
    const createMutation = useMutation({
        mutationFn: async (newUser: UserFormValues) => {
            const payload = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                employeeId: newUser.employeeId,
                phoneNumber: newUser.phoneNumber,
                email: newUser.email,
                password: newUser.password,
                isActive: newUser.isActive,
            };
            const response = await api.post("/v1/users/register", payload, {
                requiresAuth: true,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User created successfully");
            handleCloseModal();
        },
        onError: (err: unknown) => {
            console.error("Create error", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to create user", {
                description: error.response?.data?.message || "Something went wrong",
            });
        },
    });

    // ── Update Mutation ────────────────────────────────────────────────────────
    const updateMutation = useMutation({
        mutationFn: async (updatedUser: UserFormValues) => {
            if (!editingItem?.id) throw new Error("Missing ID for update");
            const payload = {
                id: editingItem.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                employeeId: updatedUser.employeeId,
                phoneNumber: updatedUser.phoneNumber,
                email: updatedUser.email,
                isActive: updatedUser.isActive,
            };
            const response = await api.patch("/v1/users", payload, {
                requiresAuth: true,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User updated successfully");
            handleCloseModal();
        },
        onError: (err: unknown) => {
            console.error("Update error", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to update user", {
                description: error.response?.data?.message || "Something went wrong",
            });
        },
    });

    // ── Delete Mutation ────────────────────────────────────────────────────────
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(`/v1/users/${id}`, {
                requiresAuth: true,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User deleted successfully");
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
        },
        onError: (err: unknown) => {
            console.error("Delete error", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to delete user", {
                description: error.response?.data?.message || "Something went wrong",
            });
        },
    });

    // ── Stable initialData reference ───────────────────────────────────────────
    // Memoised to prevent form.reset() being called on every re-render.
    const initialFormData = useMemo((): UserFormValues | undefined => {
        if (!editingItem) return undefined;
        return {
            id: editingItem.id,
            firstName: editingItem.firstName ?? "",
            lastName: editingItem.lastName ?? "",
            employeeId: editingItem.employeeId,
            phoneNumber: editingItem.phoneNumber,
            email: editingItem.email,
            // Never pre-fill password — user must type to trigger a change
            password: "",
            isActive: editingItem.isActive ?? true,
        };
    }, [editingItem]);

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    /**
     * Always fetch the full user detail (GET /v1/users/{id}) before opening the
     * edit modal so we display the authoritative firstName / lastName rather than
     * the list payload which may only carry employeeName.
     */
    const handleEdit = async (item: UserDto) => {
        if (!item.id) return;
        setLoadingEditId(item.id);
        try {
            const response = await api.get<UserDto>(`/v1/users/${item.id}`, {
                requiresAuth: true,
            });
            setEditingItem(response.data);
            setIsModalOpen(true);
        } catch (err) {
            console.error("Failed to fetch user detail", err);
            const error = err as { response?: { data?: { message?: string } } };
            toast.error("Failed to load user details", {
                description: error.response?.data?.message || "Please try again",
            });
        } finally {
            setLoadingEditId(null);
        }
    };

    const handleDelete = (item: UserDto) => {
        setDeletingItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        createMutation.reset();
        updateMutation.reset();
    };

    const handleFormSubmit = (data: UserFormValues) => {
        if (editingItem) {
            // Password field in edit mode is a placeholder for the future
            // change-password endpoint.  For now we only PATCH the user details.
            updateMutation.mutate(data);
        } else {
            createMutation.mutate(data);
        }
    };

    const confirmDelete = () => {
        if (deletingItem?.id) {
            deleteMutation.mutate(deletingItem.id);
        }
    };

    // ── Table columns ──────────────────────────────────────────────────────────
    const columns = [
        { key: "id", label: "ID" },
        {
            key: "employeeName",
            label: "Name",
            render: (row: UserDto) =>
                row.employeeName ||
                `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim() ||
                "—",
        },
        { key: "employeeId", label: "Employee ID" },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Phone" },
        {
            key: "userType",
            label: "Type",
            render: (row: UserDto) =>
                row.userType ? (
                    <Badge variant="outline" className="text-xs capitalize">
                        {row.userType}
                    </Badge>
                ) : (
                    "—"
                ),
        },
        {
            key: "isExamCompleted",
            label: "Exam",
            render: (row: UserDto) =>
                row.isExamCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                ),
        },
        {
            key: "createdAt",
            label: "Joined",
            render: (row: UserDto) =>
                row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
        },
        {
            key: "isActive",
            label: "Status",
            render: (row: UserDto) => (
                <Badge
                    variant={row.isActive ? "default" : "secondary"}
                    className={row.isActive ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20" : ""}
                >
                    {row.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
    ];

    const filteredData = usersData?.data || [];

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">
                        User Master Data
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage driver accounts and user access.
                    </p>
                </div>
                {/* <Button
                    onClick={handleCreate}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New User
                </Button> */}
            </div>

            {/* Search */}
            <div className="flex items-center space-x-2 bg-card p-2 rounded-lg border border-border">
                <Search className="h-5 w-5 text-muted-foreground ml-2" />
                <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                />
            </div>

            {/* Table */}
            <CrudTable
                data={filteredData}
                columns={columns}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loadingEditId={loadingEditId}
                currentPage={usersData?.currentPage || 1}
                totalPages={usersData?.totalPages || 1}
                onPageChange={setCurrentPage}
                emptyMessage="No users found."
            />

            {/* Create / Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleCloseModal()}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-display">
                            {editingItem ? "Edit User" : "Create New User"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <UserForm
                            initialData={initialFormData}
                            isEditMode={!!editingItem}
                            onSubmit={handleFormSubmit}
                            onCancel={handleCloseModal}
                            isLoading={
                                createMutation.isPending || updateMutation.isPending
                            }
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={
                    deletingItem?.employeeName ||
                    `${deletingItem?.firstName ?? ""} ${deletingItem?.lastName ?? ""}`.trim() ||
                    deletingItem?.email
                }
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
}
