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
    router.get('/listUser', async (req, res) => {
        const allUser = await prisma.user.findMany();
        res.json(allUser);
    });
    
        //Obtener un usuario
    router.get('/getUser/:id', async(req, res) => {
        const {id} = req.params;
        const user = await prisma.user.findUnique({ where: {id: Number(id)}, include: {tweets: true}});
        
        res.json(user);
    });

    //Eliminar usuario
    router.delete('/deleteUser/:id', async (req, res) => {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: Number(id) } });
        res.sendStatus(200);
      });

export default router;
