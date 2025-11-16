import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes importeren
import dierenRoutes from "./routes/dierenRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes koppelen
app.use("/dieren", dierenRoutes);
app.use("/faq", faqRoutes);

// Documentatiepagina op root
app.get("/", (req, res) => {
    res.send(`
        <h1>Dierenasiel API – Documentatie</h1>
        <p>Welkom bij de API. Hieronder vind je alle beschikbare endpoints:</p>

        <h2>Dieren</h2>
        <ul>
            <li>GET /dieren → Alle dieren ophalen</li>
            <li>GET /dieren?limit=10&offset=0 → Dieren met paginatie</li>
            <li>GET /dieren/zoeken?naam=Max → Dieren zoeken op naam</li>
            <li>GET /dieren/:id → Dier op ID ophalen</li>
            <li>POST /dieren → Nieuw dier toevoegen</li>
            <li>PUT /dieren/:id → Bestaand dier updaten</li>
            <li>DELETE /dieren/:id → Dier verwijderen</li>
        </ul>

        <h2>FAQ</h2>
        <ul>
            <li>GET /faq → Alle FAQ items ophalen</li>
            <li>GET /faq?limit=10&offset=0 → FAQ met paginatie</li>
            <li>GET /faq/zoeken?vraag=hond → FAQ zoeken op vraag</li>
            <li>GET /faq/:id → FAQ op ID ophalen</li>
            <li>POST /faq → Nieuwe FAQ toevoegen</li>
            <li>PUT /faq/:id → FAQ updaten</li>
            <li>DELETE /faq/:id → FAQ verwijderen</li>
        </ul>

        <p>Deze API is gemaakt in Node.js, Express en Prisma voor het project Dierenasiel.</p>
    `);
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
