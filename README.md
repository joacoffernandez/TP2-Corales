# TP2-Desarrollo de Sistemas

---

## Integrantes

- Joaquin FERNANDEZ  
- Santino PIRRAGLIA JANICKI 

---

## Diseño
El sistema está diseñado con una arquitectura en capas, separando las rutas (routers), la lógica de negocio (services), la capa de acceso a datos (repositories) y la persistencia mediante Prisma (ORM), que facilita la interacción con la base de datos SQLite.

La capa de repositories se encarga de centralizar las operaciones directas sobre la base de datos, permitiendo que los servicios trabajen con una interfaz limpia y separada de los detalles del ORM o la base de datos.

Se implementan dos tipos de usuarios: clientes y administradores, con diferentes niveles de permisos controlados mediante middlewares de autenticación y autorización.

---

## Cómo compilar
- Instalar las dependencias con "npm install".

- Generar el cliente Prisma usando "npm run db:generate".

- Ejecutar las migraciones para crear la base de datos con "npm run db:migrate".

- Compilar "npm run dev" para correr la API.