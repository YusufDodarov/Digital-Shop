import AddProduct from "@/app/AddProduct";
import { ArticleProps } from "@/app/types";
import Like from "@/components/Like";
import { Button } from "@/components/ui/button";
import { Card, CardContent,  CardHeader } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


function Article({ product,isAdmin }: ArticleProps) {
  try {
    const img = product?.images?.[0]?.image;
  
  return (
    <Card className="w-[250px] basis-[250px] px-0 py-0 md:w-[250px] pb-5">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative w-[250px] h-[250px] overflow-hidden">
            <Image src={img && img.trim() !== "" ? img : "/no-image.png"} alt={product?.title || "No image"} fill className="rounded-t-lg object-cover bg-center"/>
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product?.title}</h2>
        <p className="font-bold">{product?.category}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold">${product?.price}</p>
          <div className="flex gap-2 cursor-pointer">
            <div>
              <Like isAdmin={isAdmin} product={product}/>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {isAdmin?
         <Button className="w-full bg-blue-500 text-1xl" asChild><Link href={`/dashboard/products/${product.id}`}><Edit/>Edit Products</Link></Button>:
          <AddProduct product={product} /> 
          }
        </div>
      </CardContent>
    </Card>
  );
  } catch (error) {
    return <div></div>
  }
}

export default Article;