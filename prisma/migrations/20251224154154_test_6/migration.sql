/*
  Warnings:

  - You are about to drop the column `image` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "image";
