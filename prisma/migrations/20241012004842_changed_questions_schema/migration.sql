/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_spaceId_fkey";

-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "Questions" (
    "questions" TEXT[],
    "spaceId" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("spaceId")
);
