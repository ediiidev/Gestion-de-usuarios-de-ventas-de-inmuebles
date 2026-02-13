import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

// Todas estas rutas pasan por el middleware 'protect'
router.get("/", protect, getUsers);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
