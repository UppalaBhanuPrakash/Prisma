import express from "express";
import prisma from "./prismaClient.js";


const router = express.Router();

// CREATE PAYMENT
router.post("/", async (req, res) => {
  try {
    const payment = await prisma.payment.create({ data: req.body });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL PAYMENTS
router.get("/", async (req, res) => {
  const payments = await prisma.payment.findMany({
    include: { order: true },
  });
  res.json(payments);
});

// GET PAYMENT BY ID
router.get("/:id", async (req, res) => {
  const payment = await prisma.payment.findUnique({
    where: { PaymentID: Number(req.params.id) },
    include: { order: true },
  });
  res.json(payment);
});

// UPDATE PAYMENT
router.put("/:id", async (req, res) => {
  const updated = await prisma.payment.update({
    where: { PaymentID: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
});

// DELETE PAYMENT
router.delete("/:id", async (req, res) => {
  await prisma.payment.delete({
    where: { PaymentID: Number(req.params.id) },
  });
  res.json({ message: "Payment deleted" });
});

export default router;
