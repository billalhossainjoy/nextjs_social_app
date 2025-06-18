import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface Props {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

const AttatchmentButtons: React.FC<Props> = ({ onFilesSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        className={"hover:text-primary text-primary"}
        disabled={disabled}
        size={"icon"}
        variant={"ghost"}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} />
      </Button>
      <input
        type={"file"}
        accept={"image/*, video/*"}
        multiple
        ref={fileInputRef}
        className={"hidden sr-only"}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
};

export default AttatchmentButtons;
