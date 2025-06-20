"use client";

import React, { ClipboardEvent } from "react";
import "./styles.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useSession } from "@/context/sessionProvider";
import UserAvatar from "@/components/userAvatar";
import { usePostMutation } from "@/components/posts/editor/mutation";
import LoadingButton from "@/components/loadingButton";
import useMediaUpload from "@/components/posts/editor/useMediaUpload";
import AttatchmentButtons from "@/components/posts/editor/AttatchmentButtons";
import { AttachmentPreviews } from "@/components/posts/editor/AttachmentPreview";
import { Loader2 } from "lucide-react";
import { useDropzone } from "@uploadthing/react";
import { cn } from "@/lib/utils";

const PostEditor: React.FC = () => {
  const mutation = usePostMutation();
  const {
    attachments,
    removeAttachment,
    uploadProcess,
    isUploading,
    startUpload,
    reset: resetMediaUploads,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { ...rootProps } = getRootProps();

  const { user } = useSession();
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          bold: false,
          italic: false,
        }),
        Placeholder.configure({
          placeholder: "Write something awesome...",
        }),
      ],
    },
    [],
  );

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function submit() {
    mutation.mutate(
      {
        content: input,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
        },
      },
    );
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }

  return (
    <div className={"flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm"}>
      <div className={"flex gap-5"}>
        <UserAvatar avatarUrl={user.avatarUrl} className={"sm:inline hidden"} />
        <div {...rootProps} className={"w-full h-full"}>
          <EditorContent
            editor={editor}
            onPaste={onPaste}
            className={cn(
              "w-full max-h-[20rem] h-full overflow-y-auto bg-secondary py-4 rounded-2xl px-5",
              isDragActive && "outline-dashed",
            )}
          />
          <input {...getInputProps()} />
        </div>
      </div>
      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )}
      <div className={"flex justify-end items-center gap-3"}>
        {isUploading && (
          <>
            <span>{uploadProcess ?? 0}%</span>
            <Loader2 className={"size-5 animate-spin text-primary"} />
          </>
        )}
        <AttatchmentButtons
          onFilesSelected={startUpload}
          disabled={isUploading || attachments.length >= 5}
        />
        <LoadingButton
          loading={mutation.isPending}
          onClick={submit}
          disabled={!input.trim() || isUploading}
          className={"min-w-20"}
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
