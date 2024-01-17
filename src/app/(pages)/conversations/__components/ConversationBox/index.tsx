"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {  User } from "@prisma/client";
import { format } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/Avatar/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const { userId } = useAuth();
  const otherUser = useOtherUser(data);
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    const currentUser = data.users.filter(
      (user) => user.externalUserId === userId
    );

    return currentUser[0]?.email;
  }, [userId]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];
    if (!userEmail) return false;
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, []);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);


  return (
    <div
    onClick={handleClick}
      className={cn(
        `
      w-full
      relative
      flex
      items-center
      space-x-3
      bg-secondary
      px-5
      py-2.5
      border-t
      border-y-[0.1px]
      border-secondary-foreground/30
      
      hover:bg-secondary-foreground/20
      rounded-lg
      transition
      cursor-pointer
      `,
        selected ? "bg-primary/40" : "bg-secondary/70"
      )}
    >  {data.isGroup? (
      <AvatarGroup users={data.users}/>
    ):  <Avatar user={otherUser} />
  }
      <div className="min-w-0 flex-1">
        <div className="focus:outline">
          <div
            className="
        flex
        justify-between
        items-center
        mb-1"
          >
            <p
              className="
          text-md
          font-medium
          text-secondary-foreground/70"
            >
              {data.name || otherUser?.name || 'Deleted User'}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p 
            className={cn(`
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}>
              {lastMessageText}
            </p>

        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
