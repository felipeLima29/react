import { Router} from "express";
import express from 'express';
const app = express();
app.use(express());

const router = Router();

const users = [{
    id: 1,
    name: 'Felipe',
    email: "felipe@gmail.com",
    password: "felipelima"
}];

router.post('/login', (req, res)=>{
    const { email, password } = req.body; //linha 13 que está dando erro.
    const user = users.find(user => user.email == email && user.password == password);
    if(user){
        return res.status(200).json(user);
    }else{
        return res.status(401).json({msg: "Credenciais inválidas."});
    }
});

export default router;