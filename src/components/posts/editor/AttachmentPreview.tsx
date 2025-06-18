import React from "react";
import { Attachment } from "@/components/posts/editor/useMediaUpload";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  attachment: Attachment;
  onRemoveClick: () => void;
}

export const AttachmentPreview: React.FC<Props> = ({
  attachment: { file, isUploading },
  onRemoveClick,
}) => {
  const src = URL.createObjectURL(file);
  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image src={src} alt={"post-image"} width={500} height={500} />
      ) : (
        <video>
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className={
            "absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
          }
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

export function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment, index) => {
        return (
          <AttachmentPreview
            attachment={attachment}
            onRemoveClick={() => removeAttachment(attachment.file.name)}
            key={index}
          />
        );
      })}
    </div>
  );
}
