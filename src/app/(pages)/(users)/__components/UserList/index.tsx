'use client';

import { User } from "@prisma/client";
import UserBox from "@/app/(pages)/(users)/__components/UserBox";
interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ 
  items, 
}) => {
  return ( 
    <aside 
      className="
        fixed 
      
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-primary-foreground/50
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div 
            className="
              text-2xl 
              font-bold 
              text-primary
              py-4
            "
          >
            People
          </div>
        </div>
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  );
}
 
export default UserList;