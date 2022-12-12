/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPasswordCode` will be added. If there are existing duplicate values, this will fail.
  - Made the column `refreshToken` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "refreshToken" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserPasswordCode_userId_key" ON "UserPasswordCode"("userId");
