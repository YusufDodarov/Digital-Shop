import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (userId) {
    const cartItem = await prisma.cartItem.findMany({
      where: { userId },
      include: { 
        product: {
          include: { images: true } 
        }
      },
    });
    return NextResponse.json(cartItem);
  }
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, images } = await req.json(); 

  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });

  if (existingCartItem) {
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });

    if (images?.length) {
      for (const img of images) {
        await prisma.image.create({
          data: {
            image: img,
            productId,
          },
        });
      }
    }

    return NextResponse.json(updatedItem);
  }

  const newCartItem = await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity: 1,
    },
  });

  if (images?.length) {
    for (const img of images) {
      await prisma.image.create({
        data: {
          image: img,
          productId,
        },
      });
    }
  }

  return NextResponse.json(newCartItem);
}


export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productId } = await req.json();
  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  if (!existingCartItem) {
    return NextResponse.json(
      { error: 'cart item does not exist' },
      { status: 400 },
    );
  }
  if (existingCartItem) {
    const deletedItem = await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });
    return NextResponse.json(deletedItem);
  }
}


export async function PATCH(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { productId, action } = await req.json(); 
  
  const existingCartItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  
  if (!existingCartItem) {
    return NextResponse.json({ error: 'Cart item does not exist' }, { status: 400 });
  }
  let updatedItem;
  if (action === 'increase') {
    updatedItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
  } else if (action === 'decrease') {
    if (existingCartItem.quantity <= 1) {
      updatedItem = await prisma.cartItem.delete({
        where: { id: existingCartItem.id },
      });
    } else {
      updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity - 1 },
      });
    }
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
  
  return NextResponse.json(updatedItem);
}