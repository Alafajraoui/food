-- CreateEnum
CREATE TYPE "DeliveryRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "requestStatus" "DeliveryRequestStatus" NOT NULL DEFAULT 'PENDING';
