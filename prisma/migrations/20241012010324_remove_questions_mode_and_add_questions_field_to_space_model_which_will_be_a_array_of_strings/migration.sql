/*
  Warnings:

  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "questions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "Questions";
