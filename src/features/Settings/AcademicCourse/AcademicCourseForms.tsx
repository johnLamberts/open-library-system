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
  useCreateAcademicCourse,
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

const academicCourseSchema = z.object({
  academicCourse: z.string().min(1, { message: "This field is required" }),
  educationalStage: z.string().min(1, { message: "This field is required" }),
});

type AcademicCourseFormValues = z.infer<typeof academicCourseSchema>;

export interface CataloguesEditorProps {
  academicCourse?: Record<string, any>;

  updateEditorDirty?: () => void;
}

export default function AcademicCourseForms({
  academicCourse = {},
  updateEditorDirty,
}: CataloguesEditorProps) {
  const { isLoading, educationalStage } = useEducationalStages();
  const { isCreating: isAcademicCourse, createAcademicCourse } =
    useCreateAcademicCourse();

  const { id: editId, ...otherValues } = academicCourse;

  const isNewRecord = Boolean(editId);

  const isWorking = isAcademicCourse;

  const form = useForm({
    resolver: zodResolver(academicCourseSchema),
    defaultValues: isNewRecord ? otherValues : {},
  });

  const onUpdateDirty = () => {
    updateEditorDirty();
  };

  const onSubmit = (payload: AcademicCourseFormValues) => {
    if (isNewRecord) {
    } else {
      // createGenre(payload);
      createAcademicCourse(payload);
      // alert(JSON.stringify(payload, null, 4));
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
            name="academicCourse"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Academic Course</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Academic Course"
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
                  This is the academic course that will be displayed on your
                  student when you will going to create.
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
