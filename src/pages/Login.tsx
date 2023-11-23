import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getCurrentUser, login } from "@/services/auth";
import { useNavigate } from "react-router-dom";

const authFormSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string(),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (payload: AuthFormValues) => {
    try {
      const user = await login(payload);

      toast({
        title: "Success",
        description: "Successfully Login!",
      });

      const currentUser = await getCurrentUser();

      console.log("currentUser", currentUser);

      if (currentUser.userRole === "Admin") {
        navigate("/");
      } else if (currentUser.userRole === "Librarian") {
        navigate("/librarian");
      } else if (currentUser.userRole === "Staff") {
        navigate("/staff");
      } else {
        toast({
          title: "No pages available",
          description: "You have been using a wrong auth credentials",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `${err}`,
      });
    }
  };

  return (
    <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Fire Library
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs and robust system to my clients
              faster than ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="lg:hidden z-20 sm:flex items-center text-lg font-medium justify-center align-center relative top-[-100px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Fire Library
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
          <div className="flex flex-col space-y-2 text-left">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field: { ...field } }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Email..." {...field} />
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
                        <Input
                          type="password"
                          placeholder="Your Password..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex mx-auto space-x-3">
                  <div className="">
                    <Checkbox
                      defaultChecked={isAccept}
                      onClick={() => setIsAccept((agree) => !agree)}
                    />
                  </div>
                  <p className=" text-center text-sm text-muted-foreground ">
                    By clicking continue, you agree to our Terms of Service and
                    Privacy Policy
                  </p>
                </div>

                <Button disabled={!isAccept} type="submit">
                  Login
                </Button>
              </form>
            </Form>
          </div>

          {/* <UserAuthForm /> */}
          <p className="px-8 text-center text-sm text-muted-foreground"></p>
        </div>
      </div>
    </div>
  );
}
