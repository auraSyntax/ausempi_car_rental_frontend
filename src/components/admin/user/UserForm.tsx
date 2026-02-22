
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, KeyRound } from "lucide-react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// ──────────────────────────────────────────────────────────────────────────────
// Zod Schema
//
// Rules:
//  • firstName       — required, non-empty
//  • lastName        — optional / nullable
//  • employeeId      — required, non-empty
//  • phoneNumber     — required, min 7 digits (allows + prefix and spaces)
//  • email           — required, valid email format
//  • password        — create: min 6 chars required | edit: optional (blank = no change)
//  • confirmPassword — create: must match password  | edit: not shown / not validated
// ──────────────────────────────────────────────────────────────────────────────
const baseSchema = z.object({
    id: z.number().optional(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional().nullable(),
    employeeId: z.string().min(1, "Employee ID is required"),
    isActive: z.boolean().default(true),
    phoneNumber: z
        .string()
        .min(7, "Phone number must be at least 7 digits")
        .regex(
            /^[+\d][\d\s\-().]{5,}$/,
            "Invalid phone number format (e.g. +94741526482)"
        ),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
});

// Create schema: password required (min 6) and confirmPassword must match
const createSchema = baseSchema
    .extend({
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Edit schema: password is optional; if supplied must be ≥ 6 chars
const editSchema = baseSchema.extend({
    password: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 6, {
            message: "Password must be at least 6 characters",
        }),
    confirmPassword: z.string().optional(),
});

export type UserFormValues = z.infer<typeof createSchema>;

interface UserFormProps {
    initialData?: Partial<UserFormValues>;
    isEditMode?: boolean;
    onSubmit: (data: UserFormValues) => void;
    isLoading?: boolean;
    onCancel: () => void;
}

export const UserForm = ({
    initialData,
    isEditMode = false,
    onSubmit,
    isLoading,
    onCancel,
}: UserFormProps) => {
    const schema = isEditMode ? editSchema : createSchema;

    const form = useForm<UserFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            employeeId: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            isActive: true,
            ...initialData,
        },
    });

    // Reset when a different user is loaded for editing
    useEffect(() => {
        if (initialData) {
            form.reset({
                firstName: "",
                lastName: "",
                employeeId: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                isActive: true,
                ...initialData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialData]);

    const handleSubmit = (data: UserFormValues) => {
        // confirmPassword is UI-only — strip it before passing to the parent
        const { confirmPassword: _, ...payload } = data;
        onSubmit(payload as UserFormValues);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* ── Personal details ─────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="e.g. John"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Last Name{" "}
                                    <span className="text-muted-foreground text-xs">(optional)</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="e.g. Dorington"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Employee ID */}
                    <FormField
                        control={form.control}
                        name="employeeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Employee ID</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g. Emp002" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone Number */}
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g. +94741526482" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status / isActive */}
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Active Status
                                    </FormLabel>
                                    <p className="text-[0.8rem] text-muted-foreground">
                                        Allow this user to log in.
                                    </p>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    {/* <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="e.g. john@example.com"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                </div>

                {/* <Separator /> */}

                {/* ── Password section ──────────────────────────────────────── */}
                {/* <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">
                            {isEditMode ? "Change Password" : "Set Password"}
                        </h3>
                        {isEditMode && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                                Leave blank to keep current
                            </Badge>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password{" "}
                                        {!isEditMode && (
                                            <span className="text-destructive text-xs">*</span>
                                        )}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder={
                                                isEditMode
                                                    ? "Enter new password to change..."
                                                    : "Min. 6 characters"
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {!isEditMode && (
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Confirm Password{" "}
                                            <span className="text-destructive text-xs">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Re-enter password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </div> */}

                <Separator />

                {/* ── Actions ───────────────────────────────────────────────── */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : isEditMode ? (
                            "Save Changes"
                        ) : (
                            "Create User"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
