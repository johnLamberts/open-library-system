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
import { useCreateGenre } from "@/lib/react-query/queries";

const genreFormSchema = z.object({
  genre: z.string(),
});

type GenreFormValues = z.infer<typeof genreFormSchema>;

export interface CataloguesEditorProps {
  users?: Record<string, any>;

  updateEditorDirty?: () => void;
}

export default function GenresForm({
  users = {},
  updateEditorDirty,
}: CataloguesEditorProps) {
  const { isCreating, createGenre } = useCreateGenre();
  const { id: editId, ...otherValues } = users;

  const isNewRecord = Boolean(editId);

  const isWorking = isCreating;

  const form = useForm({
    resolver: zodResolver(genreFormSchema),
    defaultValues: isNewRecord ? otherValues : {},
  });

  const onUpdateDirty = () => {
    updateEditorDirty();
  };

  const onSubmit = (payload: GenreFormValues) => {
    if (isNewRecord) {
    } else {
      createGenre(payload);
      // alert(JSON.stringify(payload, null, 4));
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="space-y-6 relative flex-1 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="genre"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Genre"
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
                    This is the genre that will be displayed on your catalogue
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
