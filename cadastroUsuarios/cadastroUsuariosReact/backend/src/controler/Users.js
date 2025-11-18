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
            error.body;
        }
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
}

export async function selectAllUsers(req, res) {
    openDB().then(db=>{
        try{
            db.all("SELECT * FROM Usuarios").then(pessoas=> res.json(pessoas, {
                statusCode: "200"
            }));

        }catch(error){
            error.body;
        }
    })
}

export async function deleteUser(req, res){
    let id = req.body.id;
    openDB().then(db=>{
        try{
            db.get("DELETE FROM Usuarios WHERE id=?", [id])
            .then(res=>res);
            res.json({statusCode: "200"});
        }catch(error){
            error.body;
            res.json({
                statusCode: "400"
            })
        }
    })
    
}