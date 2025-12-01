import { Router } from "express";
import { insertUser, selectAllUsers, deleteUser, updateUser, selectUser, verifyEmail, loginUser } from "./controler/Users.js";
import { getToken, middleware } from "./controler/token.js";

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        msg: "Api atualizadaaaa."
    })
})

router.post('/insertUser', middleware, insertUser);
router.get('/listUsers', selectAllUsers);
router.delete('/deleteUser', deleteUser);
router.put('/updateUser', updateUser);
router.post('/listUser', selectUser);
router.post('/verifyEmail', verifyEmail);
router.post('/loginUser', loginUser);
router.post('/getToken', getToken);
export default router;