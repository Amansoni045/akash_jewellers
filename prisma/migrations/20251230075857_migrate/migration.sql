-- AlterTable
ALTER TABLE "public"."Contact" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."Jewellery" ADD COLUMN     "images" TEXT[];

-- CreateTable
CREATE TABLE "public"."LivePrice" (
    "id" TEXT NOT NULL,
    "gold" DOUBLE PRECISION NOT NULL,
    "goldRTGS" DOUBLE PRECISION NOT NULL,
    "silver" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LivePrice_pkey" PRIMARY KEY ("id")
);
