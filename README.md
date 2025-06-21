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
   ```

2. Instalar dependencias  
   ```bash
   npm install
   ```

3. Generar el cliente de Prisma  
   ```bash
   npm run db:generate
   ```

4. Ejecutar las migraciones (crea la base de datos)  
   ```bash
   npm run db:migrate
   ```

5. Iniciar el servidor en modo desarrollo  
   ```bash
   npm run dev
   ```

---

##  Uso de la API

###  Autenticación

- **Registrar usuario:**  
  `POST /auth/register`  
  Enviá los datos necesarios para crear un nuevo usuario.

- **Iniciar sesión:**  
  `POST /auth/login`  
  Ingresás las credenciales y recibís un **token JWT**. Este token debe ser enviado en el header `Authorization` en las demás peticiones:
  ```
  Authorization: Bearer <token>
  ```

- **Obtener permisos de administrador:**  
  `POST /auth/admin`  
  Enviando una contraseña especial, se te asignará el rol de administrador si es válida.

>  **Importante:** El token JWT es obligatorio para acceder a rutas protegidas. Sin él, la API denegará el acceso.

---

##  Tecnologías utilizadas

- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite**
- **JWT para autenticación**
- **Postman para testing**

---

##  Estructura del proyecto

```
/src
  /routes        # Definición de rutas HTTP
  /services      # Lógica de negocio
  /repositories  # Acceso a base de datos (Prisma)
  /middleware    # Autenticación y autorización
  /db        # Esquema de base de datos y migraciones
```
