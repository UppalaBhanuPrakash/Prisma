import express from "express";
import prisma from "./prismaClient.js";

const app = express();
app.use(express.json());

// Create staff
// app.post("/staff", async (req, res) => {
//   const { name, age, salary, email } = req.body;

//   const employee = await prisma.staff.create({
//     data: { name, age: Number(age), salary: Number(salary), email }
//   });

//   res.json(employee);
// });
app.post("/staff", async (req, res) => {
  try {
    const { name, age, salary, email } = req.body;

    if (!name || !age || salary === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, age, salary",
      });
    }

    const employee = await prisma.staff.create({
      data: { name, age: Number(age), salary: Number(salary), email }
    });

    res.json(employee);
  } catch (err) {
    // Prisma error handling
    res.status(422).json({
      success: false,
      error: err.message,
    });
  }
});

// Get all staff
app.get("/staff", async (req, res) => {
  const staff = await prisma.staff.findMany();
  res.json(staff);
});

// Get staff by ID
app.get("/staff/:id", async (req, res) => {
  const staff = await prisma.staff.findUnique({
    where: { id: Number(req.params.id) }
  });
  res.json(staff);
});

// Update staff
app.put("/staff/:id", async (req, res) => {
  const { name, age, salary, email } = req.body;

  const staff = await prisma.staff.update({
    where: { id: Number(req.params.id) },
    data: { name, age, salary, email }
  });

  res.json(staff);
});

// Delete staff
app.delete("/staff/:id", async (req, res) => {
  await prisma.staff.delete({
    where: { id: Number(req.params.id) }
  });
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
