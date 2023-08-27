import 'dotenv/config'

import tarefaController from "./controller/tarefasController.js"

import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

server.use(tarefaController);


server.listen(process.env.PORT, ()=> console.log(`API Conectada na Porta ${process.env.PORT}`));
