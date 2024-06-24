/*
  Warnings:

  - You are about to drop the column `username` on the `instructor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Instructor_username_key` ON `instructor`;

-- AlterTable
ALTER TABLE `instructor` DROP COLUMN `username`;
