import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Camera } from "lucide-react";
import CropImageDialog from "@/components/cropImage";
import Resizer from "react-image-file-resizer";

interface Props {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}

const AvatarInput: React.FC<Props> = ({ src, onImageCropped }) => {
  const [imageToCrop, setImageToCrop] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => {
        setImageToCrop(uri as File);
      },
      "file",
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={fileInputRef}
        className={"hidden sr-only"}
      />
      <button
        type={"button"}
        onClick={() => fileInputRef.current?.click()}
        className={"group relative block"}
      >
        <Image
          src={src}
          alt={"avatar preview"}
          width={150}
          height={150}
          className={"size-32 flex-none rounded-full object-cover"}
        />
        <span
          className={
            "absolute inset-0 m-auto flex items-center justify-center rounded-full bg-black/30 text-white transition-colors duration-200 group-hover:bg-black/25"
          }
        >
          <Camera size={34} />
        </span>
      </button>
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={1}
          onCropped={onImageCropped}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
};

export default AvatarInput;
