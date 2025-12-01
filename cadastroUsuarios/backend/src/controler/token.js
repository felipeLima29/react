import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { openDb } from '../openDB.js';

dotenv.config();


export async function getToken(req, res) {

    const secretKey = process.env.JWT_SECRET;
    const data = req.body;

    try {

        const db = await openDb();
        const user = await db.get("SELECT * FROM Usuarios WHERE email=? AND password=?", [data.email, data.password]);

        if (!user) {
            res.json({ msg: "Usuário não encontrado." })
        }

        const token = jwt.sign({ email: user.email, password: user.password },
            secretKey,
            { expiresIn: '1h' }
        );

        res.json(token);

    } catch (error) {
        error.body;
    }


}

export async function middleware(req, res, next) {
    const secretKey = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (token == null) return res.status(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });

}