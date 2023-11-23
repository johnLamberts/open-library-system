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
  useCreateEducationalStages,
  useModifyEducationalStage,
} from "@/lib/react-query/queries";

const educationalStageFormSchema = z.object({
  educationalStage: z.string(),
});

type EducationalStageFormValues = z.infer<typeof educationalStageFormSchema>;

export interface CataloguesEditorProps {
  educationalStage?: Record<string, any>;
  visible?: boolean;
  saveChanges?: (payload: any, isNewRecord: boolean) => void;
  closePanel?: () => void;
  updateEditorDirty?: () => void;
}

export default function EducationalStageForms({
  educationalStage = {},
  updateEditorDirty,
}: CataloguesEditorProps) {
  const { isCreating, createEducationalStage } = useCreateEducationalStages();
  const { isModifying, modifyEducationalStage } = useModifyEducationalStage();

  const { id: editId, ...otherValues } = educationalStage;

  const isNewRecord = Boolean(editId);

  const isWorking = isCreating || isModifying;

  const form = useForm({
    resolver: zodResolver(educationalStageFormSchema),
    defaultValues: isNewRecord ? otherValues : {},
  });

  const onUpdateDirty = () => {
    updateEditorDirty();
  };

  const onSubmit = (payload: EducationalStageFormValues) => {
    if (isNewRecord) {
      modifyEducationalStage({
        newData: { ...payload },
        docId: editId,
        oldItem: otherValues.educationalStage,
      });
    } else {
      createEducationalStage(payload);
    }
  };

  return (
    <div className="p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="educationalStage"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Level of Education</FormLabel>
                <FormControl>
                  <Input
                    disabled={isWorking}
                    placeholder="Your Education stage"
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
                  This is the educational stage that will be displayed on your
                  student when you will going to create.
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
