/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Gene` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Gene` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Currency` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Gene` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `ProductVariant` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
