/*
  Warnings:

  - Added the required column `chupingole` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "chupingole" BOOLEAN NOT NULL,
ALTER COLUMN "first_name" SET NOT NULL;
