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
  useCreateCategory,
  useModifyCategory,
} from "@/lib/react-query/queries";

const itemTypeSchema = z.object({
  itemType: z.string(),
});

type ItemTypeValues = z.infer<typeof itemTypeSchema>;

export interface CataloguesEditorProps {
  users?: Record<string, any>;
  updateEditorDirty?: () => void;
}

export default function ItemTypesForm({
  users = {},
  updateEditorDirty,
}: CataloguesEditorProps) {
  // Create Category Hooks
  const { isCreating, createCategory } = useCreateCategory();
  const { isModifying, modifyCategory } = useModifyCategory();

  const { id: editId, ...otherValues } = users;

  const isNewRecord = Boolean(editId);

  const isWorking = isCreating || isModifying;

  const form = useForm({
    resolver: zodResolver(itemTypeSchema),
    defaultValues: isNewRecord ? otherValues : {},
  });

  const onUpdateDirty = () => {
    updateEditorDirty();
  };

  const onSubmit = (payload: ItemTypeValues) => {
    // Check
    if (isNewRecord) {
      modifyCategory(
        {
          newData: { ...payload },
          docId: editId,
          oldItemType: otherValues.itemType,
        },
        {
          onSettled() {
            form.reset?.();
          },
        }
      );
    } else {
      createCategory(payload, {
        onSuccess() {},
      });
      form.reset?.();
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="space-y-6 relative flex-1 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="itemType"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isWorking}
                      placeholder="Your Item Type"
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
                    This is the category that will be displayed on your
                    catalogue when you will going to create.
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
    </div>
  );
}
