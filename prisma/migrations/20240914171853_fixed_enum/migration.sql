/*
  Warnings:

  - The values [PLOTTER,CACHE,CONTROLLER] on the enum `Container_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Container` MODIFY `type` ENUM('CLUSTER_PLOTTER', 'CLUSTER_FARMER', 'CLUSTER_CACHE', 'CLUSTER_CONTROLLER', 'FARMER', 'NODE', 'NATS') NOT NULL;
