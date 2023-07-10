-- CreateTable
CREATE TABLE "daily_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number_of_user" INTEGER NOT NULL DEFAULT 0,
    "number_of_people" INTEGER NOT NULL DEFAULT 0,
    "machine_id" TEXT NOT NULL,
    "male_user" INTEGER NOT NULL DEFAULT 0,
    "female_user" INTEGER NOT NULL DEFAULT 0,
    "unknown_user" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "raw_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    "in_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "out_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "zone" TEXT NOT NULL,
    "machine_id" TEXT NOT NULL,
    "gender" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "time_used" INTEGER NOT NULL DEFAULT 0
);
