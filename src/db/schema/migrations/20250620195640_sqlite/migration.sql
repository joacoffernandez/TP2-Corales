-- CreateTable
CREATE TABLE "authorized_users" (
    "idAuthorizedUser" TEXT NOT NULL PRIMARY KEY,
    "idUser" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    CONSTRAINT "authorized_users_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categoriasPlatos" (
    "idCategoria" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "direcciones" (
    "idDireccion" TEXT NOT NULL PRIMARY KEY,
    "calle" TEXT NOT NULL,
    "altura" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "codigo_postal" INTEGER NOT NULL,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "direcciones_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "estadosPedidos" (
    "idEstadoPedido" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mesas" (
    "idMesa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "disponible" BOOLEAN NOT NULL,
    "idUser" TEXT,
    "capacidad" INTEGER NOT NULL,
    CONSTRAINT "mesas_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedidos_cab" (
    "idPedido" TEXT NOT NULL PRIMARY KEY,
    "idUser" TEXT NOT NULL,
    "idEstado" INTEGER NOT NULL,
    "monto" REAL,
    "descuento" INTEGER NOT NULL,
    "idDireccion" TEXT NOT NULL,
    CONSTRAINT "pedidos_cab_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_cab_idEstado_fkey" FOREIGN KEY ("idEstado") REFERENCES "estadosPedidos" ("idEstadoPedido") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_cab_idDireccion_fkey" FOREIGN KEY ("idDireccion") REFERENCES "direcciones" ("idDireccion") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedidos_detalle" (
    "idPedidoDet" TEXT NOT NULL PRIMARY KEY,
    "idPedidoCab" TEXT NOT NULL,
    "idPlato" TEXT NOT NULL,
    CONSTRAINT "pedidos_detalle_idPlato_fkey" FOREIGN KEY ("idPlato") REFERENCES "platos" ("idPlato") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_detalle_idPedidoCab_fkey" FOREIGN KEY ("idPedidoCab") REFERENCES "pedidos_cab" ("idPedido") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "platos" (
    "idPlato" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "idCategoria" TEXT NOT NULL,
    CONSTRAINT "platos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categoriasPlatos" ("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "idUser" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "authorized_users_idUser_key" ON "authorized_users"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
