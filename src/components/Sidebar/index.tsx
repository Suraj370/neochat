import { cn } from '@/lib/utils';
import React from 'react'
import Desktop from '@/components/Sidebar/Desktop';
import MobileFooter from '@/components/Sidebar/Mobile';
import { currentUser } from '@clerk/nextjs';

const Sidebar = async({children}: {
    children: React.ReactNode;
}) => {

  
  
  return (
    <div className= 'h-full'>
        <Desktop/>
        <MobileFooter/>
        <main className= {cn("lg:pl-20 h-full")}>
            {children}
        </main>
    </div>
  )
}

export default Sidebar