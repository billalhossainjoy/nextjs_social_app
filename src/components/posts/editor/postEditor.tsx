"use client"

import React from 'react';
import "./styles.css"
import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import {submitPost} from "@/components/posts/editor/action";
import {useSession} from "@/context/sessionProvider";
import UserAvatar from "@/components/userAvatar";
import {Button} from "@/components/ui/button";


const PostEditor: React.FC = () => {
    const {user} = useSession()
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "Write something awesome...",
            })
        ],
    },[])

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || ""

    async function submit() {
        await submitPost(input)
        editor?.commands.clearContent()
    }

    return (
        <div className={"flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm"}>
            <div className={"flex gap-5"}>
                <UserAvatar avatarUrl={user.avatarUrl} className={"sm:inline hidden"}/>
                <EditorContent editor={editor} className={"w-full max-h-[20rem] overflow-y-auto bg-secondary py-2 rounded-2xl px-5 "}/>
            </div>
            <div className={"flex justify-end"}>
                <Button onClick={submit} disabled={!input.trim()} className={"min-w-20"}>
                    Post
                </Button>
            </div>

        </div>
    );
};

export default PostEditor;