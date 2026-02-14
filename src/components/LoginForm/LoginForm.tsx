"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

const formSchema = z.object({
  email: z.email("Email is required").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler. 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true, 
      callbackUrl: callbackUrl ?? "/",
    });

    setLoading(false);

    // if (response?.ok) {
    //   window.location.href = callbackUrl ?? "/";
    // }
  }

  return (
    <Card className="p-6 w-sm">
            <h2 className='text-4xl font-bold text-center'>Welcome Back !</h2>
      
      <Form {...form}>
        {search.get("error") ? (
          <h2 className="text-md text-center text-red-600 mb-4">
            {search.get("error")}
          </h2>
        ) : (
          ""
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ahmed@examble.com"
                    type="email"
                    {...field}
                  />
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
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer mb-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Log In"}
          </Button>
          <div className="flex justify-center items-center">
            <ForgetPassword />
          </div>
        </form>
      </Form>
    </Card>
  );
}
