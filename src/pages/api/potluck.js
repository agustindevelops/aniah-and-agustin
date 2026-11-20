import prisma from "@/prisma";
import { CATEGORIES } from "@/components/Potluck/constants";

const CATEGORY_VALUES = new Set(CATEGORIES.map(({ value }) => value));

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function readDish(body) {
  return {
    id: Number(body?.id),
    name: cleanText(body?.name),
    item: cleanText(body?.item),
    category: cleanText(body?.category),
  };
}

function dishIsValid({ name, item, category }) {
  return Boolean(name && item && CATEGORY_VALUES.has(category));
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const potluckItems = await prisma.potluckItem.findMany({
        orderBy: {
          id: "desc",
        },
      });
      res.status(200).json(potluckItems);
    } else if (req.method === "POST") {
      const dish = readDish(req.body);
      if (!dishIsValid(dish)) {
        res.status(400).json({ error: "Name, dish, and category are required." });
        return;
      }
      const newPotluckItem = await prisma.potluckItem.create({
        data: { name: dish.name, item: dish.item, category: dish.category },
      });
      res.status(200).json(newPotluckItem);
    } else if (req.method === "PATCH") {
      const dish = readDish(req.body);
      if (!Number.isInteger(dish.id) || !dishIsValid(dish)) {
        res.status(400).json({ error: "Name, dish, and category are required." });
        return;
      }
      const updated = await prisma.potluckItem.update({
        where: { id: dish.id },
        data: { name: dish.name, item: dish.item, category: dish.category },
      });
      res.status(200).json(updated);
    } else if (req.method === "DELETE") {
      const id = Number(req.body?.id);
      if (!Number.isInteger(id)) {
        res.status(400).json({ error: "A dish id is required." });
        return;
      }
      await prisma.potluckItem.delete({ where: { id } });
      res.status(200).json({ id });
    } else {
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "That dish is no longer on the list." });
      return;
    }
    res.status(500).json({ error: error.message });
  }
}
