import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config/auth.config.js';

import { GenerosController } from './controllers/GeneroController.js';


const routes = express.Router();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
        }

        jwt.verify(token, config.secret, function(err){ 
            if (err){
                return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
            }
            next(); 
        });
        
    } catch(ex) {
        console.log(ex)
        res.sendStatus(401);
    }
}


//Genero Routes
routes.post("/generos/new", verifyToken, GenerosController.create);


export const allRoutes = routes;