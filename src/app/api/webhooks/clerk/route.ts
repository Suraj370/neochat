import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  //you can find this in the Clerk Dashboard -> Webhooks -> Choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please addCLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  switch (eventType) {
    case "user.created":
      await prisma.user.create({
        data: {
          externalUserId: payload.data.id,
          name: payload.data.first_name + " " + payload.data.last_name,
          email: payload.data.email_addresses[0].email_address,
          imageUrl: payload.data.image_url,
        },
      });
      // console.log('user created');
      
      break;
    case "user.updated":
      const currentUser = prisma.user.findUnique({
        where: {
          externalUserId: payload.data.id,
        },
      });
      if(!currentUser){
        return new Response("User not found", {status: 404});
      }

      await prisma.user.update({
        where: {
          externalUserId: payload.data.id,
        },
        data: {
          name: payload.data.first_name + " " + payload.data.last_name,
          imageUrl: payload.data.image_url,
          email: payload.data.email_addresses[0].email_address,
        }
      })
      break;
    case "user.deleted":
      const user = await prisma.user.findUnique({
        where: { externalUserId: payload.data.id },
      });
      if(!user) break
      const conversationIds = user.conversationIds
      await Promise.all(
        conversationIds.map(async (conversationId) => {
          await prisma.conversation.update({
            where: { id: conversationId },
            data: {
              users: {
                disconnect: [{ id: user.id }],
              },
            },
          });
        })
      );
    


      await prisma.user.delete({
        where: {
          externalUserId: payload.data.id,
        }
      })
  }

  return new Response("", { status: 200 });
}
