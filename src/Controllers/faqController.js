import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAlleFaq = async (req, res) => {
    const items = await prisma.faq.findMany();
    res.json(items);
};

export const getFaqById = async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await prisma.faq.findUnique({ where: { id } });

    if (!item) return res.status(404).json({ message: "FAQ niet gevonden" });
    res.json(item);
};

export const maakFaq = async (req, res) => {
    const { vraag, antwoord } = req.body;

    const nieuwItem = await prisma.faq.create({
        data: { vraag, antwoord },
    });

    res.status(201).json(nieuwItem);
};

export const updateFaq = async (req, res) => {
    const id = parseInt(req.params.id);
    const { vraag, antwoord } = req.body;

    const item = await prisma.faq.update({
        where: { id },
        data: { vraag, antwoord },
    });

    res.json(item);
};

export const verwijderFaq = async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.faq.delete({ where: { id } });

    res.json({ message: "FAQ verwijderd" });
};
