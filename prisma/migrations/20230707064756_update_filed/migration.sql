/*
  Warnings:

  - You are about to drop the column `female_user` on the `daily_data` table. All the data in the column will be lost.
  - You are about to drop the column `male_user` on the `daily_data` table. All the data in the column will be lost.
  - You are about to drop the column `unknown_user` on the `daily_data` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_raw_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    "in_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "out_timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "zone" TEXT,
    "machine_id" TEXT NOT NULL,
    "store_status" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_raw_data" ("created_at", "deleted_at", "id", "in_timestamp", "machine_id", "out_timestamp", "store_status", "updated_at", "user_id", "zone") SELECT "created_at", "deleted_at", "id", "in_timestamp", "machine_id", "out_timestamp", "store_status", "updated_at", "user_id", "zone" FROM "raw_data";
DROP TABLE "raw_data";
ALTER TABLE "new_raw_data" RENAME TO "raw_data";
CREATE TABLE "new_daily_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number_of_user" INTEGER NOT NULL DEFAULT 0,
    "number_of_people" INTEGER NOT NULL DEFAULT 0,
    "machine_id" TEXT NOT NULL,
    "store_status" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_daily_data" ("created_at", "deleted_at", "id", "machine_id", "number_of_people", "number_of_user", "timestamp", "updated_at") SELECT "created_at", "deleted_at", "id", "machine_id", "number_of_people", "number_of_user", "timestamp", "updated_at" FROM "daily_data";
DROP TABLE "daily_data";
ALTER TABLE "new_daily_data" RENAME TO "daily_data";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
