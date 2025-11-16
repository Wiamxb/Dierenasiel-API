import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET: alle dieren met limit & offset
export const getAlleDieren = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const dieren = await prisma.dier.findMany({
        skip: offset,
        take: limit
    });

    res.json(dieren);
};

// GET: dier op ID
export const getDierById = async (req, res) => {
    const id = parseInt(req.params.id);
    const dier = await prisma.dier.findUnique({ where: { id } });

    if (!dier) return res.status(404).json({ message: "Dier niet gevonden" });

    res.json(dier);
};

// POST: nieuw dier toevoegen
export const maakDier = async (req, res) => {
    const { naam, soort, leeftijd, beschrijving } = req.body;

    if (!naam || !soort || !leeftijd) {
        return res.status(400).json({ error: "Naam, soort en leeftijd zijn verplicht" });
    }

    if (isNaN(leeftijd)) {
        return res.status(400).json({ error: "Leeftijd moet een nummer zijn" });
    }

    const nieuwDier = await prisma.dier.create({
        data: { naam, soort, leeftijd: Number(leeftijd), beschrijving },
    });

    res.status(201).json(nieuwDier);
};

// PUT: dier updaten
export const updateDier = async (req, res) => {
    const id = parseInt(req.params.id);
    const { naam, soort, leeftijd, beschrijving } = req.body;

    try {
        const dier = await prisma.dier.update({
            where: { id },
            data: { naam, soort, leeftijd, beschrijving },
        });

        res.json(dier);
    } catch {
        res.status(404).json({ error: "Dier niet gevonden" });
    }
};

// DELETE: dier verwijderen
export const verwijderDier = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.dier.delete({ where: { id } });
        res.json({ message: "Dier verwijderd" });
    } catch {
        res.status(404).json({ error: "Dier niet gevonden" });
    }
};

// SEARCH: dieren zoeken op naam
export const zoekDieren = async (req, res) => {
    const naam = req.query.naam;

    if (!naam) {
        return res.status(400).json({ message: "Gelieve ?naam= mee te geven" });
    }

    const dieren = await prisma.dier.findMany({
        where: {
            naam: {
                contains: naam
            }
        }
    });


    res.json(dieren);
};
