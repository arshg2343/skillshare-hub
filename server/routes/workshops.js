// Workshop routes
import express from "express"
import {
  getAllWorkshops,
  getWorkshop,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  joinWorkshop,
  leaveWorkshop,
} from "../controllers/workshopController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllWorkshops)
router.get("/:id", getWorkshop)
router.post("/", protect, createWorkshop)
router.put("/:id", protect, updateWorkshop)
router.delete("/:id", protect, deleteWorkshop)
router.post("/:id/join", protect, joinWorkshop)
router.post("/:id/leave", protect, leaveWorkshop)

export default router
