import express from "express";
import {
    getAlleDieren,
    getDierById,
    maakDier,
    updateDier,
    verwijderDier,
    zoekDieren
} from "../controllers/dierController.js";

const router = express.Router();

router.get("/", getAlleDieren);
router.get("/zoeken", zoekDieren);
router.get("/:id", getDierById);
router.post("/", maakDier);
router.put("/:id", updateDier);
router.delete("/:id", verwijderDier);

export default router;
