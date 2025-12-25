"use server"
import prisma, { Product } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = await prisma.product.findMany({ include: { images: true } });
  return NextResponse.json({ data });
}


export const getProductById = async(id:string)=>{
    const result =await prisma.product.findFirst({include:{images:true},where:{id}})
    if(result) return result
}

export const getProducts = async () => {
  const result = await prisma.product.findMany({ include: { images: true } });
  return result;
};

export const upsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }

  revalidatePath('/dashboard/products');
  return result;
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  redirect('/dashboard/products');
};

