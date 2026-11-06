/*
  Warnings:

  - A unique constraint covering the columns `[supplierSku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `supplier` VARCHAR(191) NOT NULL DEFAULT 'MANUAL',
    ADD COLUMN `supplierBrandId` VARCHAR(191) NULL,
    ADD COLUMN `supplierPrice` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `supplierSku` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_supplierSku_key` ON `Product`(`supplierSku`);
