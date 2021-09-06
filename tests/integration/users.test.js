import request from 'supertest'; //nos permite realizar peticiones al servidor 
import AcademloDb from '../../services/db.services'; // se importa la clase academloDb para poder usar los metdos del servicio
import app from '../../app';
import faker from 'faker'; //dependencia para crear datos falsos
import { expect, it } from '@jest/globals';

describe('obtener usuarios', () => {
    //Antes de la prueba, se crea un usuario con datos fake
    let newUser = {};
    let id = 0;
    //usasndo el hook beforeAll
    beforeAll( async() => {
        newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email()
        }
        //Insertar usuario en la base de datos 
        const userCreated = await AcademloDb.create(newUser);

        //después de crear, se guarda el id recien creado 
        id = userCreated.id;
    }); //Escribir el nombre del hook y pasar como argumento una función

    afterAll(async() => {
        await AcademloDb.delete(id);
    });

    

    it('debería obtener un arreglo al hacer una petición al recurso de usuarios', async() => {
        const response = await request(app).get('/api/v1/users'); //se proporciona la ruta a la cual se hace la petición 
        //se revisa resposne 
        console.log(response.status);
        //hay que comprobar que el status sea 200
        //obtener los datos que se regresan al hacer la petición 
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array)); // espera recibir un arreglo
    });

    it('debería obtener los datos del usuario que acabo de insertar en la db haciendo una solicitud a /users/:id', async() => {
        //Realizar la solicitud de /users/:id -> con el id del usuario creado 
        const response = await request(app).get(`/api/v1/users/${id}`);
        //Comprobar que los datos que regresa la solicitud son los mismos que los del usuario creado. 
        expect(response.body).toMatchObject(newUser);
        
    });

    
    
    
    

    //Al finalizazr la prueba, borrar usuario agregado antes de la prueba 

    //Hooks para las pruebas 
    //Antes de cada prueba -> beforeEach
    //Antes de todas las prueba  -> BeforeALl
    //Después de cada las prueba  -> AfterEach
    //Después de Todas las pruebas -> AfterAll
});