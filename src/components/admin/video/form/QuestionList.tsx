
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Plus, HelpCircle } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { OptionList } from "@/components/admin/video/form/OptionList";

export const QuestionList = () => {
    const { control, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questionDtos",
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">Questions &amp; Answers</h3>
                <Button
                    type="button"
                    onClick={() =>
                        append({
                            questionText: "",
                            questionOrder: fields.length + 1,
                            optionDtos: [
                                { optionText: "", isCorrect: false },
                                { optionText: "", isCorrect: false },
                            ],
                        })
                    }
                    variant="outline"
                    size="sm"
                    className="border-primary/20 text-primary hover:bg-primary/5 gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Question
                </Button>
            </div>

            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="rounded-xl border border-border bg-card/50 overflow-hidden"
                    >
                        {/* Question Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/60">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <HelpCircle className="h-4 w-4 text-primary" />
                                Question {index + 1}
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                disabled={fields.length === 1}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Question Body */}
                        <div className="p-4 space-y-5">
                            {/* Question Text as Textarea */}
                            <FormField
                                control={control}
                                name={`questionDtos.${index}.questionText`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            Question Text
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="e.g. What is the main purpose of Spring Boot's @RestController annotation?"
                                                className="min-h-[90px] resize-none bg-background/60 focus:bg-background transition-colors text-sm leading-relaxed"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Question Order */}
                            <FormField
                                control={control}
                                name={`questionDtos.${index}.questionOrder`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            Question Order
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                min={1}
                                                placeholder="e.g. 1"
                                                className="w-28 bg-background/60 focus:bg-background transition-colors text-sm"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Answer Options */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                                    Answer Options
                                </p>
                                <OptionList questionIndex={index} />
                                {/* Per-question refine error: at least one correct answer required */}
                                {/* Zod .refine() on an array field is stored under .root by react-hook-form */}
                                {(() => {
                                    const qErrors = errors.questionDtos;
                                    if (Array.isArray(qErrors) && qErrors[index]?.optionDtos?.root?.message) {
                                        return (
                                            <p className="text-sm font-medium text-destructive mt-2">
                                                {qErrors[index].optionDtos.root.message}
                                            </p>
                                        );
                                    }
                                    return null;
                                })()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <div className="text-center p-10 border border-dashed border-border rounded-xl text-muted-foreground bg-muted/5">
                    <HelpCircle className="h-8 w-8 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No questions added yet.</p>
                    <p className="text-xs mt-1 opacity-70">Click "Add Question" above to get started.</p>
                </div>
            )}
        </div>
    );
};
