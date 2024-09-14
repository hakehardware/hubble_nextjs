/*
  Warnings:

  - You are about to drop the column `isCluster` on the `Container` table. All the data in the column will be lost.
  - You are about to drop the column `natsUrl` on the `Container` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `Container` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Container` DROP COLUMN `isCluster`,
    DROP COLUMN `natsUrl`,
    MODIFY `type` ENUM('PLOTTER', 'FARMER', 'CACHE', 'CONTROLLER', 'NODE', 'NATS') NOT NULL;
