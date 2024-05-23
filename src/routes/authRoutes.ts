// routes/authRoutes.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Registrar usuario
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
// Asegúrate de que el nombre de usuario no esté vacío
if (!email || !username || !password) {
  return res.status(400).json({ error: 'Email, username, and password are required' });
}
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: 'Username, email and password should be unique' });
  }
});

// Autenticar usuario y generar token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;