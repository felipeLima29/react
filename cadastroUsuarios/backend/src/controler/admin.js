import { openDb } from "../openDB.js";
import AdminDAO from "../dao/AdminDAO.js";
import dotenv from 'dotenv';
dotenv.config();

const adminDAO = new AdminDAO();

export async function createTableAdmin() { // Insere um administrador no banco.
    const nomeAdmin = "admin";
    const emailAdmin = process.env.EMAIL_ADMIN; // Email e senha do .env
    const passwordAdmin = process.env.PASSWORD_ADMIN;

    await adminDAO.createTable(); // Cria tabela.

    const verify = await adminDAO.verifyAdmin(emailAdmin); // Confere se o administrador já existe no banco.
    
    if(!verify){ // Se não tiver, insere o usuário.
        await adminDAO.insertAdmin(nomeAdmin, emailAdmin, passwordAdmin);
    }
}

export async function loginAdmin(req, res) { // Fazer login do administrador.
    let admin = req.body;

    let emailTrim = admin.email.trim();
    let passwordTrim = admin.password.trim();

    // Verificações padrões.
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
            // Verifica se já existe um usuário com os dados fornecidos.
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
            res.status(500);
            res.json({ msg: "Erro ao buscar usuário" });
        }

    }


}