/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `platos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "platos_nombre_key" ON "platos"("nombre");
