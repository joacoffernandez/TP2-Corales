/*
  Warnings:

  - You are about to drop the `authorized_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `idEstado` on the `pedidos_cab` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "authorized_users_idUser_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "authorized_users";
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
    "idDireccion" TEXT NOT NULL,
    CONSTRAINT "pedidos_cab_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_cab_idDireccion_fkey" FOREIGN KEY ("idDireccion") REFERENCES "direcciones" ("idDireccion") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos_cab" ("descuento", "idDireccion", "idPedido", "idUser", "monto") SELECT "descuento", "idDireccion", "idPedido", "idUser", "monto" FROM "pedidos_cab";
DROP TABLE "pedidos_cab";
ALTER TABLE "new_pedidos_cab" RENAME TO "pedidos_cab";
CREATE TABLE "new_users" (
    "idUser" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_users" ("email", "idUser", "password", "telefono", "username") SELECT "email", "idUser", "password", "telefono", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
