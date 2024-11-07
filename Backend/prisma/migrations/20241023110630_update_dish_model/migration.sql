-- CreateTable
CREATE TABLE "DishRating" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "dishId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "DishRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryBoyRating" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "deliveryBoyId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "DeliveryBoyRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DishRating" ADD CONSTRAINT "DishRating_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishRating" ADD CONSTRAINT "DishRating_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryBoyRating" ADD CONSTRAINT "DeliveryBoyRating_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryBoyRating" ADD CONSTRAINT "DeliveryBoyRating_deliveryBoyId_fkey" FOREIGN KEY ("deliveryBoyId") REFERENCES "DeliveryBoy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
