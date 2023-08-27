
import { con } from "./connection.js"

export async function inserirTarefas(tarefas) {
    const comando =

        `INSERT INTO tb_tarefa (id_tarefa, ds_tarefa, nr_ordem,  bt_finalizado,   dt_cadastro )
                values(?, ?, ?, ?, ?) `

    const [resposta] = await con.query(comando, [tarefas.tarefas, tarefas.tarefa, tarefas.ordem, tarefas.finalizado, tarefas.cadastro]);
    tarefas.id = resposta.insertId;

    return tarefas;
}

export async function listarTarefas() {

    const comando =

        `SELECT id_tarefa    id,
       ds_tarefa             tarefa,
       nr_ordem              ordem,
       bt_finalizado         finalizado,
       dt_cadastro           cadastro
       FROM tb_tarefa`;

    const [linhas] = await con.query(comando);
    return linhas;

}


export async function tarefasfinalizadas(finalizado) {

    const comando =

        `SELECT id_tarefa    id,
       ds_tarefa             tarefa,
       nr_ordem              ordem,
       bt_finalizado         finalizado,
       dt_cadastro           cadastro
       FROM tb_tarefa
       WHERE bt_finalizado = ? `;

    const [linhas] = await con.query(comando, [finalizado]);
    return linhas;

}

export async function deletarTarefa(id) {

    const comando =
        `DELETE FROM tb_tarefa
                WHERE id_tarefa= ? `

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}


export async function alterarTarefa(id, tarefas) {

    const comando =
        `
    UPDATE tb_tarefa
    SET   ds_tarefa         = ?,
          nr_ordem          = ?,
          bt_finalizado     = ?,
          dt_cadastro       = ?
    WHERE id_tarefa         = ?`
    const [resposta] = await con.query(comando, [tarefas.tarefa, tarefas.ordem, tarefas.finalizado, tarefas.cadastro, id ]);
    return resposta.affectedRows;
}