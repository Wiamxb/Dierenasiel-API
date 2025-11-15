import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAlleDieren = async (req, res) => {
    const dieren = await prisma.dier.findMany();
    res.json(dieren);
};

export const getDierById = async (req, res) => {
    const id = parseInt(req.params.id);
    const dier = await prisma.dier.findUnique({ where: { id } });

    if (!dier) return res.status(404).json({ message: "Dier niet gevonden" });
    res.json(dier);
};

// 🔵 VALIDATIE TOEGEVOEGD
export const maakDier = async (req, res) => {
    const { naam, soort, leeftijd, beschrijving } = req.body;

    // Validatie
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

// 🔵 FOUTAFHANDELING TOEGEVOEGD
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

// 🔵 FOUTAFHANDELING TOEGEVOEGD
export const verwijderDier = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.dier.delete({ where: { id } });
        res.json({ message: "Dier verwijderd" });
    } catch {
        res.status(404).json({ error: "Dier niet gevonden" });
    }
};
