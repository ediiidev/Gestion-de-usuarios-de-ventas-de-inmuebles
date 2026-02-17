import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validación de campos obligatorios
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Usuario creado", userId: user.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar al usuario
    const user = await User.findOne({ where: { email } });
    //console.log("Password desde la DB:", user?.password);
    // 2. Validar si existe antes de comparar
    if (!user) {
      //console.log("Usuario no encontrado");
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    //console.log("Datos del usuario recuperado:", user.toJSON());
    // 3. Comparar de forma segura
    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await bcrypt.compare(password, user.get("password"));
    //console.log("Password real:", user.get("password"));

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 4. Generar Token (Asegúrate de tener JWT_SECRET en tu .env)
    const token = jwt.sign(
      { id: user.get("id") },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
    );

    return res.json({
      token,
      user: {
        id: user.get("id"),
        name: user.get("name"),
        email: user.get("email"),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
