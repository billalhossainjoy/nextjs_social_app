import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MailPlus, X } from "lucide-react";
import NewChatDialog from "@/app/(site)/messages/newChatdialog";

interface Props {
  onClose: () => void;
}

const MenuHeader: React.FC<Props> = ({ onClose }) => {
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);

  return (
    <>
      <div className={"flex items-center gap-3 p-2"}>
        <div className={"h-full md:hidden"}>
          <Button size={"icon"} onClick={onClose} variant={"ghost"}>
            <X size={"5"} />
          </Button>
        </div>
        <h1 className={"mx-auto text-xl font-bold md:ms-2"}>Messages</h1>
        <Button
          size={"icon"}
          variant={"ghost"}
          title={"start new chat"}
          onClick={() => setShowNewChatDialog(true)}
        >
          <MailPlus className={"size-5"} />
        </Button>
      </div>
      {showNewChatDialog && (
        <NewChatDialog
          onOpenChange={setShowNewChatDialog}
          onChatCreated={() => {
            setShowNewChatDialog(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default MenuHeader;
