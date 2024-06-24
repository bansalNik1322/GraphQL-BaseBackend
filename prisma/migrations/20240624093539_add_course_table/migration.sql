-- CreateTable
CREATE TABLE `Course` (
    `courseId` INTEGER NOT NULL AUTO_INCREMENT,
    `courseImage` VARCHAR(191) NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `courseCategory` VARCHAR(191) NOT NULL,
    `courseSubCategory` VARCHAR(191) NULL,
    `avgRating` DOUBLE NULL,
    `totalEnrolled` INTEGER NOT NULL DEFAULT 0,
    `isDraft` BOOLEAN NOT NULL DEFAULT false,
    `registrationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT true,
    `description` VARCHAR(191) NULL,
    `instructorId` INTEGER NULL,

    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `isPhoneVerified` BOOLEAN NOT NULL DEFAULT false,
    `isEmailVerified` BOOLEAN NOT NULL DEFAULT false,
    `verificationToken` VARCHAR(191) NULL,
    `profilePictureUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastLogin` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NULL,
    `socialProvider` VARCHAR(191) NULL,
    `socialProviderId` VARCHAR(191) NULL,
    `status` BOOLEAN NULL DEFAULT true,
    `otp` VARCHAR(191) NULL,
    `lastOtpSentAt` DATETIME(3) NULL,
    `otpAttempts` INTEGER NULL,

    UNIQUE INDEX `Instructor_username_key`(`username`),
    UNIQUE INDEX `Instructor_email_key`(`email`),
    UNIQUE INDEX `Instructor_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
