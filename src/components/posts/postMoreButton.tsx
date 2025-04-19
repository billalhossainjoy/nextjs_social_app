import React, {useState} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {PostData} from "@/types";
import {MoreHorizontal, Trash2} from "lucide-react";
import DeletePostDialog from "@/components/posts/deletePostDialog";

type Props = {
    post: PostData;
    classname?: string;
};

const PostMoreButton: React.FC<Props> = ({post, classname}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    return (
       <>
           <DropdownMenu>
               <DropdownMenuTrigger asChild>
                   <Button size={"icon"} variant={"ghost"} className={classname}>
                       <MoreHorizontal />
                   </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent  onClick={() => {setShowDeleteDialog(true)}}>
                   <span className={"flex items-center gap-3 text-destructive cursor-pointer"}>
                       <Trash2 className={"size-4"}/>
                       delete
                   </span>
               </DropdownMenuContent>
           </DropdownMenu>
           <DeletePostDialog post={post} open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} />
       </>
    );
};

export default PostMoreButton;