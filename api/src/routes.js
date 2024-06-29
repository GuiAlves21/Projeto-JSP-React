import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config/auth.config.js';

import { GenerosController } from './controllers/GeneroController.js';


const routes = express.Router();

//Genero Routes
routes.post("/generos/new", GenerosController.create);
routes.get('/generos/list', GenerosController.list);
routes.delete('/generos/delete', GenerosController.delete);
routes.put('/generos/update', GenerosController.update);




export const allRoutes = routes;