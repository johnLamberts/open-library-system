import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/shared/MultiSelect";
import { addDoc, collection } from "firebase/firestore";
import { firestore, storage } from "@/config/firebase";
import { useAuthors, useCategory, useGenres } from "@/lib/react-query/queries";
import { IAuthors, IGenres } from "@/types";
import FileUploader from "@/components/shared/FileUploader";
import { Separator } from "@/components/ui/separator";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export interface CataloguesEditorProps {
  catalogues?: Record<string, any>;
  updateEditorDirty?: () => void;
}

const FormSchema = z.object({
  authors: z.array(z.record(z.string().trim())),
  genres: z.array(z.record(z.string().trim())),
  itemType: z.string({
    required_error: "Please select category.",
  }),
  isbn: z.string(),
  title: z.string(),
  yearPublished: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number()
  ),
  initialPrice: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number()
  ),
  availableCopies: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number()
  ),
  catalogFileImage: z.custom<File[]>(),
  catalogFiles: z.custom<File[]>(),
});

export default function CatalogueForm({
  catalogues = {},
}: // updateEditorDirty,
CataloguesEditorProps) {
  const { category, isLoading: isCategoryLoading } = useCategory();
  const { authors, isLoading: isAuthorLoading } = useAuthors();
  const { genres, isLoading: isGenreLoading } = useGenres();

  const { id: editId, ...otherValues } = catalogues;

  const isEditing = Boolean(editId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEditing
      ? otherValues
      : {
          authors: [],
          genres: [],
        },
  });

  const onSubmit = async (payload: z.infer<typeof FormSchema>) => {
    try {
      // alert("Success");

      const catalogImageRef = ref(
        storage,
        `catalogues/` + payload.catalogFileImage[0].name
      );

      const catalogFilesRef = ref(
        storage,
        `catalogues-files/` + payload.catalogFiles[0].name
      );

      const uploadTaskImage = uploadBytes(
        catalogImageRef,
        payload.catalogFileImage[0]
      );

      const uploadTaskFiles = uploadBytes(
        catalogFilesRef,
        payload.catalogFiles[0]
      );

      uploadTaskImage.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadImageUrl) => {
          uploadTaskFiles.then((snapshotFile) => {
            getDownloadURL(snapshotFile.ref).then(async (downloadFileUrl) => {
              await addDoc(collection(firestore, "catalogue"), {
                ...payload,
                catalogFileImage: downloadImageUrl,
                catalogFiles: downloadFileUrl,
                catalogFilesName: payload.catalogFiles[0].name,
                isArchived: false,
                dateCreated: new Date(),
              });
            });
          });
          alert("SUCCESS");
        });
      });

      // uploadTaskFiles.then((snapshotFile) => {
      //   getDownloadURL(snapshotFile.ref).then((downloadFileUrl) => {
      //     file1 = downloadFileUrl;
      //   });
      // });

      // await addDoc(collection(firestore, "catalogue"), {
      //   ...payload,
      //   catalogFileImage: downloadUrl,
      //   isArchived: false,
      //   dateCreated: new Date(),
      // });

      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     switch (snapshot.state) {
      //       case "running":
      //         console.log("Uploading is still processing");
      //         break;

      //       case "paused":
      //         console.log("Uploading is paused");
      //         break;

      //       case "success":
      //         console.log("Uploading is completed!");
      //         break;
      //     }
      //   },
      //   (error) => {
      //     switch (error.code) {
      //       case "storage/canceled":
      //         // User canceled the upload
      //         throw new Error(`CANCELLED: ${error.message}`);

      //       case "storage/unknown":
      //         // Unknown error occurred, inspect error.serverResponse
      //         throw new Error(`Unknown Error: ${error.message}`);
      //     }
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
      //       console.log(downloadUrl);

      //       await addDoc(collection(firestore, "catalogue"), {
      //         ...payload,
      //         catalogFileImage: downloadUrl,
      //         isArchived: false,
      //         dateCreated: new Date(),
      //       });
      //     });
      //   }
      // );
    } catch (err) {
      alert(JSON.stringify(err, null, 4));
    }
  };

  const author = authors?.map(({ author, id }: IAuthors) => ({
    label: author,
    value: id,
  }));

  const genre = genres?.map(({ genre, id }: IGenres) => ({
    label: genre,
    value: id,
  }));

  if (isGenreLoading || isAuthorLoading || isCategoryLoading)
    return <>Loading...</>;

  return (
    <div className="px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="itemType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category.map((item: any) => {
                      return (
                        <SelectItem value={item.itemType}>
                          {item.itemType}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can select what category would be your catalogue.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authors"
            render={({ field: { ...field } }) => (
              <FormItem className="mb-5">
                <FormLabel>Author</FormLabel>
                <MultiSelect
                  selected={field.value}
                  options={author}
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genres"
            render={({ field: { ...field } }) => (
              <FormItem className="mb-5">
                <FormLabel>Genres</FormLabel>
                <MultiSelect
                  selected={field.value}
                  options={genre}
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearPublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Published</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableCopies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity/Available Copy</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="catalogFileImage"
            render={({ field: { ...field } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  {/* <Input type="file" {...field} /> */}
                  <FileUploader
                    isImage={true}
                    fieldChange={field.onChange}
                    mediaUrl={catalogues?.catalogFileImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="catalogFiles"
            render={({ field: { ...field } }) => (
              <FormItem>
                <FormLabel>Upload File(e.g. Abstracts, Description)</FormLabel>
                <FormControl>
                  {/* <Input type="file" accept=".pdf, .docx" {...field} /> */}
                  <FileUploader
                    isImage={false}
                    fieldChange={field.onChange}
                    mediaUrl={catalogues?.catalogFiles}
                    fileUrlName={catalogues?.catalogFilesName}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
