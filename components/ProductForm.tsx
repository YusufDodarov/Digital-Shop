'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ProductCategoryArray } from '@/app/types';
import { useForm } from 'react-hook-form';
import { Product, ProductCategory } from '@/lib/db';
import { upsertProduct } from '@/app/api/product/route';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UploadImage } from './UploadImage';
import { uploadImage } from '@/app/services/image';
import { useState } from 'react';

const ProductForm = (props) => {
  const { product } = props;
  const {register,handleSubmit,setValue}=useForm<Product>()
  const [tempImages, setTempImages] = useState<File[]>([]);
 const onSubmitForm = async (data: Product) => {
  try {
    const _product = {
id: product?.id,
...data,
price: Number(data.price || 0),
quantity: Number(data.quantity || 0),
category: data.category || product?.category,
    };
    const savedProduct = await upsertProduct(_product);

   if (!product?.id && tempImages.length > 0) {
  for (const file of tempImages) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", savedProduct.id);
    await uploadImage(formData);
  }
}
    toast.success(product?.id
      ? "Product updated successfully ✅"
      : "Product has been created ✅"
    );

    router.back();
  } catch (error) {
    toast.error(`Something went wrong ❌ ${error}`);
  }
};

  const router=useRouter()
  return (
   <div className='flex justify-center items-center'>
     <Card className="w-[220px] md:w-[500px] mx-auto mt-30 mb-20  ">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmitForm)}>
        <CardHeader className="pb-4">
          <CardTitle>Product</CardTitle>
          <CardDescription>Create New Product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-2 block">Product Name</Label>
            <Input {...register("title")} id="title" required defaultValue={product?.title || ''} />
          </div>
          <div>
            <Label htmlFor="category" className="mb-2 block">Category</Label>
            <Select defaultValue={product?.category}  onValueChange={(value)=>setValue("category",value as ProductCategory,{ shouldValidate: true })} required>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>{Object.values(ProductCategoryArray).map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="mb-2 block">Description</Label>
            <Textarea id="description" {...register("description")} defaultValue={product?.description || ''} className="min-h-[100px]" />
          </div>
          <div>
            <Label htmlFor="price"  className="mb-2 block">Price</Label>
            <Input type="number" id="price" {...register("price", {max: 20000000000,})} defaultValue={product?.price || ''} />
          </div>
          <div>
            <Label htmlFor="quantity" className="mb-2 block">Quantity</Label>
            <Input {...register("quantity")} type="number" id="quantity" defaultValue={product?.quantity || ''} />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-6 flex-wrap gap-2">
          <Button variant="outline" asChild className="flex-1 sm:flex-none"><Link href="/dashboard/products">Back</Link></Button>
          <Button type="submit" className="flex-1 sm:flex-none">
        {product?.id ? 'Update Product' : 'Add Product'}
          </Button>
        </CardFooter>
              </form>
               <div>
          <CardFooter>
            <UploadImage
              productId={product?.id} 
              onUploadTemp={(files) => setTempImages(prev => [...prev, ...files])}
            />
          </CardFooter>
        </div>
            </Card>
           </div>
  );
};

export default ProductForm;