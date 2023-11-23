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
import { useUserRole } from "@/lib/react-query/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUploader from "@/components/shared/FileUploader";

import { generateUsername } from "unique-username-generator";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore, storage } from "@/config/firebase";
import { toast } from "@/components/ui/use-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const usersFormSchema = z.object({
  userRole: z.string().min(1, { message: "This field is required." }),
  firstName: z.string().min(1, { message: "This field is required." }),
  middleName: z.string().min(1, { message: "This field is required." }),
  lastName: z.string().min(1, { message: "This field is required." }),
  displayName: z.string(),
  avatarImage: z.custom<File[]>(),
  email: z.string().email({ message: "Email should be valid." }),
  password: z.string().min(1, { message: "This field is required" }),
});

type UserFormValues = z.infer<typeof usersFormSchema>;

export interface UsersEditorProps {
  users?: Record<string, any>;
  updateEditorDirty?: () => void;
}

function generateMeARandomName() {
  const userName = generateUsername();

  // const nouns = [
  //   "Explorer",
  //   "Dreamer",
  //   "Traveler",
  //   "Artist",
  //   "Guru",
  //   "Pioneer",
  //   "Champion",
  // ];

  // const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return userName;
}

export default function UsersForm({
  users = {},
}: // updateEditorDirty,
UsersEditorProps) {
  let displayCustomName = generateMeARandomName();
  const { isLoading: isUserRole, userRole } = useUserRole();

  const { id: editId, ...otherValues } = users;

  const isNewRecord = Boolean(editId);

  const form = useForm({
    resolver: zodResolver(usersFormSchema),
    defaultValues: isNewRecord
      ? otherValues
      : {
          password: "LMS2023",
          displayName: displayCustomName,
        },
  });

  // const onUpdateDirty = () => {
  //   updateEditorDirty();
  // };

  const onSubmit = async (payload: UserFormValues) => {
    if (isNewRecord) {
    } else {
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
        .then((resp) => {
          const userImgRef = ref(
            storage,
            `users/` + payload.avatarImage[0].name
          );

          const uploadTaskImage = uploadBytes(
            userImgRef,
            payload.avatarImage[0]
          );

          uploadTaskImage.then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (downloadAvatarUrl) => {
              await addDoc(collection(firestore, "users"), {
                ...payload,
                avatarImage: downloadAvatarUrl,
                userUID: resp.user.uid,
              });

              await updateProfile(resp.user, {
                ...payload,
                photoURL: downloadAvatarUrl,
              });
            });
          });

          toast({
            title: "Success",
            description: `New user has been added successfully`,
          });
        })
        .catch((err) =>
          toast({
            title: "Error",
            description: `${err}`,
          })
        );
    }
  };

  const onError = () => {
    console.log(form.formState.errors);
  };

  if (isUserRole) return <>Loading User Role...</>;

  return (
    <div className="px-5">
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="userRole"
              render={({ field: { ...field } }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userRole.map((item: any) => {
                        return (
                          <SelectItem value={item.userRole}>
                            {item.userRole}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is the user role that will be displayed on your
                    catalogue when you will going to create.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={"LMS2023"} disabled />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={`${displayCustomName}
                      `}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatarImage"
              render={({ field: { ...field } }) => (
                <FormItem>
                  <FormLabel>Avatar Image</FormLabel>
                  <FormControl>
                    {/* <Input type="file" {...field} /> */}
                    <FileUploader
                      isImage={true}
                      fieldChange={field.onChange}
                      mediaUrl={users?.avatarImage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className="flex justify-end gap-2 mt-10
        
                p-4
                border-t border-overlay-border"
            >
              <Button type="submit">{isNewRecord ? "Modify" : "Submit"}</Button>
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
