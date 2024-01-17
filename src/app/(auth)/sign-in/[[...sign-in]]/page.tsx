import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
 
export default function Page() {
  return (<>
  <div className="flex flex-col">
    <div className="flex justify-center">
      <Image src={"/images/logo.png"} alt = "neochat"  width={250} height={250}/>
    </div>
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