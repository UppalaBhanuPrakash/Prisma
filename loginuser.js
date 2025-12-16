const user = await prisma.authUser.findUnique({
  where: { email }
});

if (!user || !user.isActive) {
  return res.status(401).json({ message: "Invalid user" });
}

const isValid = await bcrypt.compare(password, user.passwordHash);

if (!isValid) {
  return res.status(401).json({ message: "Invalid credentials" });
}
