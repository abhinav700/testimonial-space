/*
  Warnings:

  - You are about to drop the column `questions` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "questions",
ADD COLUMN     "questionsList" TEXT[];
