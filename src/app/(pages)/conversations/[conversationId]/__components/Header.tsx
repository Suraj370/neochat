"use client";
import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "@/app/(pages)/conversations/[conversationId]/__components/ProfileDrawer";
import AvatarGroup from "@/components/Avatar/AvatarGroup";
interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, []);
  return (
    <div
      className="
    flex
    bg-secondary/80
    w-full
    border-b-[1px]
    sm:px-4
    py-3
    px-4
    lg:px-6
    justify-between
    items-center
    shadow-sm"
    >
      <div className="flex gap-3 items-center">
        <Link
          className="
        lg:hidden
        block
        text-primary
        hover:text-primary/40
        transition
        cursor-pointer
        "
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        {conversation.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser} />
        )}

        <div className="flex flex-col">
          <div>{conversation?.name || otherUser?.name || "Delete"}</div>
          <div
            className="
          text-sm
          font-light
          text-accent-foreground"
          >
            {statusText}
          </div>
        </div>
      </div>

      <ProfileDrawer data={conversation}>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => {}}
          className="
      text-primary/70
      cursor-pointer
      hover:text-primary/50
      transition"
        />
      </ProfileDrawer>
    </div>
  );
};

export default Header;

// const Header = () => {
//   return (
//     <div>Header</div>
//   )
// }

// export default Header
