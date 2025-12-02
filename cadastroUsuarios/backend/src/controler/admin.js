import { openDb } from "../openDB.js";
import dotenv from 'dotenv';
dotenv.config();

export async function createTableAdmin() {
    const nomeAdmin = "admin";
    const emailAdmin = process.env.EMAIL_ADMIN;
    const passwordAdmin = process.env.PASSWORD_ADMIN;

    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Administradores (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, password TEXT)');

        db.get('SELECT * FROM Administradores WHERE email = ?', [emailAdmin])
            .then(row => {
                if (!row) {
                    db.run(
                        "INSERT INTO Administradores (nome, email, password) VALUES (?, ?, ?)",
                        [nomeAdmin, emailAdmin, passwordAdmin]);
                }
            })
    });
}

export async function loginAdmin(req, res) {
    let admin = req.body;

    let emailTrim = admin.email.trim();
    let passwordTrim = admin.password.trim();

    if (emailTrim == "" || passwordTrim == "") {
        res.status(400)
        res.json({ msg: "Digite algo nos campos de email e password." });
    } else if (passwordTrim.length < 8) {
        res.status(400);
        res.json({ msg: "A senha deve conter ao menos 8 dígitos." });
    } else {

        try {
            const email = emailTrim;
            const password = passwordTrim;
            openDb().then(db => {
                db.get("SELECT * FROM Administradores WHERE email=? AND password=?", [email, password])
                    .then(user => {
                        if (!user) {
                            res.json({ msg: "Usuário não encontrado." })
                        }

                        res.json(user);
                    });
            });
        } catch (error) {
            res.json({ msg: "Erro ao buscar usuário" });
        }

    }


}