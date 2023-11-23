import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  useCreateGradeLevel,
  useEducationalStages,
} from "@/lib/react-query/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const gradeLevelSchema = z.object({
  gradeLevel: z.string().min(1, { message: "This field is required" }),
  educationalStage: z.string().min(1, { message: "This field is required" }),
});

type GradeLevelFormValues = z.infer<typeof gradeLevelSchema>;

export interface CataloguesEditorProps {
  gradeLevel?: Record<string, any>;

  updateEditorDirty?: () => void;
}

export default function GradeLevelForms({
  gradeLevel = {},
  updateEditorDirty,
}: CataloguesEditorProps) {
  const { isLoading, educationalStage } = useEducationalStages();
  const { isCreating: isGradeLevel, createGradeLevel } = useCreateGradeLevel();

  const { id: editId, ...otherValues } = gradeLevel;

  const isNewRecord = Boolean(editId);

  const isWorking = isGradeLevel;

  const form = useForm({
    resolver: zodResolver(gradeLevelSchema),
    defaultValues: isNewRecord ? otherValues : {},
  });

  const onUpdateDirty = () => {
    updateEditorDirty();
  };

  const onSubmit = (payload: GradeLevelFormValues) => {
    if (isNewRecord) {
    } else {
      // createGenre(payload);
      // alert(JSON.stringify(payload, null, 4));
      createGradeLevel(payload);
      // console.log(payload);
    }
  };

  const onError = () => {
    toast({
      title: "Error",
      description: `${form.formState.errors}`,
    });
  };

  if (isLoading) return <>Loading Educational Stages...</>;

  return (
    <div className="p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-6 "
        >
          <FormField
            control={form.control}
            name="gradeLevel"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Grade Level"
                    disabled={isWorking}
                    type="text"
                    onChange={(e) => {
                      if (!isNewRecord) {
                        onUpdateDirty();
                      }

                      onChange(e);
                    }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the grade level that will be displayed on your
                  catalogue when you will going to create.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="educationalStage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Educational Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isWorking}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select educational level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationalStage.map((item: any) => {
                      return (
                        <SelectItem value={item.educationalStage}>
                          {item.educationalStage}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can select what educational level would be your student.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="flex justify-end gap-2 mt-10
        
                p-4
                border-t border-overlay-border"
          >
            <Button type="submit" disabled={isWorking}>
              {isNewRecord ? "Modify" : "Submit"}
            </Button>
            <Button type="reset" onClick={form.reset}>
              Clear Field
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
