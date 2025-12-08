import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import { createTable } from './controler/Users.js';
import { createTableAdmin } from './controler/admin.js';

const app = express();
app.use(express.json());

app.use(cors({  
    origin: ['http://localhost:5173'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(router);

createTable();
createTableAdmin();

app.get('/', (req, res) => { res.json("ola") });

app.listen(3001, ()=>console.log("Api rodando"));
