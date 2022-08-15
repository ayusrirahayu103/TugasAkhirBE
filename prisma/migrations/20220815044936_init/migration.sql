/*
  Warnings:

  - You are about to drop the `mahasiswa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `mahasiswa`;

-- CreateTable
CREATE TABLE `bayi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namabayi` VARCHAR(191) NOT NULL,
    `umur` INTEGER NOT NULL,
    `namaibu` VARCHAR(191) NOT NULL,
    `tahunlahir` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `bayi_namabayi_key`(`namabayi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
