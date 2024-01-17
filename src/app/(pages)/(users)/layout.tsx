import getUsers from "@/actions/getUsers";
import UserList from "@/app/(pages)/(users)/__components/UserList";
export default async function UsersLayout({
    children
  }: {
    children: React.ReactNode,
  }) {
    const users = await getUsers();
  
    return (
        <div className="h-full">
          <UserList items={users} />
          {children}
        </div>
    );
  }