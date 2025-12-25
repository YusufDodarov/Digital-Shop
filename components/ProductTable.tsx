'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table';
import { ProductTable as Props } from '@/app/types';
import { deleteProduct } from '@/app/api/product/route';
import { deleteImage } from '@/app/services/image';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

const ProductTable = ({ products }: Props) => {
    const { theme } = useTheme();

    const onDeleteProduct = async (id: string) => {
        try {
            const res = await fetch(`/api/image?productId=${id}`, { method: 'GET' });
            const data = await res.json();
            if (data.images?.length) {
                await Promise.all(
                    data.images.map((img: { id: string }) => deleteImage(img.id))
                );
            }
            await deleteProduct(id);
            toast.success("Product and its images deleted ✅");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product ❌");
        }
    };

    return (
        <>
            <div className="hidden sm:inline border rounded-lg shadow-md mt-4">
                <div className={`flex justify-between items-center flex-wrap p-4 rounded-t-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                    <h1 className="text-xl font-semibold">Products</h1>
                    <Button asChild className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/dashboard/products/new">
                            Add New Product <PlusCircle />
                        </Link>
                    </Button>
                </div>
                <Table className='indent-3'>
                    <TableHeader>
                        <TableRow className={theme === "dark" ? "bg-gray-800 border-b-2 border-t-1 border-t-white border-b-white" : "bg-white border-t-1 border-t-black"}>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">Category</TableHead>
                            <TableHead className="text-center">Price</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-center">Image</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
                        {products.map((product) => (
                            <TableRow key={product.id} className={theme === "dark" ? "border-gray-700" : "border-gray-200"}>
                                <TableCell className={theme === "dark" ? "text-gray-200" : "text-gray-900"}>{product.title}</TableCell>
                                <TableCell className={`text-center ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{product.category}</TableCell>
                                <TableCell className={`text-center ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{product.price}</TableCell>
                                <TableCell className={`text-center ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{product.quantity}</TableCell>
                                <TableCell className="text-center">
                                    <Image src={product.images[0]?.image && product.images[0].image.trim() !== '' ? product.images[0].image : '/no-image.png'} alt={product.title} width={25} height={10} className="rounded-full m-auto"/>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center gap-2 items-center">
                                        <Button variant="ghost" asChild>
                                            <Link href={`/dashboard/products/${product.id}`}><Edit /></Link>
                                        </Button>
                                        <Button onClick={() => { onDeleteProduct(product.id); }} variant="ghost"><Trash2 /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
                        <TableRow>
                            <TableCell colSpan={5} className={theme === "dark" ? "text-gray-200" : "text-gray-900"}>Total</TableCell>
                            <TableCell className={`text-right ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{products.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
      {/* moblie version */}
            <div className='flex justify-center items-center'>
                <div className={`sm:hidden border w-[200px] rounded-lg shadow-md mt-4 ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>
                    <div className={`flex justify-between items-center gap-2 p-4 rounded-t-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                        <h1 className={`text-[18px] font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>Products</h1>
                        <Button asChild className='bg-blue-500 hover:bg-blue-600 w-10'>
                            <Link href="/dashboard/products/new"><PlusCircle /></Link>
                        </Button>
                    </div>
                    <div className='space-y-4'>
                        {products.map(product => (
                            <div key={product.id} className={`border rounded-lg p-4 shadow-sm ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className="flex justify-center mb-3">
                                    <Image src={product.images[0]?.image && product.images[0].image.trim() !== '' ? product.images[0].image : '/no-image.png'} alt={product.title} width={100} height={80} className='rounded-lg object-cover'/>
                                </div>
                                <div className='mb-2'>
                                    <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>{product.title}</h3>
                                </div>
                                <div className="space-y-2 text-sm mb-4">
                                      <p className="flex justify-between">
                                          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Category:</span>
                                          <span className={theme === "dark" ? "text-gray-200" : "text-gray-900"}>{product.category}</span>
                                      </p>
                                      <p className="flex justify-between">
                                          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Price:</span>
                                          <span className={`font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>${product.price}</span>
                                      </p>
                                      <p className="flex justify-between">
                                          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Quantity:</span>
                                          <span className={theme === "dark" ? "text-gray-200" : "text-gray-900"}>{product.quantity}</span>
                                      </p>
                                </div>
                                <div className={`flex justify-between pt-2 border-t flex-wrap ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                                    <Button variant="ghost" size="sm" asChild className={`text-blue-600 ${theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-800"}`}>
                                        <Link href={`/dashboard/products/${product.id}`}><Edit className="h-4 w-4 mr-1" /> Edit</Link>
                                    </Button>
                                    <Button onClick={() => onDeleteProduct(product.id)} variant="ghost" size="sm" className={`hover:text-red-800 ${theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600"}`}>
                                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className={`text-center pt-4 text-sm font-medium border-t ${theme === "dark" ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"}`}>
                            Total: {products.length} products
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductTable;