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

    // 2. IMPORTANTE: Validar si existe antes de comparar
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // 3. Ahora sí, comparar de forma segura
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 4. Generar Token (Asegúrate de tener JWT_SECRET en tu .env)
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
