/*
  Warnings:

  - You are about to drop the column `headerTitle` on the `Space` table. All the data in the column will be lost.
  - Added the required column `header` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "headerTitle",
ADD COLUMN     "header" TEXT NOT NULL;
