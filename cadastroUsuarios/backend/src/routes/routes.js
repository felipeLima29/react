import { Router } from "express";
import { insertUser, selectAllUsers, deleteUser, updateUser, selectUser, verifyEmail, loginUser, forgetPassword, resetPassword } from "../controler/Users.js";
import { getToken, middleware } from "../controler/token.js";
import { loginAdmin } from "../controler/admin.js";

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        msg: "Api atualizada."
    })
})

router.post('/insertUser', middleware, insertUser);
router.get('/listUsers', middleware, selectAllUsers);
router.delete('/deleteUser', middleware, deleteUser);
router.put('/updateUser', middleware, updateUser);
router.post('/listUser', middleware, selectUser);
router.post('/verifyEmail', middleware, verifyEmail);
router.post('/loginUser', loginUser);
router.post('/loginAdmin', loginAdmin);
router.post('/getToken', getToken);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', resetPassword);

export default router;