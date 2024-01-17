'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean

}
const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    active
}) => {
  return (
    <li>
        <Link href={href} className= {cn(`
        group
        flex gap-x-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-primary/50
        hover:text-secondary-foreground
        hover:bg-primary-foreground`,
        active && ' bg-primary-foreground rounded-full text-secondary-foreground'
        )}>
            <Icon className = "h-4 w-4 shrink-0"/>
            <span className="sr-only">{label}</span>
        </Link>
    </li>
  )
}

export default DesktopItem