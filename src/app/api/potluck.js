import prisma from "@/prisma";

export default async function handler(req, res) {
  try {
    // Handle GET request
    if (req.method === "GET") {
      // Fetch data from your database instead of the Gist
      const potluckItems = await prisma.potluckItem.findMany();
      res.status(200).json(potluckItems);
    }
    // Handle POST request
    else if (req.method === "POST") {
      // Save the new potluck item to your database
      const { name, item, category } = req.body;
      const newPotluckItem = await prisma.potluckItem.create({
        data: { name, item, category },
      });
      res.status(200).json(newPotluckItem);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // If there's an error in the database query, you'll handle it here
    res.status(500).json({ error: error.message });
  }
}
