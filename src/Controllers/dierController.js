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

export const maakDier = async (req, res) => {
    const { naam, soort, leeftijd, beschrijving } = req.body;

    const nieuwDier = await prisma.dier.create({
        data: { naam, soort, leeftijd, beschrijving },
    });

    res.status(201).json(nieuwDier);
};

export const updateDier = async (req, res) => {
    const id = parseInt(req.params.id);
    const { naam, soort, leeftijd, beschrijving } = req.body;

    const dier = await prisma.dier.update({
        where: { id },
        data: { naam, soort, leeftijd, beschrijving },
    });

    res.json(dier);
};

export const verwijderDier = async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.dier.delete({ where: { id } });

    res.json({ message: "Dier verwijderd" });
};
