/*
  Warnings:

  - The primary key for the `ClusterCache` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ClusterCache` table. All the data in the column will be lost.
  - The primary key for the `ClusterController` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ClusterController` table. All the data in the column will be lost.
  - The primary key for the `ClusterFarmer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ClusterFarmer` table. All the data in the column will be lost.
  - The primary key for the `ClusterPlotter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ClusterPlotter` table. All the data in the column will be lost.
  - The primary key for the `Farmer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Farmer` table. All the data in the column will be lost.
  - The primary key for the `Node` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ClusterCache` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`containerId`);

-- AlterTable
ALTER TABLE `ClusterController` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`containerId`);

-- AlterTable
ALTER TABLE `ClusterFarmer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`containerId`);

-- AlterTable
ALTER TABLE `ClusterPlotter` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`containerId`);

-- AlterTable
ALTER TABLE `Farmer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`containerId`);

-- AlterTable
ALTER TABLE `Node` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`containerId`);
