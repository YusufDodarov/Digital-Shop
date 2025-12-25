'use client';
import { BrushCleaningIcon, Delete,  ShoppingCart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useCart } from '@/app/hooks/useCart';
import { ProductsWithCartAndImages } from '../../app/types';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useDeleteOrders, useOrders } from '@/app/hooks/useHooks';

export default function CartDropdown({isAdmin}:{isAdmin:boolean}) {
  
 const { data: orders = [],isLoading:loadingOrder } = useOrders()
 const deletes=useDeleteOrders()
  const {user}=useUser()
  const router=useRouter()
  const { cart, isLoading, removeItem } = useCart();

  
  
  return (
    <div className="w-5 h-5 transition-colors duration-200">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {isAdmin? orders?.length ?? 0
              : cart?.reduce((acc, el) => acc + (el.quantity ?? 0), 0) ?? 0}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[250px] sm:w-64 sm:min-w-[280px] p-2 sm:p-3 max-h-[60vh] overflow-y-auto">
       {isAdmin? (
         <div className="space-y-3">
              {loadingOrder ? (
                <p className="text-xs text-center">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-xs text-center">No orders yet</p>
              ) : (
                orders.map((order: any) => (
                  <div key={order.id} className="border rounded-md p-2 space-y-1">
                    <p className="font-semibold text-sm">Name: {order.name}</p>
                    <p className="font-semibold text-sm">Surname: {order.surname}</p>
                    <p className="text-xs">Phone: {order.phone}</p>
                    <p className="text-xs">Adress: {order.address}</p>
                    <div className="mt-2 space-y-1">
                      {order.products?.map((el: any) => (
                        <div key={el.id} className="flex justify-between text-xs">
                          <span>{el.title}</span>
                          <span>${el.price}</span>
                          
                        </div>
                      ))}
                    </div>
                   <div className='flex justify-between mt-2 items-center'>
                     <p className="font-bold text-sm mt-2">Total: ${order.totalPrice}</p>
                    <Button className='bg-red-500 mt-2 hover:bg-red-600' onClick={()=>deletes.mutate(order.id)}><Delete/></Button>
                   </div>
                   <div>
                    {order.extraThings && <p>Description: {order.extraThings}</p>}
                   </div>
                  </div>
                ))
              )}
            </div>)
       :<div>
           <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Cart Items</h4>
          {isLoading ? (
            <div className="flex justify-center items-center py-2 text-xs sm:text-sm">Loading...</div>
          ) : !cart || cart.length === 0 ? (
            <div className="flex justify-start items-center gap-1 py-2 text-xs sm:text-sm">
              Cart is empty <BrushCleaningIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {cart.map((item: ProductsWithCartAndImages) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-1 sm:pb-2 last:border-b-0">
                  <div className="mb-1 sm:mb-0 sm:w-3/4">
                    <p className="text-xs sm:text-sm font-medium line-clamp-1 sm:line-clamp-2">{item.product?.title}</p>
                    <p className="text-xs">Price: ${item.product?.price}</p>
                    <p className="text-xs">Quantity: {item.quantity}</p>
                    <div className='mt-2'>
                      {item.product?.images?.[0]?.image ? (
                     <img src={item.product.images[0].image} alt={item.product.title} className="w-10 h-10 object-cover" />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center text-xs ">No Image</div>
                      )}
                    </div>

                  </div>
                  <Button onClick={() => removeItem.mutate(item.product?.id??'')} variant="destructive" size="sm" className="w-full sm:w-auto self-end sm:self-center mt-1 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </Button>
                </div>
              ))}
            </div>
          )}
          {cart?.length!==0?<div className='mt-2 flex justify-between items-center'>
            <h1>Total: ${cart?.reduce((acc, el) => acc + ((el.quantity ?? 0) * (el.product?.price ?? 0)), 0) ?? 0}</h1>
            <Button disabled={!user} onClick={() => user && router.push('/ordering/products')}>Order</Button>
          </div>:<div></div>}
        </div>}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}