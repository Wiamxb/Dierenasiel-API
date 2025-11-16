import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET: FAQ met limit & offset
export const getAlleFaq = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const items = await prisma.faq.findMany({
        skip: offset,
        take: limit
    });

    res.json(items);
};

// GET: FAQ op ID
export const getFaqById = async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await prisma.faq.findUnique({ where: { id } });

    if (!item) {
        return res.status(404).json({ message: "FAQ niet gevonden" });
    }

    res.json(item);
};

// POST: FAQ toevoegen
export const maakFaq = async (req, res) => {
    const { vraag, antwoord } = req.body;

    if (!vraag || !antwoord) {
        return res.status(400).json({ error: "Vraag en antwoord zijn verplicht" });
    }

    const nieuwItem = await prisma.faq.create({
        data: { vraag, antwoord },
    });

    res.status(201).json(nieuwItem);
};

// PUT: FAQ updaten
export const updateFaq = async (req, res) => {
    const id = parseInt(req.params.id);
    const { vraag, antwoord } = req.body;

    try {
        const item = await prisma.faq.update({
            where: { id },
            data: { vraag, antwoord },
        });

        res.json(item);
    } catch {
        res.status(404).json({ error: "FAQ niet gevonden" });
    }
};

// DELETE: FAQ verwijderen
export const verwijderFaq = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.faq.delete({ where: { id } });
        res.json({ message: "FAQ verwijderd" });
    } catch {
        res.status(404).json({ error: "FAQ niet gevonden" });
    }
};

// SEARCH: Zoek FAQ op vraag
export const zoekFaq = async (req, res) => {
    const vraag = req.query.vraag;

    if (!vraag) {
        return res.status(400).json({ message: "Gelieve ?vraag= mee te geven" });
    }

    const items = await prisma.faq.findMany({
        where: {
            vraag: {
                contains: vraag,
            }
        }
    });

    res.json(items);
};