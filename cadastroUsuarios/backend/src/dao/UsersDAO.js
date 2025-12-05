import { openDb } from "../openDB.js";

export default class UserDAO {
    constructor(dao) {
        this.dao = dao
    }


    async createTable() {
        const db = await openDb();
        const create = await db.exec('CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, password TEXT)');

        return create;
    }

    async insertUserDAO(nome, email, password) {
        const db = await openDb();
        const insert = db.run('INSERT INTO Usuarios (nome, email, password) VALUES (?, ?, ?) ',
            [nome, email, password]);

        return insert;
    }
    async selectAllUsersDAO() {
        const db = await openDb();
        const selectAll = await db.all('SELECT * FROM Usuarios');

        return selectAll;
    }
    async deleteUserDAO(id) {
        const db = await openDb();
        const deleteUser = await db.run("DELETE FROM Usuarios WHERE id=?",
            [id]);

        return deleteUser;
    }
    async updateUserDAO(nome, email, password, id) {
        const db = await openDb();
        const updateUser = await db.run("UPDATE Usuarios set nome=?, email=?, password=? WHERE id=?",
            [nome, email, password, id]);

        return updateUser;
    }
    async selectUserDAO(id) {
        const db = await openDb();
        const selectUser = await db.get("SELECT * FROM Usuarios WHERE id=? ",
            [id]);

        return selectUser;
    }
    async loginUserDAO(email, password) {
        const db = await openDb();
        const loginUser = await db.get("SELECT * FROM Usuarios WHERE email=? AND password=?",
            [email, password]);

        return loginUser;
    }
    async updatePasswordUserDAO(password, id){
        const db = await openDb();
        const updatePassword = await db.run("UPDATE Usuarios set password=? WHERE id=?",
            [password, id]);

        return updatePassword;
    }
}

