'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductsWithImages } from '@/app/types';
import { useCart } from '@/app/hooks/useCart';
import { useEffect, useState } from 'react';
import { getProductApi } from '@/app/services';
import { Heart } from 'lucide-react';
import AddProduct from '@/app/AddProduct';

export default function ProductDetail(product:ProductsWithImages) {
   const [products, setProducts] = useState<ProductsWithImages[]>([]);
      useEffect(() => {
        const getData = async () => {
          const result = await getProductApi();
          setProducts(result);
        };
        getData();
      }, []);
  const {addToCart,cart}=useCart()
 
  const data=products.filter(el=>el.id!==product.id)

  return (
    <div className="container mx-auto py-12">
       <div className='flex justify-center items-center'>
      <Card className="w-65 mx-auto shadow-lg md:w-200 ">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">{product?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">{product?.images.length > 0 ? (<Image src={product?.images[0].image} alt={product?.title} width={400} height={400} quality={70} className="rounded-xl shadow-md"/>) : (<div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400"> No Image Available</div>)}</div>
            <div className="flex flex-col justify-between">
              <p className="text-2xl font-semibold text-gray-900">${product?.price}</p>
                <p>Category: {product?.category}</p>
                <p>Quantity: {cart?.reduce((acc, el) => acc + (el.quantity ?? 0), 0) ?? 0}</p>
                <p className="font-bold line-clamp-5">Description: {product?.description || 'No description available.'}</p>
              <div className="flex flex-col gap-3 mt-4">
                <AddProduct product={product}/>
                <Button variant="secondary" asChild className="w-full py-2"><Link href="/" className="text-center">Back to Products</Link></Button>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div className='mt-20 flex flex-wrap flex-col items-start justify-start gap-8 md:items-center md:justify-center'>
      <div className='flex justify-center items-center'>
        <h1 className='font-bold text-2xl'>Other products</h1>
      </div>
      <div className='flex flex-wrap justify-center gap-8 items-center'>
        {data.map(el => (
  <div key={el.id} className='ml-[-49] md:ml-1'>
    <Card className="w-[250px] basis-[250px]  px-0 py-0 md:w-[250px] pb-5">
      <CardHeader className="p-0 ">
        <Link href={`/products/${el.id}`}>
          <div className="relative w-[250px] h-[250px] overflow-hidden">
            {el.images && el.images.length > 0 ? (
              <Image src={el.images[0].image}  alt={el.title || "No image"} fill  className="rounded-t-lg object-cover bg-center" quality={70}/>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-t-lg text-gray-400">No Image Available</div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{el?.title}</h2>
        <p className="font-bold">{el?.category}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold">${el?.price}</p>
          <div className="flex gap-2 cursor-pointer">
            <Heart />
          </div>
        </div>
        <div className="mt-3">
          <AddProduct product={el} />
        </div>
      </CardContent>
    </Card>
  </div>
))}
      </div>
    </div>
    
   </div>
  );
}
