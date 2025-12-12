import express from "express";
import prisma from "./prismaClient.js";

const router = express.Router();

// CREATE ITEM
router.post("/", async (req, res) => {
  try {
    const item = await prisma.orderItem.create({ data: req.body });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL ITEMS
router.get("/", async (req, res) => {
  const items = await prisma.orderItem.findMany({
    include: { order: true, product: true },
  });
  res.json(items);
});

// GET ITEM BY ID
router.get("/:id", async (req, res) => {
  const item = await prisma.orderItem.findUnique({
    where: { OrderItemID: Number(req.params.id) },
    include: { order: true, product: true },
  });
  res.json(item);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await prisma.orderItem.update({
    where: { OrderItemID: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.orderItem.delete({
    where: { OrderItemID: Number(req.params.id) },
  });
  res.json({ message: "Order item deleted" });
});

export default router;
