/*
  Warnings:

  - You are about to drop the `direcciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estadosPedidos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `idDireccion` on the `pedidos_cab` table. All the data in the column will be lost.
  - Added the required column `direccion` to the `pedidos_cab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "direcciones";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "estadosPedidos";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pedidos_cab" (
    "idPedido" TEXT NOT NULL PRIMARY KEY,
    "idUser" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "monto" REAL,
    "descuento" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    CONSTRAINT "pedidos_cab_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos_cab" ("descuento", "estado", "idPedido", "idUser", "monto") SELECT "descuento", "estado", "idPedido", "idUser", "monto" FROM "pedidos_cab";
DROP TABLE "pedidos_cab";
ALTER TABLE "new_pedidos_cab" RENAME TO "pedidos_cab";
CREATE TABLE "new_users" (
    "idUser" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'USER',
    "direccion" TEXT NOT NULL
);
INSERT INTO "new_users" ("email", "idUser", "password", "rol", "telefono", "username") SELECT "email", "idUser", "password", "rol", "telefono", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
