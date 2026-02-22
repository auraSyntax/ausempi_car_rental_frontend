
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash, Plus, CheckCircle2, Circle } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const OptionList = ({ questionIndex }: { questionIndex: number }) => {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questionDtos.${questionIndex}.optionDtos`,
    });

    return (
        <div className="space-y-3">
            {fields.map((option, index) => {
                const isCorrect = watch(
                    `questionDtos.${questionIndex}.optionDtos.${index}.isCorrect`
                );

                return (
                    <div
                        key={option.id}
                        className={cn(
                            "flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-200",
                            isCorrect
                                ? "border-primary/40 bg-primary/5"
                                : "border-border bg-background/40 hover:bg-background/70"
                        )}
                    >
                        {/* Option label pill */}
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-mono text-muted-foreground">
                            {String.fromCharCode(65 + index)}
                        </span>

                        {/* Option text input */}
                        <div className="flex-1">
                            <FormField
                                control={control}
                                name={`questionDtos.${questionIndex}.optionDtos.${index}.optionText`}
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={`Write option ${String.fromCharCode(65 + index)} here…`}
                                                className="border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 px-0 text-sm placeholder:text-muted-foreground/50"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Correct toggle */}
                        <FormField
                            control={control}
                            name={`questionDtos.${questionIndex}.optionDtos.${index}.isCorrect`}
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormControl>
                                        <button
                                            type="button"
                                            onClick={() => field.onChange(!field.value)}
                                            className={cn(
                                                "flex items-center gap-1.5 text-xs font-medium rounded-md px-2 py-1 transition-all",
                                                field.value
                                                    ? "text-primary bg-primary/10 hover:bg-primary/20"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            )}
                                            title="Mark as correct answer"
                                        >
                                            {field.value ? (
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                            ) : (
                                                <Circle className="h-3.5 w-3.5" />
                                            )}
                                            Correct
                                        </button>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Remove button */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="h-7 w-7 flex-shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            disabled={fields.length <= 2}
                        >
                            <Trash className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                );
            })}

            <div className="flex justify-start pt-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => append({ optionText: "", isCorrect: false })}
                    className="text-primary hover:text-primary hover:bg-primary/5 gap-2 h-8 text-xs"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Add Option
                </Button>
            </div>
        </div>
    );
};
