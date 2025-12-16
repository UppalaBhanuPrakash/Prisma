// import express from "express";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// router.post("/login", (req, res) => {
//   const { username } = req.body;

//   if (!username) {
//     return res.status(400).json({ error: "Username required" });
//   }

//   const token = jwt.sign(
//     { username },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   res.json({ token });
// });

// export default router;
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;