"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
}
const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
}) => {
  return (
    <Link
      href={href}
      className={cn(`
    group
    flex
    gap-x-3
    leading-6
    font-semibold
    text-sm
    w-full
    justify-center
    p-4
    text-primary/50
    hover:text-secondary-foreground
    hover:bg-primary-foreground`,
    active && ' bg-secondary rounded-full text-secondary-foreground'
    )}
    >
      <Icon />
    </Link>
  );
};

export default MobileItem;
