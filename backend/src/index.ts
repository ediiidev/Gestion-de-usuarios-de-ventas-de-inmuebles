import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import houseRoutes from "./routes/houseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/houses", houseRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

// Sincronizar Base de Datos y Arrancar
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Conectado a la DB");
    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  })
  .catch((err) => console.log("Error de DB:", err));
