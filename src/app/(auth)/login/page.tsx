import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/loginForm";
import Link from "next/link";
import loginImage from "@/assets/loginImage.png";
import Image from "next/image";
import React from "react";
import GoogleSignInButton from "@/app/(auth)/login/GoogleSignInButton";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className={"flex h-screen items-center justify-center p-5"}>
      <div
        className={
          "flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl"
        }
      >
        <div className={"w-full space-y-10 overflow-y-auto p-10 md:w-1/2"}>
          <div className={"space-y-1"}>
            <h1 className={"text-3xl font-bold text-center"}>
              Login to OpenParadox
            </h1>
            <p className={"text-center text-muted-foreground"}>
              Welcome back! Please enter your credentials to access your
              account.
            </p>
          </div>
          <div className={"space-y-5"}>
            <GoogleSignInButton />
            <div className={"flex items-center gap-3"}>
              <div className={"h-px flex-1 bg-muted"} />
              <span>OR</span>
              <div className={"h-px flex-1 bg-muted"} />
            </div>
            <LoginForm />
            <Link
              href={"/signup"}
              className={"block text-center hover:underline"}
            >
              Don&apos;t have an account? sign up
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt={"login image"}
          className={"w-1/2 hidden md:block px-6 py-20"}
        />
      </div>
    </main>
  );
}
