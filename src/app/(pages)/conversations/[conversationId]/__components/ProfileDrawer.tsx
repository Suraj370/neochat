"use client";

import Avatar from "@/components/Avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { IoTrash } from "react-icons/io5";
import Modal from "@/app/(pages)/conversations/[conversationId]/__components/DeletionModal";
import AvatarGroup from "@/components/Avatar/AvatarGroup";

interface ProfileDrawerProps {
  children: React.ReactNode;
  data: Conversation & {
    users: User[];
  };
}
const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ children, data }) => {
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return otherUser ? format(new Date(otherUser.createdAt), "PP") : "";
  }, [otherUser?.createdAt]);

  const title = useMemo(() => {
    return data.name || (otherUser ? otherUser.name : "");
  }, [data.name, otherUser?.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return otherUser ? "Active" : "";
  }, [data, otherUser]);
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="mt-6 flex-1 px-4 sm:px-6">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  {data.isGroup ? (
                    <AvatarGroup users={data.users} />
                  ) : (
                    <Avatar user={otherUser} />
                  )}
                </div>
                <div>{title}</div>
                <div
                  className="
                    text-sm text-secondary-foreground/55"
                >
                  {statusText}
                </div>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            <div className="flex gap-10 my-8 items-center justify-center">
              <Modal>
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    items-center
                    cursor-pointer
                    hover:opacity-75
                    "
                >
                  <div
                    className="
                        w-10
                        h-10
                        bg-secondary/50
                        rounded-full
                        flex
                        items-center
                        justify-center"
                  >
                    <IoTrash size={20} />
                  </div>
                  <div
                    className="
                        text-sm
                        font-light
                        text-destructive/50"
                  >
                    Delete
                  </div>
                </div>
              </Modal>
            </div>
            <div
              className="
           w-full
           py-5
           sm:px-0
           sm:pt-0"
            >
              <dl
                className="
            space-y-8
            px-4
            sm:space-y-6
            sm:px-6"
              >
                {data.isGroup && (
                  <div>
                    <dt
                      className="
                      text-sm
                      font-medium
                      text-secondary-foreground/80
                      sm:w-40
                      sm:flex-shrink-0"
                    >Emails</dt>
                    <dd
                      className="
                        mt-1
                        text-sm
                        text-secondary-foreground/95
                        sm:col-span-2"
                    >
                      {data.users.map((user) => user.email).join(',')}
                    </dd>
                  </div>
                )}
                {!data.isGroup && (
                  <div>
                    <dt
                      className="
                        text-sm
                        font-medium
                        text-secondary-foreground/80
                        sm:w-40
                        sm:flex-shrink-0"
                    >
                      Email
                    </dt>
                    <dd
                      className="
                        mt-1
                        text-sm
                        text-secondary-foreground/95
                        sm:col-span-2"
                    >
                      {otherUser?.email || "Deletd User"}
                    </dd>
                  </div>
                )}
                {!data.isGroup && (
                  <>
                    <hr />
                    <div>
                      <dt
                        className="
                        text-sm
                        font-medium
                        text-secondary-foreground/80
                        sm:w-40
                        sm:flex-shrink-0"
                      >
                        Joined
                      </dt>
                      <dd
                        className="
                        mt-1
                        text-sm
                        text-secondary-foreground/90
                        sm:col-span-2"
                      >
                        <time dateTime={joinedDate}>{joinedDate}</time>
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileDrawer;
