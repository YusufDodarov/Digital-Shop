import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: body.customer.name,
      surname: body.customer.surname,
      phone: body.customer.phone,
      address: body.customer.address,
      extraThings: body.customer.extra_things,
      totalPrice: body.totalPrice,
      products: {
        create: body.products.map((p: any) => ({
          productId: p.productId,
          title: p.title,
          price: p.price,
          quantity: p.quantity,
        })),
      },
    },
    include: { products: true },
  })

 await prisma.cartItem.deleteMany({
  where: {
    userId: user.id,
  },
})


  return NextResponse.json(order)
}
export async function GET() {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const orders = await prisma.order.findMany({
    include: { products: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orders)
}

export async function DELETE(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { orderId } = await req.json()
  if (!orderId) return NextResponse.json({ error: "Order ID required" }, { status: 400 })

  await prisma.orderProduct.deleteMany({ where: { orderId } })
  await prisma.order.delete({ where: { id: orderId } })

  return NextResponse.json({ success: true })
}
