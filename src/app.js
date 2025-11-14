import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dierenRoutes from "./routes/dierenRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/dieren", dierenRoutes);
app.use("/faq", faqRoutes);


// eenvoudige testroute
app.get("/", (req, res) => {
    res.send("<h1>Welkom bij de Dierenasiel API</h1>");
});

// server starten
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
