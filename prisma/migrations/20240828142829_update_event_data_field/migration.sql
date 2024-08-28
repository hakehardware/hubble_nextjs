/*
  Warnings:

  - You are about to alter the column `data` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `data` JSON NOT NULL;
