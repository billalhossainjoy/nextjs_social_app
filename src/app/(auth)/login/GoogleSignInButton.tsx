import React from "react";
import { Button } from "@/components/ui/button";

const GoogleSignInButton: React.FC = () => {
  return (
    <Button
      variant={"outline"}
      className={
        "w-full bg-white text-black hover:bg-gray-100 hover:text-black"
      }
      asChild
    >
      <a href={"/login/google"}>Sign in with Google</a>
    </Button>
  );
};

export default GoogleSignInButton;
