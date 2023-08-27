import { alterarTarefa, deletarTarefa, inserirTarefas, listarTarefas, tarefasfinalizadas } from "../repository/tarefasRepository.js";

import { Router } from "express"

const server = Router();

server.post('/tarefas', async (req, resp) => {

    try {
        const tarefaparainserir = req.body;

        if (!tarefaparainserir.tarefa)
            throw new Error('O campo tarefa é obrigatório ');

        if (!tarefaparainserir.ordem == undefined || tarefaparainserir.ordem < 0)
            throw new Error('O campo ordem é obrigatório ');

        if (tarefaparainserir.finalizado !== undefined && tarefaparainserir.finalizado !== true && tarefaparainserir.finalizado !== false) {
            throw new Error('O campo finalizado é obrigatório');
        }


        if (!tarefaparainserir.cadastro)
            throw new Error('O campo cadastro é obrigatório ');

        const tarefainserida = await inserirTarefas(tarefaparainserir);

        resp.send(tarefainserida)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/tarefas', async (req, resp) => {
    try {
        const resposta = await listarTarefas();
        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/tarefas/finalizado', async (req, resp) => {
    try {
        const resposta = await tarefasfinalizadas(true);
        resp.send(resposta);
    } catch (err) {
        resp.status(500).send({
            erro: 'Ocorreu um erro no servidor'
        });
    }
})

server.delete('/tarefas/:id', async (req, resp) => {
    try {

        const { id } = req.params;

        const resposta = await deletarTarefa(id);
        if (resposta != 1)
            throw new Error('Tarefa não pode ser removida');
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/tarefas/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const tarefa = req.body;

        if (!tarefa.tarefa)
            throw new Error('O campo tarefa é obrigatório ');

        if (!tarefa.ordem == undefined || tarefa.ordem < 0)
            throw new Error('O campo ordem é obrigatório ');

        if (tarefa.finalizado !== undefined && tarefa.finalizado !== true && tarefa.finalizado !== false) {
            throw new Error('O campo finalizado é obrigatório');
        }

        if (!tarefa.cadastro)
            throw new Error('O campo cadastro é obrigatório ');


        const resposta = await alterarTarefa(id, tarefa);
        if (resposta != 1)
            throw new Error('Tarefa não pode ser alterada.');
        else
            resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})

export default server;