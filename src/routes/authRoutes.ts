import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            // Aquí podrías agregar lógica adicional para verificar la contraseña, si la estás manejando.
            if (user.password === password) {  
                res.json({ message: 'Ingreso exitoso', user });
            } else {
                res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'No te has registrado' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

export default router;
