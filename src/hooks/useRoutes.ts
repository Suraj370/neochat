import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {HiChat} from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers} from "react-icons/hi2";
import useConversation from "@/hooks/useConversation";

const useRoutes = () => {
    const pathname = usePathname()
    const {conversationId} = useConversation()

    const routes = useMemo(() => [
        {
            label: "Chats",
            href: "/conversations",
            icon: HiChat,
            active: pathname === "/conversations" || !!conversationId
        },
        {
            label: 'Users',
            href: '/',
            icon: HiUsers,
            active: pathname === '/'
        }
    ], [pathname, conversationId])
    return routes


}

export default useRoutes