
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Column<T> {
    key: string;
    label: string;
    render?: (row: T) => React.ReactNode;
}

interface CrudTableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    emptyMessage?: string;
    /** ID of the row currently being fetched for editing — shows a spinner on that row's edit button */
    loadingEditId?: number | null;
}

export const CrudTable = <T extends { id?: number | string }>({
    data,
    columns,
    isLoading,
    onEdit,
    onDelete,
    currentPage,
    totalPages,
    onPageChange,
    emptyMessage = "No data found.",
    loadingEditId = null,
}: CrudTableProps<T>) => {

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border border-border bg-card">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={col.key} className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">
                                    {col.label}
                                </TableHead>
                            ))}
                            <TableHead className="text-right text-muted-foreground uppercase text-xs font-semibold tracking-wider w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>
                                            {col.render ? col.render(row) : row[col.key]}
                                        </TableCell>
                                    ))}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(row)}
                                                disabled={loadingEditId === row.id}
                                                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                            >
                                                {loadingEditId === row.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Edit className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(row)}
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 0 && (
                <Pagination className="justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                        </PaginationItem>

                        {/* Simple pagination logic: Show current page if it's the only one, or pages around current */}
                        <PaginationItem>
                            <PaginationLink isActive>{currentPage}</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext
                                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};
