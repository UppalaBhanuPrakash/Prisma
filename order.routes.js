import express from "express";
import prisma from "./prismaClient.js";

const router = express.Router();

// router.get("/",async(req,res)=>{
//   const product=await prisma.order.count();
//   res.json(product);
// })

// router.get("/",async(req,res)=>{
//   const product=await prisma.product.aggregate({
//     _sum:{
//     Price:true
//   }})
//   res.json(product)
// })

// router.get("/",async(req,res)=>{
//   const product=await prisma.product.groupBy({
//     by:['CategoryID'],
//     _count:{ProductID:true}
//   })
//   res.json(product)
// })

router.get("/",async(req,res)=>{
  const result=await prisma.product.groupBy({
    by:["CategoryID"],
    _sum:{
      Price:true
    },
    having:{
      Price:{
        _sum:{gt:1000}
      }
    }
  })
  res.json(result)
})
// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const order = await prisma.order.create({ data: req.body });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: true, payments: true, user: true },
  });
  res.json(orders);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { OrderID: Number(req.params.id) },
    include: {
      items: true,
      payments: true,
      user: true,
    },
  });
  res.json(order);
});

// UPDATE ORDER
router.put("/:id", async (req, res) => {
  const updated = await prisma.order.update({
    where: { OrderID: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
});

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  await prisma.order.delete({
    where: { OrderID: Number(req.params.id) },
  });
  res.json({ message: "Order deleted" });
});

export default router;
