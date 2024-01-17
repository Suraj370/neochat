'use client'

import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types"
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "@/app/(pages)/conversations/[conversationId]/__components/ImageModal";

interface MessageBoxProps{
    data: FullMessageType;
    isLast?: boolean
}
const MessageBox: React.FC<MessageBoxProps> = ({data, isLast}) => {
    const {userId} = useAuth()
    const [imageModalOpen, setImageModal] = useState(false)

    const isOwn = userId === data?.sender?.externalUserId
    const seenList =(data.seen || [])
    .filter((user) => user.email !== data?.sender?.email) 
    .map((user) => user.name)
    .join(',')

    const container = cn(
        "flex p-4 gap-3",
        isOwn &&"justify-end" 
    )

    const avatar = cn(isOwn && 'order-2' )
    const body = cn(
        'flex flex-col gap-2',
        isOwn && 'items-end'
    )

    const message = cn(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-primary text-white' : 'bg-secondary-foreground/80 text-white',
        data.image? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )
    
    
  return (
    <div className= {container}>
        <div className= {avatar}>
            <Avatar user = {data.sender} />
        </div>
        <div className= {body}>
            <div className="flex items-center gap-1">
                <div className="text-sm text-secondary-foreground/60">
                    {data.sender.name || 'Deleted user'}
                </div>
                <div className=" text-xs text-secondary-foreground/80">
                    {format(new Date(data.createdAt), 'p')}
                </div>
            </div>
            <div className={message}>
            <ImageModal
              src = {data.image}
              isOpen = {imageModalOpen}
              onClose = {() => setImageModal(false)}
              
              />
            {data.image ? (

            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => {setImageModal(true)}} 
              src={data.image} 
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
            </div>
            {isLast && isOwn && seenList.length > 0 &&(
              <div className="
              text-xs
              font-light
              text-secondary-foreground/60">
                {`Seen by ${seenList}`}
              </div>
            )}
        </div>
    </div>
  )
}

export default MessageBox