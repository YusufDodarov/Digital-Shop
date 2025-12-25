import { CarouselDemo } from "@/components/ui/banner";
import Product from './modules/Products';
import { MonitorSmartphone } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user=await currentUser()
  const isAdmin=user?.privateMetadata?.isAdmin??false
  return (
   <div className="flex flex-col items-center mt-40 min-h-screen"> 
    <CarouselDemo/>
    <div className="mt-20 justify-center flex flex-col items-center">
      <span className="text-2xl font-bold ">You can see all the products here!</span>
      <div className="flex items-center gap-3 mt-6">
        <MonitorSmartphone />
        <h1>Digital Shop</h1>
      </div>
    </div>
    <Product isAdmin={isAdmin} />
   </div>
  );
}