import React from "react";
import { Media } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MediaPreview {
  media: Media;
}

const MediaPreview: React.FC<MediaPreview> = ({ media }) => {
  if (media.type === "IMAGE")
    return (
      <Image
        src={media.url}
        alt={"preview media"}
        width={500}
        height={500}
        className={"mx-auto size-fit max-h-[30rem] rounded-2xl"}
      />
    );
  if (media.type === "VIDEO")
    return (
      <video
        src={media.url}
        controls
        className={"mx-auto size-fit max-h-[30rem] rounded-2xl"}
      />
    );

  return <p className={"text-destructive"}>Unsupported media type</p>;
};

interface MediaPreviewsProps {
  attachments: Media[];
}

export const MediaPreviews: React.FC<MediaPreviewsProps> = ({
  attachments,
}) => {
  return (
    <div className={cn("flex flex-col gap-3", attachments)}>
      {attachments.map((a) => (
        <MediaPreview media={a} key={a.id} />
      ))}
    </div>
  );
};

export default MediaPreviews;
