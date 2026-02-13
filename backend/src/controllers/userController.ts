import type { Request, Response } from "express";
import { User } from "../models/User.js";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, isActive } = req.body;
  const user = await User.findByPk(req.params.id as string);

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  await user.update({ name, email, isActive });
  res.json({ message: "Usuario actualizado" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id as string);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  await user.destroy();
  res.json({ message: "Usuario eliminado" });
};
