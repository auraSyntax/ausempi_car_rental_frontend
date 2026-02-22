
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VideoUpload } from "@/components/admin/video/VideoUpload";
import { QuestionList } from "@/components/admin/video/form/QuestionList";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const optionSchema = z.object({
    id: z.number().optional(),
    optionText: z.string().min(1, "Option text is required"),
    isCorrect: z.preprocess((val) => {
        if (typeof val === "string") return val.toLowerCase() === "true";
        if (typeof val === "number") return val === 1;
        return Boolean(val);
    }, z.boolean({
        required_error: "Please mark whether this option is correct or not",
        invalid_type_error: "isCorrect must be true or false",
    })),
});

const questionSchema = z
    .object({
        id: z.number().optional(),
        questionText: z.string().min(1, "Question text is required"),
        questionOrder: z.coerce.number().min(1, "Order must be at least 1"),
        optionDtos: z.array(optionSchema).min(1, "At least one option is required"),
    })
    .refine(
        (q) => q.optionDtos.some((o) => o.isCorrect === true),
        {
            message: "At least one option must be marked as the correct answer",
            path: ["optionDtos"],
        }
    );

const formSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    videoUrl: z.string().min(1, "Video is required"), // public_id
    viewVideoUrl: z.string().optional(), // For display only
    durationSeconds: z.coerce.number().min(1, "Duration is required (in seconds)"),
    videoOrder: z.coerce.number().min(1, "Video order is required"),
    questionDtos: z.array(questionSchema).min(1, "At least one question is required"),
});

export type VideoFormValues = z.infer<typeof formSchema>;

interface VideoFormProps {
    initialData?: VideoFormValues;
    onSubmit: (data: VideoFormValues) => void;
    isLoading?: boolean;
    onCancel: () => void;
}

export const VideoForm = ({ initialData, onSubmit, isLoading, onCancel }: VideoFormProps) => {
    const form = useForm<VideoFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            videoUrl: "",
            durationSeconds: 120,
            videoOrder: 1,
            questionDtos: [],
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialData]);

    const handleSubmit = (data: VideoFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Video & Basic Info */}
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="videoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video Content</FormLabel>
                                    <FormControl>
                                        <VideoUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            previewUrl={initialData?.viewVideoUrl} // Only pass the actual URL for edit mode; fresh uploads manage preview internally
                                            error={form.formState.errors.videoUrl?.message}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Java Spring Boot Tutorial" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Enter video description..." className="min-h-[100px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="durationSeconds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration (Seconds)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="videoOrder"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Display Order</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Right Column: Questions */}
                    <div className="space-y-6 md:border-l md:pl-8 border-border">
                        <QuestionList />
                        {form.formState.errors.questionDtos?.message && (
                            <p className="text-sm font-medium text-destructive">
                                {form.formState.errors.questionDtos.message}
                            </p>
                        )}
                    </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="min-w-[120px]"
                        onClick={() => {
                            if (Object.keys(form.formState.errors).length > 0) {
                                console.log("Form validation errors:", form.formState.errors);
                            }
                        }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save & Publish"
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
