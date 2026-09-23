import React, { useState } from "react";
import { PostData } from "@/types";
import { useSubmitCommentMutation } from "@/components/comments/mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, SendHorizonal } from "lucide-react";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";

interface Props {
  post: PostData;
  authenticated: boolean;
}

const CommentsInput: React.FC<Props> = ({ post, authenticated }) => {
  const [input, setInput] = useState("");
  const mutation = useSubmitCommentMutation(post.id);
  const redirectToLogin = useLoginRedirect();

  if (!authenticated) {
    return (
      <Button className="w-full" variant="outline" onClick={redirectToLogin}>
        Log in to join the conversation
      </Button>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input) return;
    mutation.mutate(
      {
        content: input,
        post,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form className={"flex w-full items-center gap-2"} onSubmit={onSubmit}>
      <Input
        placeholder={"write a comment..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type={"submit"}
        variant={"ghost"}
        size={"icon"}
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizonal />
        ) : (
          <Loader2 className={"size-5 animate-spin"} />
        )}
      </Button>
    </form>
  );
};

export default CommentsInput;
