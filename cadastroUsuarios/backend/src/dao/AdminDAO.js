import { openDb } from "../openDB.js";

export default class AdminDAO {
    constructor(dao) {
        this.dao = dao;
    }

    async createTable() {
        const db = await openDb();
        const create = await db.exec('CREATE TABLE IF NOT EXISTS Administradores (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, password TEXT)');

        return create;
    }
    async verifyAdmin(email) {
        const db = await openDb();
        const verify = await db.get('SELECT * FROM Administradores WHERE email = ?', [email])

        return verify;
    }
    async insertAdmin(nome, email, password) {
        const db = await openDb();
        const insert = await db.run(
            "INSERT INTO Administradores (nome, email, password) VALUES (?, ?, ?)",
            [nome, email, password]);

        return insert;
    }
}