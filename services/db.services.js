import fs from "fs/promises";
import path from "path";
import faker from "faker";

class AcademloDb {

    static dbPath = path.resolve("db", "db.json");

    static findAll = async() => {
        try{
            let data = await fs.readFile(this.dbPath, "utf8");
            return JSON.parse(data);
        }catch(error){
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
    }

    static findById = async(id) => {
        //encontrar un usuario en la bd por su id 
        try{
            let data = await fs.readFile(this.dbPath, 'utf8');
            let db = JSON.parse(data);
            return db.find(item => item.id === id);
        } catch(error) {
            throw new Error("Hubo un error al tratar de obtener el registro de la base de datos");
        }
    
    }

    static create = async(obj) => {
        //crear un usuario en al archivo JSON 
        try{
            let data = await this.findAll();
            let nextId = data.length;
            const newObject = obj;
            newObject.id = nextId;
            data.push(newObject);
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            console.log('usuario creado', obj.id)
            return newObject;
        } catch(error){
            throw new Error("Hubo un error al tratar de crear el registro en la base de datos");
        }
        x
    }

    static update = async(obj) => {
        console.log("cambiar", obj)
        const id = obj.id;
        try{
            let data = await this.findAll();
            console.log('lo que  ehay en base', data);
            let index =  data.findIndex(item => {return item.id === id});
            if(index === -1){
                throw new Error('No existe el id en la base de datos');
            }
            let newObject = {id, ...obj};
            data[index] = newObject;
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return newObject;
        }catch(error){
            throw new Error(error);
        }

    }

    static delete = async(id) => {

        try{
            let data = await this.findAll();
            let index = data.findIndex(item => item.id === id);
            if(index === -1){
                return false;
            }
            data.splice(index, 1);
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return true;
        }catch(error){
            throw new Error(error);
            
        }
    }

    static clear = async() => {
        try{
            await fs.writeFile(this.dbPath, JSON.stringify([]));
        }catch(error){
            throw new Error("Hubo un error al tratar de vaciar la DB");
        }
    }

    static populateDB = async(size) => {
        let userArr = [];
        for(let i = 0; i<size; i++){
            let userObj = {
                id: i + 1,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email().toLowerCase()
            };

            userArr.push(userObj);
        }

        try{
            await fs.writeFile(this.dbPath, JSON.stringify(userArr));
            return userArr;
        }catch(error){
            throw new Error("Hubo un error al insertar en la base de datos");
        }
    }

}

export default AcademloDb;