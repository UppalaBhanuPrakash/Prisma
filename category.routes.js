import express from "express";
import prisma from "./prismaClient.js";
const router = express.Router();

// CREATE CATEGORY
router.post("/", async (req, res) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany({
    include: { products: true },
  });
  res.json(categories);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const category = await prisma.category.findUnique({
    where: { CategoryID: Number(req.params.id) },
    include: { products: true },
  });
  res.json(category);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await prisma.category.update({
    where: { CategoryID: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.category.delete({
    where: { CategoryID: Number(req.params.id) },
  });
  res.json({ message: "Category deleted" });
});

export default router;
