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

}