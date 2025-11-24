import { Router } from "express";
import { insertUser, selectAllUsers, deleteUser, updateUser, selectUser } from "./controler/Users.js";

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        msg: "Api atualizadaaaa."
    })
})

router.post('/insertUser', insertUser);
router.get('/listUsers', selectAllUsers);
router.delete('/deleteUser', deleteUser);
router.put('/updateUser', updateUser);
router.post('/listUser', selectUser);
export default router;