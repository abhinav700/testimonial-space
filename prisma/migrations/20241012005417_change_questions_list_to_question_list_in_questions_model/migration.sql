/*
  Warnings:

  - You are about to drop the column `questionsList` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "questionsList",
ADD COLUMN     "questionList" TEXT[];
