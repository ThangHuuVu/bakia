/*
  Warnings:

  - You are about to drop the column `baseId` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `baseId` INTEGER;

-- AlterTable
ALTER TABLE `ProductVariant` DROP COLUMN `baseId`;
