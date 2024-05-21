import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router ();
const prisma = new PrismaClient();

//Ruta User con caracteristicas de CRUD
    //Crear usuario
    router.post('/', async(req, res) => {
        const { email, username, password} = req.body;
    
        try {
            const result = await prisma.user.create({
                data: {
                    email,
                    username,
                    password,            
                },
            });
    
            res.json(result);
        } catch (e) {
            res.status(400).json({error: "Username, email and password should be unique"})
        }
    });
    
        //Lista de usuarios
    router.get('/', async (req, res) => {
        const allUser = await prisma.user.findMany();
        res.json(allUser);
    });
    
        //Obtener un usuario
    router.get('/:id', async(req, res) => {
        const {id} = req.params;
        const user = await prisma.user.findUnique({ where: {id: Number(id)}});
        
        res.json(user);
    });

export default router;
