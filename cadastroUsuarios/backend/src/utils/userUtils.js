import { openDb } from "../openDB.js";

export default class UserUtil {
    constructor(userUtil) {
        this.userUtil = userUtil;
    }

    async verifyUserIdUtil(id){
        const db = await openDb();
        const verifyUser = await db.get('SELECT * FROM Usuarios WHERE id=?', [id]);

        return verifyUser;
    }
    async verifyEmailUtil(email){
        const db = await openDb();
        const verifyEmail = await db.get("SELECT * FROM Usuarios WHERE email LIKE ?", [email]);

        return verifyEmail;
    }

}