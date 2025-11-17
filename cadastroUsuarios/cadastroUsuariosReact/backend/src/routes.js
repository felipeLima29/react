import { Router } from "express";
import { createTable, insertUser } from "./controler/Users.js";

const router = Router();
createTable();

router.get('/', (req, res)=>{
    res.json({
        msg: "Api rodando."
    })
})

router.post('/insertUser', insertUser);

export default router;