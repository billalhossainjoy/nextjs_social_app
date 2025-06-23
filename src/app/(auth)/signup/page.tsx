import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import signupImage from "@/assets/signupImage.png";
import Link from "next/link";
import SignupForm from "@/app/(auth)/signup/signupForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Page: React.FC = () => {
  return (
    <main className={"flex h-screen items-center justify-center p-5"}>
      <div
        className={
          "flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl"
        }
      >
        <div className={"md:w-1/2 w-full space-y-10 overflow-y-auto p-10"}>
          <div className={"space-y-1"}>
            <h1 className={"text-3xl font-bold text-center"}>
              Sign Up to OpenParadox
            </h1>
            <p className={"text-center text-muted-foreground"}>
              Join our community and start your journey!
            </p>
          </div>
          <div className={"space-y-5"}>
            <SignupForm />
            <Link
              href={"/login"}
              className={" block text-center hover:underline"}
            >
              Already have an account? Log in here
            </Link>
          </div>
        </div>
        <Image
          src={signupImage}
          alt={"signup image"}
          className={"w-1/2 hidden md:block"}
        />
      </div>
    </main>
  );
};

export default Page;
