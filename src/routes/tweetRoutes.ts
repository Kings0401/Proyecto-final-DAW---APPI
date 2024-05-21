import { Router } from 'express';

const router = Router ();

//Ruta de Tweets con caracteristicas de CRUD
    //Crear tweet
    router.post('/', (req, res) => {
        res.status(501).json({error: "Not Implemented"});
    })
    
        //Lista de tweets
    router.get('/', (req, res) => {
        res.status(501).json({error: "Not Implemented"});
    })
    
        //Obtener un tweet
    router.get('/:id', (req, res) => {
        const {id} = req.params;
        res.status(501).json({error: `Not Implemented: ${id}`});
    })
    
        //Actualizar tweet
    router.put('/:id', (req, res) => {
        const {id} = req.params;
        res.status(501).json({error: `Not Implemented: ${id}`});
    })
    
        //Eliminiar tweet
    router.delete('/:id', (req, res) => {
        const {id} = req.params;
        res.status(501).json({error: `Not Implemented: ${id}`});
    })

export default router;
