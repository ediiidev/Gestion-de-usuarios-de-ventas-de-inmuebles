# Bienvenido al proyecto

## Información del proyecto

**URL**:https://github.com/ediiidev/Gestion-de-usuarios-de-ventas-de-inmuebles

## Cuales son las tecnologias del proyecto?

Estas son las tecnologias:

- Vite
- TypeScript
- React
- Tailwind CSS
- NodeJS
- Express
- PostgreSQL
- Sequelize
- Axios


**Prerrequisitos**
Estos son los prerrequisitos:

- Node.js: v18 o superior
- PostgreSQL: IMPORTANTE tener creada la base de datos real_estate_management en pgAdmin antes de correr el backend

**Para Tener el monorepo y activar el proyecto**

```sh
# Paso 1: Clonar el repositorio usando la terminal
git clone https://github.com/ediiidev/Gestion-de-usuarios-de-ventas-de-inmuebles

# Paso 2: Navegar a la carpeta del proyecto
cd Gestion-de-usuarios-de-ventas-de-inmuebles

# Paso 3: Activar el frontend (terminal 1)
cd frontend
npm install
npm run dev

# Paso 4: Activar el backend (terminal 2)
cd backend

IMPORTANTE: crear el archivo .env con los siguientes datos: 
DB_NAME=real_estate_management
DB_USER=postgres
DB_PASS=[contraseña_de_la_BD]
DB_HOST=localhost
JWT_SECRET=[clave_secreta]
PORT=5000

Continua ejecutanto en la terminal
npm install
npx tsx src/index.ts
```
**Muestra del frontend**

**Registro**
<img width="2880" height="1524" alt="image" src="https://github.com/user-attachments/assets/ba3ab6d0-5ebf-4b82-8c1c-63d34d5d2dba" />
**Login**
<img width="2880" height="1524" alt="image" src="https://github.com/user-attachments/assets/d75e882a-6286-4d41-ada4-944669e9b111" />
**Dashboard**
<img width="2880" height="1524" alt="image" src="https://github.com/user-attachments/assets/dd34ad07-46fa-497b-90b4-4182a08f4d40" />
