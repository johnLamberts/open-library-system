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
import { useCreateAuthor, useModifyAuthor } from "@/lib/react-query/queries";

const authorFormSchema = z.object({
  author: z.string(),
});

type AuthorFormValues = z.infer<typeof authorFormSchema>;

export interface CataloguesEditorProps {
  users?: Record<string, any>;
  updateEditorDirty?: () => void;
}

export default function AuthorsForm({
  users = {},
  updateEditorDirty,
}: CataloguesEditorProps) {
  const { isCreating, createAuthor } = useCreateAuthor();
  const { isModifying, modifyAuthor } = useModifyAuthor();

  const { id: editId, ...otherValues } = users;

  const isNewRecord = Boolean(editId);

  const form = useForm({
    resolver: zodResolver(authorFormSchema),
    defaultValues: isNewRecord ? otherValues : {},
  });

  const onUpdateDirty = () => {
    updateEditorDirty();
  };

  const isWorking = isCreating || isModifying;

  const onSubmit = (payload: AuthorFormValues) => {
    if (isNewRecord) {
      modifyAuthor({
        newData: { ...payload },
        docId: editId,
      });
    } else {
      createAuthor(payload);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="space-y-6 relative flex-1 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="author"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Author"
                      type="text"
                      onChange={(e) => {
                        if (!isNewRecord) {
                          onUpdateDirty();
                        }

                        onChange(e);
                      }}
                      {...field}
                      disabled={isWorking}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the author that will be displayed on your catalogue
                    when you will going to create.
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
              <Button disabled={isWorking} type="submit">
                {isNewRecord ? "Modify" : "Submit"}
              </Button>
              <Button type="reset" onClick={form.reset}>
                Clear Field
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
