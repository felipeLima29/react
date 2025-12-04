import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { openDb } from '../openDB.js';

dotenv.config();


export async function getToken(req, res) {
    const secretKey = process.env.JWT_SECRET;
    const data = req.body;

    try {
        // Tenta achar o usuário do sistema, em seguidas faz algumas verificações.
        const db = await openDb();
        const user = await db.get("SELECT * FROM Usuarios WHERE email=? AND password=?", [data.email, data.password]);
        const admin = await db.get("SELECT * FROM Administradores WHERE email=? AND password=?", [data.email, data.password]);

        if (!user) { // Se não achar um usuário, ele tenta achar um administrador.

            if (!admin) { // Se não achar um administrador, ele retorna a mensagem.
                res.json({ msg: "Usuário não encontrado." })
            } else { // Se achar um administrador, cria o token que expira em 1 hora.
                const token = jwt.sign({ email: admin.email, password: admin.password },
                    secretKey,
                    { expiresIn: '1h' }
                );

                res.json(token);
            }
        } else { // Se achar um usuário comum , cria o token que expira em 1 hora.
            const token = jwt.sign({ email: user.email, password: user.password },
                secretKey,
                { expiresIn: '1h' }
            );

            res.json(token);
        }

    } catch (error) {
        error.body;
    }
}

export async function middleware(req, res, next) {
    const secretKey = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Tenta remover o "Bearer ".

    if (token == null) return res.status(401); // Se o token for nulo, ele retorna status 401.

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next(); // Se tiver tudo certo, ele passa pra próxima função.
    });

}