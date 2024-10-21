/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Space` table. All the data in the column will be lost.
  - Added the required column `ownerEmail` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "ownerId",
ADD COLUMN     "ownerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
