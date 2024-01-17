"use client";
import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import Avatar from "@/components/Avatar";
import LoadingModal from "@/components/Modal/LoadingModal";

interface UserBoxProps {
  data: User;
}
const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const handleClick = useCallback(() => {
    setisLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setisLoading(false));
  }, [data, router]);
  return (
    <>
      {isLoading &&<LoadingModal />}
      <div
        onClick={handleClick}
        className={cn(`
    w-full
    relative
    my-4
    flex
    items-center
    space-x-3
    rounded-2xl
    bg-secondary
    p-3
    hover:bg-secondary-foreground/20
    transition
    cursor-pointer`)}
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none ">
            <div
              className={cn(`
          flex
          justify-between
          items-center
          mb-1`)}
            >
              <p
                className="
            text-sm
            font-medium
             text-secondary-foreground"
              >
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
