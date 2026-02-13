import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createHouse,
  getHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
} from "../controllers/houseController.js";

const router = Router();

router.post("/", protect, createHouse);
router.get("/", protect, getHouses);
router.get("/:id", protect, getHouseById);
router.put("/:id", protect, updateHouse);
router.delete("/:id", protect, deleteHouse);

export default router;
