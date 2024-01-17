import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";

const getUsers = async (): Promise<User[] | []> => {
  try {
    const user = await currentUser();

    if (!user) {
      // No user session, return empty array or handle accordingly
      return [];
    }
    
    

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: user.emailAddresses[0].emailAddress,
        },
      },
    });
    
    

    return users;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

export default getUsers;
