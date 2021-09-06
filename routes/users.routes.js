//usamos el middleware enrutador 
import { Router } from 'express';
import {getUserById, getUsers} from '../controllers/user.controllers.js';

//creamos una instacia de Router llamada routes
const routes = Router();

//uso de verbos GET, PORS, PUT, DELETE

routes.get('/users', getUsers);
routes.get('/users/:id', getUserById);

routes.post('/users');

//debemos indicar una sintaxis especial para que espere un parametro en la url 
//con la clave id podemos extraer el valor
routes.put('/users/:id');

routes.delete('/users/:id');


export default routes;
