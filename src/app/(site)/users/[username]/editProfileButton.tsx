"use client";

import React, { useState } from "react";
import { UserData } from "@/types";
import { Button } from "@/components/ui/button";
import EditProfileDialog from "@/app/(site)/users/[username]/editProfileDialog";

interface Props {
  user: UserData;
}

const EditProfileButton: React.FC<Props> = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Button variant={"outline"} onClick={() => setShowDialog(true)}>
        Edit Profile
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};

export default EditProfileButton;
