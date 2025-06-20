/*
  Warnings:

  - You are about to drop the column `capacidad` on the `mesas` table. All the data in the column will be lost.
  - You are about to drop the column `idCategoria` on the `platos` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `platos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mesas" (
    "idMesa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "disponible" BOOLEAN NOT NULL,
    "idUser" TEXT,
    CONSTRAINT "mesas_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_mesas" ("disponible", "idMesa", "idUser") SELECT "disponible", "idMesa", "idUser" FROM "mesas";
DROP TABLE "mesas";
ALTER TABLE "new_mesas" RENAME TO "mesas";
CREATE TABLE "new_platos" (
    "idPlato" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL
);
INSERT INTO "new_platos" ("descripcion", "idPlato", "nombre", "precio") SELECT "descripcion", "idPlato", "nombre", "precio" FROM "platos";
DROP TABLE "platos";
ALTER TABLE "new_platos" RENAME TO "platos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
