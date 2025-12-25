"use client";

import { useCart } from "@/app/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrushCleaningIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { OrderPayload, OrderProducts, ProductsWithCartAndImages } from "@/app/types";
import { useTheme } from "next-themes";
import { Textarea } from "@/components/ui/textarea";
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import { useUser } from "@clerk/nextjs";
import Image from "next/image";


function Order() { 
  const {user}=useUser()
    const schema=yup.object().shape({
       name: yup.string().required("Name is required").matches(/^[A-Z][a-zA-Z]*$/, "First letter must be capital, single word only"),
       surname: yup.string().required("Surname is required").matches(/^[A-Z][a-zA-Z]*$/, "First letter must be capital, single word only"),
       phone: yup.string().required("Phone is required").matches(/^\d{9,}$/, "Phone must have at least 10 digits"),
       address: yup.string().required("Address is required"),
       extra_things: yup.string().optional(),
    })
      const { cart, isLoading, removeItem,decreaseQuantity,increaseQuantity, createOrder } = useCart();
    
  const { register, handleSubmit, reset ,formState:{errors}} = useForm<OrderProducts>({
    resolver:yupResolver(schema),
    defaultValues: {
    name: "",
    surname: "",
    phone: '',
    address: undefined,
    extra_things: "",
  },
  });

  const onSubmit = (data: OrderProducts) => {
    if(!user||!cart) return 
    
    const orderPayload:OrderPayload={
      userId: user.id,
      userEmail: user.emailAddresses[0].emailAddress,
      customer:{
        name:data.name,
        surname:data.surname,
        phone:data.phone,
        address:data.address,
        extra_things:data.extra_things
      },
      products: cart.map(el => ({
         productId: el.product!.id,
         title: el.product!.title,
         price: el.product!.price,
         quantity: el.quantity,
      })),
      totalPrice:cart.reduce((acc,el)=>acc+el.quantity*el.product?.price,0), 
      createdAt: new Date()
    }
    createOrder.mutate(orderPayload)
    reset(); 
  };
  const {theme}=useTheme()

  return (
   <div className="p-4 max-w-5xl mx-auto mt-20">
    <h1 className="text-2xl font-bold mb-8 text-left lg:text-center">Orders Products</h1>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
     <div className="ml-[-75px] md:ml-0">
       <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input placeholder="Enter name" id="name" {...register("name")} required className="mt-1 w-72 sm:w-80 md:w-full lg:w-full" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="surname">SurName</Label>
          <Input placeholder="Enter surname" id="surname" {...register("surname")} required className="mt-1 w-72 sm:w-80 md:w-full lg:w-full" />
          {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input placeholder="Enter number phone" id="phone" type="tel" {...register("phone")} required className="mt-1 w-72 sm:w-80 md:w-full lg:w-full" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input placeholder="Enter address" id="address" type="text" {...register("address")} required className="mt-1 w-72 sm:w-80 md:w-full lg:w-full" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
        <div className="space-y-4">
          <Label htmlFor="extra">Additional information (optional)</Label>
          <Textarea placeholder="Your other words" {...register("extra_things")} rows={4} className="mt-1 w-72 sm:w-80 md:w-full lg:w-full" />
        </div>
      </div>
      
      <div className="flex gap-3 flex-row md:flex-col mt-4">
        <Button asChild variant="outline" ><Link href="/">Back To Products</Link></Button>
        <Button type="submit" >Order</Button>
      </div>
     </div>
    </form>
    
    <div className="mt-8 ml-[-70px] md:ml-0 lg:mt-0">
      <h1 className="font-bold mb-6 text-center lg:text-center text-nowrap">Your products for order</h1>
      {isLoading ? (<div className="flex justify-center items-center py-8 text-sm">Loading...</div>
      ) : !cart || cart.length === 0 ? (
        <div className="flex justify-center items-center gap-2 py-8 text-sm opacity-70">Cart is empty<BrushCleaningIcon className="w-5 h-5" /></div>
      ) : (
        <div className="space-y-4 w-200 md:w-full">
          {cart.map((item: ProductsWithCartAndImages) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
              <div className="flex gap-4 flex-1">
                <div className="flex-shrink-0">
                  {item.product?.images?.[0]?.image ? (
                    <Image src={item.product.images[0].image} alt={item.product.title} width={80} height={80} className="object-cover rounded-md"
                    />
                  ) : ( <div  className="w-20 h-20  rounded-md flex items-center justify-center text-xs ">No Image</div>)}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-sm sm:text-base line-clamp-2">{item.product?.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">Price: ${item.product?.price}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button  size="sm"  className={`${theme === "dark" ? "bg-orange-400 hover:bg-orange-500" : "bg-blue-500 hover:bg-blue-600"}`} onClick={() => increaseQuantity.mutate(item.product?.id ?? '')}>+</Button>
                <Button size="sm" className={`${theme === "dark" ? "bg-orange-400 hover:bg-orange-500" : "bg-blue-500 hover:bg-blue-600"}`}onClick={() => decreaseQuantity.mutate(item.product?.id ?? '')}>-</Button>
                <Button size="sm" variant="destructive" onClick={() => removeItem.mutate(item.product?.id ?? '')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
  );
}
export default Order;