import { NextApiRequest, NextApiResponse } from "next";
import { currentUser, useAuth } from "@clerk/nextjs";
import { pusherServer } from "@/lib/pusher";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){
    const user =  await currentUser()
    if(!user?.id){
        return response.status(401)
    }
    const socketId = request.body.socket_Id
    const channel = request.body.channel_name
    const data = {
        user_id: user.id,
    }
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data)
    return response.send(authResponse)

}