import { SignIn } from "@clerk/nextjs";

export default function page() {
  return <div className="flex items-center justify-center min-h-screen mt-20"><SignIn/></div>
}

