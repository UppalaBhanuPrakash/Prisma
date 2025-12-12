import express from "express";
import prisma from "./prismaClient.js";
import { equal } from "assert";

const router = express.Router();
// router.get("/", async (req,res)=>{
//   const product=await prisma.product.findMany({
//     where:{
//       Price:{lt:"100"}
//     }
//   })
//   res.json(product)
// })

// router.get("/",async(req,res)=>{
//   const product=await prisma.product.findMany({
//     where:{Price:{gt:100},StockQuantity:{gte:10}}
//   })
//   res.json(product);
// })

// router.get("/",async(req,res)=>{
//   const product=await prisma.product.findMany({
//     where:{
//       OR:[
//         {Price:{lt:100}},
//         {StockQuantity:{lt:5}}
//       ]
//     }

//   })
//       res.json(product);
// })

// router.get("/",async(req,res)=>{
//   const product=await prisma.product.findMany({
//     where:{
//       Name:{
//         contains:"phone",
//         mode:'insensitive'
//       }
//     },
//     select:{
//       Name:true,
//       ProductID:true
//     }
//   })
//   res.send(product);
// })

// router.get("/",async(req,res)=>{
//    const product=await prisma.product.findMany({
//     include:{category:true}
//    })
//    res.json(product)
// })
// router.get("/",async(req,res)=>{
//    const product=await prisma.product.findMany({
//     include:{category:{
//       select:{
//         CategoryName:true
//       }
//     }}
//    })
//    res.json(product);
// })

// router.get("/",async(req,res)=>{
//   const prod=await prisma.product.findMany({
//     where:{
//       category:{
//         CategoryName:"Electronics"
//       }
//     },
//     include:{category:true}
//   })
//   res.json(prod)
// })

// router.get("/",async(req,res)=>{
//   const page=parseInt(req.query.page)||1;
//   const limit=parseInt(req.query.limit)||10;

//   const skip=(page-1)*limit;

//   const products=await prisma.product.findMany({
//     skip:skip,
//     take:limit,
//     orderBy:{ProductID:"asc"}
//   });

//   res.json({
//     page,
//     limit,
//     results:products.length,
//     data:products
//   })
// })

// router.get("/",async(req,res)=>{
//   const page=parseInt(req.query.page)||1;
//   const limit=parseInt(req.query.limit)||10;
//   const skip=(page-1)*limit;

//   const {name,minPrice,maxPrice,category}=req.query;

//   const where={};

//   if(name){
//     where.Name={
//       contains:name,
//       mode:"insensitive"
//     }
//   }
//   if(minPrice||maxPrice){
//     where.Price={};
//     if(minPrice) where.Price.gte=parseFloat(minPrice);
//     if (maxPrice) where.Price.lte = parseFloat(maxPrice);
//   }
//   if(category){
//    where.category = {
//   is: {
//     CategoryName: {
//       equals: category,
//       mode: "insensitive",
//     }
//   }
// };

//   }
//   const [total,products]=await Promise.all([
//     prisma.product.count({where}),
//     prisma.product.findMany({
//       where,
//       skip,
//     take:limit,
//     orderBy:{ProductID:"asc"},
//     include:{category:true}
//     })
//   ]);
//   res.json({
//     page,
//     limit,
//     total,
//     totalPages:Math.ceil(total/limit),
//     data:products
//   })
// })

router.get("/",async(req,res)=>{
  const page=parseInt(req.query.page)||1;
  const limit=parseInt(req.query.limit)||10;
  const skip=(page-1)*10;

  const {name,minPrice,maxPrice,category}=req.query;

  const where={}

  if(name){
    where.Name={
      contains:name,
      mode:"insensitives"
    }
  }

  if(minPrice||maxPrice){
    where.Price={}
    if(maxPrice)where.Price=parseFloat(minPrice);
    if(minPrice)where.Price=parseFloat(maxPrice);
  }

  if(category){
    where.category={
      CategoryName:{
        equals:category,
        mode:"insensitive",
      }
    }
  }
  const [total,products]=await Promise.all([
    prisma.product.count({where}),
    prisma.product.findMany({
      where,
      skip,
      take:limit,
      orderBy:{ProductID:"asc"},
      include:{category:true}
    })
  ]);
  res.json({
    page,
    limit,
    total,
    totalPages:Math.ceil(total/limit),
    data:products
  })
})
// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  res.json(products);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { ProductID: Number(req.params.id) },
    include: {
      category: true,
      orderItems: true,
    },
  });
  res.json(product);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await prisma.product.update({
    where: { ProductID: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await prisma.product.delete({
    where: { ProductID: Number(req.params.id) },
  });
  res.json({ message: "Product deleted" });
});

export default router;
