import type { Request, Response } from "express";
import { House } from "../models/House.js";
import { User } from "../models/User.js";

export const createHouse = async (req: any, res: Response) => {
  try {
    const { title, description, address, price, status } = req.body;
    console.log(req.user);
    // Validación de campos obligatorios
    if (!address || !price) {
      return res
        .status(400)
        .json({ message: "Address y Price son obligatorios" });
    }

    const house = await House.create({
      title,
      description,
      address,
      price,
      status,
      sellerId: req.user.id, // Extraído del JWT por el middleware 'protect'
    });

    res.status(201).json(house);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getHouses = async (req: any, res: Response) => {
  try {
    //console.log("Contenido de req.user:", req.user);
    const userId = req.user?.id; // ID de usuario extraído del Token
    if (!userId) {
      return res
        .status(401)
        .json({ error: "No se encontró el ID del usuario en el token" });
    }

    const houses = await House.findAll({
      where: { sellerId: userId },
      include: [
        { model: User, as: "seller", attributes: ["id", "name", "email"] },
      ],
    });
    res.json(houses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getHouseById = async (req: Request, res: Response) => {
  const house = await House.findByPk(req.params.id as string, {
    include: [{ model: User, as: "seller", attributes: ["name"] }],
  });
  if (!house)
    return res.status(404).json({ message: "Inmueble no encontrado" });
  res.json(house);
};

export const updateHouse = async (req: Request, res: Response) => {
  try {
    const house = await House.findByPk(req.params.id as string);
    if (!house) return res.status(404).json({ message: "No encontrado" });

    await house.update(req.body);
    res.json(house);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHouse = async (req: Request, res: Response) => {
  const house = await House.findByPk(req.params.id as string);
  if (!house) return res.status(404).json({ message: "No encontrado" });

  await house.destroy();
  res.json({ message: "Venta eliminada correctamente" });
};
