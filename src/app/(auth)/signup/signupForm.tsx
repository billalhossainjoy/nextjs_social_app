"use client";
import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpSchema, SignUpSchemaType } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/app/(auth)/signup/actions";
import PasswordInput from "@/components/passwordInput";
import LoadingButton from "@/components/loadingButton";

const SignupForm: React.FC = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransaction] = useTransition();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    setError(undefined);
    startTransaction(async () => {
      const { error } = await signUp(data);
      if (error) {
        setError(error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        {error && <p className={"text-center text-destructive"}>{error}</p>}
        <FormField
          control={form.control}
          name={"username"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder={"username"}
                  type={"text"}
                  autoComplete={"off"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={"email@example.com"}
                  autoComplete={"email"}
                  type={"email"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder={"password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isPending} type={"submit"} className={"w-full"}>
          Create Account
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignupForm;
