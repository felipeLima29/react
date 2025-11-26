import { openDb } from "../openDB.js";

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, password TEXT)');
    })
}

export async function insertUser(req, res) {
    let user = req.body;
    openDb().then(db => {
        try {

            let nomeTrim = user.nome.trim();
            let emailTrim = user.email.trim();
            let passwordTrim = user.password.trim();

            if (nomeTrim == "" || emailTrim == "" || passwordTrim == "") {
                res.json({
                    statusCode: 400,
                    msg: "Preencha todos os campos."
                })
            } else {
                db.run("INSERT INTO Usuarios (nome, email, password) VALUES (?, ?, ?) ", [user.nome, user.email, user.password]);
                res.json({
                    statusCode: 200,
                    msg: "Usuário inserido com sucesso."
                })

            }
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
    openDb().then(db => {
        try {
            db.all("SELECT * FROM Usuarios").then(pessoas => res.json(pessoas, {
                statusCode: "200"
            }));

        } catch (error) {
            error.body;
        }
    })
}

export async function deleteUser(req, res) {
    let id = req.body.id;
    openDb().then(db => {

        if (id == "" || id == null) {
            res.json({
                statusCode: 400,
                msg: "Digite um id."
            })
        } else {
            try {
                db.get("DELETE FROM Usuarios WHERE id=?", [id])
                    .then(res => res);
                res.json({ statusCode: "200" });
            } catch (error) {
                error.body;
                res.json({
                    statusCode: "400"
                })
            }
        }
    })

}

export async function updateUser(req, res) {
    let usuario = req.body

    try {

        let idTrim = usuario.id.trim();
        let nomeTrim = usuario.nome.trim();
        let emailTrim = usuario.email.trim();
        let passwordTrim = usuario.password.trim();

        if (idTrim == "" || nomeTrim == "" || emailTrim == "" || passwordTrim == "") {
            res.json({
                statusCode: 200
            })
        } else {
            openDb().then(db => {
                db.run("UPDATE Usuarios set nome=?, email=?, password=? WHERE id=?", [usuario.nome, usuario.email, usuario.password, usuario.id]);
            });
            res.json({
                statusCode: 200
            })
        }

    } catch (error) {
        error.body;
        res.json({
            statusCode: "400"
        })
    }

}

export async function selectUser(req, res) {
    let id = req.body.id;
    try {

        let idTrim = id.trim();

        if (idTrim) {
            res.json({
                statusCode: 400,
                msg: "Digite um id."
            })
        } else {
            openDb().then(db => {
                db.get("SELECT * FROM Usuarios WHERE id=? ", [id]).then(user => res.json(user));
            })
        }

    } catch (error) {
        error.body;
        res.json({
            statusCode: "400"
        })
    }
}

export async function verifyEmail(req, res) {
    let email = req.body.email;

    let emailTrim = email.trim();
    if (emailTrim == "") {
        res.json({
            statusCode: 400,
            msg: "Digite um email."
        })
    } else {

        try {
            openDb().then(db => {
                db.get("SELECT * FROM Usuarios WHERE email LIKE ?", [email]).then(user => res.json(user));
            })
        } catch (error) {
            error.body;
        }

    }

}