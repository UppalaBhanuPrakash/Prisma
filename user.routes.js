import express from "express";
import prisma from "./prismaClient.js";

const router = express.Router();

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    include: { orders: true },
  });
  res.json(users);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { UserID: Number(req.params.id) },
    include: { orders: true },
  });
  res.json(user);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await prisma.user.update({
    where: { UserID: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.user.delete({
    where: { UserID: Number(req.params.id) },
  });
  res.json({ message: "User deleted" });
});

export default router;
