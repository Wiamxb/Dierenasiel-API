import express from "express";
import {
    getAlleFaq,
    getFaqById,
    maakFaq,
    updateFaq,
    verwijderFaq,
    zoekFaq
} from "../controllers/faqController.js";


const router = express.Router();

router.get("/", getAlleFaq);
router.get("/zoeken", zoekFaq);
router.get("/:id", getFaqById);
router.post("/", maakFaq);
router.put("/:id", updateFaq);
router.delete("/:id", verwijderFaq);

export default router;
