import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
 
export default function Page() {
  return (<>
  <div className="flex flex-col">
  <SignIn />
  <div className="text-sm mt-2 ml-5 flex gap-2">
    <p>Forgot Password?</p>
    <Link href= "/forget-password" className="text-primary/80 ml-2">
      Reset here
    </Link>
  </div>
  </div>
  
  </>);
}