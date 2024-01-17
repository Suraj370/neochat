"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import MobileItem from "./MobileItem";
import { UserButton } from "@clerk/nextjs";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) return null;

  return (
    <div
      className={cn(`
    fixed
    justify-between
    w-full
    bottom-0
    z-40
    flex
    items-center
    bg-primary-foreground
    border-t-[1px]
    lg:hidden
    `)}
    >
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          active={item.active}
          icon={item.icon}
        />
      ))}
      <div className="flex gap-x-3 leading-6 w-full justiy-centerp-4">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default MobileFooter;
