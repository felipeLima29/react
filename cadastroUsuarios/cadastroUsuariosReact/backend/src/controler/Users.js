import { openDB } from "../openDB.js";

export async function createTable() {
    openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, password TEXT)');
    })
}

export async function insertUser(req, res) {
    let user = req.body;
    openDB().then(db=>{
        try {
            db.run("INSERT INTO Usuarios (nome, email, password) VALUES (?, ?, ?) ", [user.nome, user.email, user.password]);
            res.json({
                statusCode: 200,
                msg: "Usuário inserido com sucesso."
            })
        } catch (error) {
            res.statusCode(400);
            error.body;
        }
    })
}