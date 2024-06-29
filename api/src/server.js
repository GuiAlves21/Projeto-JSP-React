import express from 'express';
import { allRoutes } from './routes.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Permite requisições apenas do front-end
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(allRoutes);

app.listen(3333, () => {
    console.log("[INFO] Server running on port 3333");
    console.log("[INFO] System operation logs:");
});
