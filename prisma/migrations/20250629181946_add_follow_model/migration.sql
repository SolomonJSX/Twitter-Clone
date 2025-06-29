/*
  Warnings:

  - You are about to drop the column `userId` on the `Follow` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Follow" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Follow" ("_id") SELECT "_id" FROM "Follow";
DROP TABLE "Follow";
ALTER TABLE "new_Follow" RENAME TO "Follow";
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
