import {prisma} from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

const getCurrentUser = async() => {
    try {
        const user = await currentUser();
        if(!user?.emailAddresses){
            return null
        }

        const dbUser = await prisma.user.findUnique({
        where:{
            email: user.emailAddresses[0].emailAddress as string
        }
        })
        if(!dbUser){
            return null
        }

        const userone = await prisma.user.findUnique({
            where: {
                externalUserId: user.id
            }
        })
        
        
        return dbUser
    } catch (error: any) {
        return null
    }
}

export default getCurrentUser;