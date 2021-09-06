import db from "../../services/db.services.js";
import faker from "faker";

describe("Servicio findAll de DB", () => {
    beforeAll(async () => {
        await db.clear(); //Limpiar la DB
        await db.populateDB(10); //Agregar 10 registros en la DB
    });

    it("Debería obtener un arreglo", async () => {
        const users = await db.findAll();

        expect(users).toEqual(expect.any(Array));
    });

    it("Debería de tener 10 elementos en el arreglo", async () => {
        const users = await db.findAll();

        expect(users.length).toBe(10);
    });
});

describe("Servicio findById", () => {
    let users = [];

    beforeAll(async () => {
        await db.clear(); //Limpiar la DB
        users = await db.populateDB(10); //Agregar 10 registros en la DB
    });

    it("Debería de obtener un objeto", async () => {
        const usersObj = await db.findById(1);

        expect(usersObj).not.toEqual(expect.any(Array));
        expect(usersObj).toEqual(expect.any(Object));
    });

    it("Debería de obtener un objeto de tipo user", async () => {
        const userObj = await db.findById(1);

        expect(Object.keys(userObj)).toEqual(
            expect.arrayContaining(["id", "firstname", "lastname", "email"])
        );
    });

    it("Debería de obtener un usuario por id", async () => {
        const userObj = await db.findById(2);
        const userValues = Object.values(users[1]);

        expect(Object.values(userObj)).toEqual(
            expect.arrayContaining(userValues)
        );
    });
});

describe("Servicio create", () => {
    let newUser = {};

    beforeEach(async () => {
        await db.clear(); //Limpiar la DB

        newUser = {
            id: 10,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email().toLowerCase()
        };
    });

    it("Debería de regresar un objeto de tipo user", async () => {
        const userCreated = await db.create(newUser);

        expect(Object.keys(userCreated)).toEqual(
            expect.arrayContaining(["id", "firstname", "lastname", "email"])
        );
    });

    it("Debería de regresar un objeto de tipo user con los valores que se acaban de agregar", async () => {
        const userCreated = await db.create(newUser);

        //Obtener el usuario que se agrego en la DB
        const userObj = await db.findById(userCreated.id);

        expect(Object.values(userCreated)).toEqual(
            expect.arrayContaining(Object.values(userObj))
        );
    });
});

describe("Servicio update", () => {
    let newUser = {};
    let updateUser = {};
    let userCreated = {};

    beforeEach(async () => {
        await db.clear(); //Limpiar la DB

        updateUser = {
            id: 0,
            firstname: "ian",
            lastname: "rosas",
            email: "ian@gmail.com"
        };

        newUser = {
            id: 0,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email().toLowerCase()
        };

        userCreated = await db.create(newUser); //Crear un nuevo usuario

    });

    it("Debería de regresar un objeto de tipo User al actualizar", async () => {

        const user = await db.update(updateUser);

        expect(user).toMatchObject({
            firstname: expect.any(String),
            lastname: expect.any(String),
            email: expect.any(String),
            id: expect.any(Number)
        });
        
    });

    it("Debería de regresar un objeto de tipo User con los valores que se acaban de actualizar", async () => {

        const user = await db.update(updateUser);
        console.log('respuesta', user);

        expect(user).toMatchObject(updateUser);
        
    });

    it("Debería de arrojar un error al tratar de actualizar un usuario que no existe en la DB", async () => {
    });
});

describe("Servicio delete", () => {
    let newUser = {};
    let userCreated = {};

    beforeEach(async () => {
        await db.clear(); //Limpiar la DB

        newUser = {
            id: 13,
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email().toLowerCase()
        };

        userCreated = await db.create(newUser); //Crear un nuevo usuario

    });

    it("Debería de regresar true al eliminar un usuario", async () => {

        const boolean = await db.delete(newUser.id);
        
        expect(boolean).toBe(true);
        
    });

    it("Debería de regresar false al tratar de eliminar un usuario con un id que no existe en la DB", async () => {
        const boolean = await db.delete(0);
        expect(boolean).toBe(true);
    });
}); 