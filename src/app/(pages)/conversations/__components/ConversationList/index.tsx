"use client";
import useConversation from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import GroupChatModal from "@/components/Modal/GroupChatModal";
import ConversationBox from "@/app/(pages)/conversations/__components/ConversationBox";
import { useAuth } from "@clerk/nextjs";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
  title,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { userId } = useAuth();

  const { conversationId, isOpen } = useConversation();
  const [isModalOpen, setisModalOpen] = useState(false);

  const pusherKey = useMemo(() => userId, [userId]);


  
  

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    console.log(pusherKey);
    

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }));
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)
  }, [pusherKey, router]);



  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setisModalOpen(false)}
      />

      <aside
        className={cn(
          `
          fixed 
          inset-y-0 
          pb-20
          lg:pb-0
          lg:left-20 
          lg:w-80 
          lg:block
          overflow-y-auto 
          border-r 
          border-primary-foreground
          bg-primary/10
          
          `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="flex justify-between items-center mb-4 pt-4 px-5">
          <div
            className="
                text-2xl 
                font-bold 
                text-primary
                py-4
              "
          >
            {title}
          </div>

          <div
            onClick={() => setisModalOpen(true)}
            className="
          rounded-full
          p-2
          text-primary/40
          cursor-pointer
          hover:opacity-75
          transition"
          >
            <MdOutlineGroupAdd size={30} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </aside>
    </>
  );
};

export default ConversationList;
