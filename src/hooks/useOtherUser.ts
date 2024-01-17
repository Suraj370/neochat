import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const { userId } = useAuth();

  const otherUser = useMemo(() => {
    const otherUser = conversation?.users.filter(
      (user) => user.externalUserId !== userId
    );


    return otherUser[0];
  }, [conversation?.users, userId]);

  return otherUser;
};

export default useOtherUser;
