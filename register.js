import bcrypt from "bcrypt";

const hash = await bcrypt.hash(password, 10);

await prisma.authUser.create({
  data: {
    username,
    email,
    passwordHash: hash
  }
});
