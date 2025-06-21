#  TP2 – Desarrollo de Sistemas

##  Integrantes

- **Joaquin Fernández**  
- **Santino Pirraglia Janicki**

---

##  Arquitectura del Proyecto

El sistema sigue una **arquitectura en capas**, organizada de la siguiente forma:

- **Routers**: gestionan las rutas HTTP y definen los endpoints de la API.
- **Services**: contienen la lógica de negocio, separados de la base de datos.
- **Repositories**: encapsulan el acceso a datos mediante Prisma, aislando los detalles de la persistencia.
- **Prisma ORM**: se utiliza para interactuar con una base de datos **SQLite**, simplificando las operaciones CRUD.

Además, se implementan dos tipos de usuarios:
- **Clientes**
- **Administradores**

El control de acceso y permisos se maneja mediante **middlewares de autenticación y autorización**, basados en **JWT tokens**.

---

##  Instalación y Compilación

1. Clonar el repositorio  
   ```bash
   git clone <repo_url>
   cd <nombre_del_proyecto>
