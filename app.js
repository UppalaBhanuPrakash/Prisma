import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import orderRoutes from "./order.routes.js";
import orderItemRoutes from "./orderItem.routes.js";
import paymentRoutes from "./payment.routes.js";
import express from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemRoutes);
app.use("/payments", paymentRoutes);
app.post("/login",(req,res)=>{
    const username=req.body.username;
})
app.listen(3000, () => console.log("Server running on port 3000"));