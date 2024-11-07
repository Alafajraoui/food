/*
  Warnings:

  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACCEPTED_AND_IN_PROGRESS', 'COMPLETED_AND_IN_ROUTE', 'REJECTED');

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "specialRequest" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL;
