import { Router } from "express";
import { insertUser, selectAllUsers } from "./controler/Users.js";

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        msg: "Api atualizadaaaa."
    })
})

router.post('/insertUser', insertUser);
router.get('/listUsers', selectAllUsers)
export default router;