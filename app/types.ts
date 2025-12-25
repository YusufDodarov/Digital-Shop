import { Image, Prisma } from "@/lib/db";
import { ErrorInfo, ReactNode } from "react";

export type ProductsWithImages = Prisma.ProductGetPayload<{include: { images: true };}>;

export type ProductsWithCartAndImages = Prisma.CartItemGetPayload<{
  include: { images: true, product: true };
}>;

export interface ProductTable {
  products:ProductsWithImages[]
}

export const ProductCategory = {
  MOBILE: 'MOBILE',
  LAPTOP: 'LAPTOP',
  WATCH: 'WATCH',
  OTHERS: 'OTHERS',
};


export const ProductCategoryArray = Object.values(ProductCategory);

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface CaughtError {
  error: Error;
  errorInfo: ErrorInfo;
}

export type ProductMetadata = {
  title?: string;
  description?: string | null;
  keywords?: string[];
  images?: Image[] | null;
};

export interface OrderProducts {
  name:string
  surname:string
  phone: number|string
  order: string
  quantity:number
  address:string
  extra_things:string
}

export type Products = {
  products: ProductsWithImages[];
  search: string;
  setSearchValue: (value: string) => void;
};

export type FavoriteContext={
  favorites:ProductsWithImages[]
  toggleFavorite: (product:ProductsWithImages)=>void
}

export interface ArticleProps {
  product: ProductsWithImages;
}


export type OrderPayload={
  userId:string
  userEmail:string
  customer:{
    name:string
    surname:string
    phone:string | number
    address:string
    extra_things?:string
  }
  products: {
    productId: string
    title: string
    price: number
    quantity: number
    image: string
}[]
  totalPrice: number
  createdAt: Date
}