//los controladores se encargan de recibir la petición y de dar respuesta al cliente
//import el servicio para poder acceder al metodo 

import { response } from 'express';
import db from '../services/db.services.js';

export const getUsers = async(request, response, next) => {
 //obtener la lista de usuarios
 try{
    const users = await db.findAll();
    //responder al cliente con un json
    response.json(users);
 }catch(error){
    //en case de error
    next(error);
 }
}

export const getUserById = async(request, response, next) => {
    //obtener la lista de usuarios
    try{
        const {id} = request.params;
       const users = await db.findById(Number(id));
       //responder al cliente con un json
       response.json(users);
    }catch(error){
       //en case de error
       next(error);
    }
}