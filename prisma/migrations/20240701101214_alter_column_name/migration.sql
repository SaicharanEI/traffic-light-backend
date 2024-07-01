/*
  Warnings:

  - You are about to drop the column `remainingTime` on the `trafficlight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `trafficlight` DROP COLUMN `remainingTime`,
    ADD COLUMN `timeRemaining` INTEGER NOT NULL DEFAULT 10;
