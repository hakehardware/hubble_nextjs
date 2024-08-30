-- CreateTable
CREATE TABLE `Container` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `isCluster` BOOLEAN NOT NULL,
    `natsUrl` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Container_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
