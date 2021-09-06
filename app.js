import express from "express";
import userRoutes from './routes/users.routes.js'

const app = express();

//se usa un middleware para usar la rutas en el archivo app
app.use('/api/v1', userRoutes);

export default app;