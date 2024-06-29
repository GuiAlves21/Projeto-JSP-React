import connection from "../database/databaseConnection.js";

export const GenerosController = {
  async create(req, res) {
    try {
      console.log("");
      console.log("[INFO] Iniciando cadastro de gênero");

      const { descricao } = req.body;

      console.log("[INFO] Iniciando inserção do gênero no banco de dados");

      // Supondo que haja uma função validateGenreFields para validar os campos do gênero
      if (!validateGeneroFields(descricao, res)) {
        // Realiza o cadastro do gênero no banco de dados
        const trx = await connection.transaction();
          await trx("GENERO").insert({
            GEN_DESCRICAO: descricao,
          });

          await trx.commit();

          console.log("[INFO] Gênero cadastrado com sucesso");

          return res.status(201).send();
        }
     


    } catch (err) {
      console.log("[ERROR] [GeneroController] Erro no método create: " + err);
      
    }
  },

  async list(req, res) {
    try {
      console.log("[INFO] Iniciando listagem de gêneros");

      // Consulta para selecionar todos os gêneros da tabela 'GENERO'
      const generos = await connection("GENERO")
        .select("*");

      // Serializa os itens conforme necessário
      const serializedGeneros = generos.map((genero) => {
        return {
          id: genero.GEN_ID,
          descricao: genero.GEN_DESCRICAO,
          // Adicione outros campos conforme necessário
        };
      });

      return res.json({
        items: serializedGeneros,
        totalElements: serializedGeneros.length // Total de elementos retornados
      });
    } catch (err) {
      console.log("[ERROR] [GeneroController] Erro no método list:", err);
      return res.status(500).json({ error: "Erro ao listar gêneros." });
    }
  },

  async delete(req, res) {
    let trx; // Declare trx outside try-catch block to access it in catch block
    try {
      console.log("[INFO] Iniciando exclusão de gênero");

      const { gen_id } = req.body; // Captura o gen_id do corpo da requisição

      trx = await connection.transaction();

      // Exclusão do gênero com o gen_id específico
      await trx("GENERO")
        .where("GEN_ID", gen_id)
        .delete();

      await trx.commit();

      console.log("[INFO] Gênero excluído com sucesso");

      return res.status(200).send("Gênero excluído com sucesso");

    } catch (err) {
      console.error("[ERROR] [GeneroController] Erro no método delete:", err);

      if (trx) {
        await trx.rollback(); // Garante que a transação seja revertida em caso de erro
      }

      return res.status(500).json({ error: "Erro ao excluir o gênero." });
    }
  },

  async update(req, res) {
    let trx; // Declare trx outside try-catch block to access it in catch block

    try {
      console.log("");
      console.log("[INFO] Iniciando atualização de gênero");

      const { gen_id, gen_descricao } = req.body;


      console.log("[INFO] Iniciando atualização do gênero no banco de dados");

      if (!gen_descricao) {
        return res.status(400).json({ error: "Descrição do gênero não foi fornecida ou é inválida" });
      }

      trx = await connection.transaction(); // Inicialização do trx dentro do try

      await trx("GENERO")
        .where("GEN_ID", gen_id)
        .update({
          GEN_DESCRICAO: gen_descricao,
        });

      await trx.commit();

      console.log("[INFO] Gênero atualizado com sucesso");

      return res.status(200).send("Gênero atualizado com sucesso");

    } catch (err) {
      console.error("[ERROR] [GeneroController] Erro no método update:", err);

      if (trx) {
        await trx.rollback(); // Reverte a transação em caso de erro, se trx estiver definido
      }

      return res.status(500).json({ error: "Erro ao atualizar o gênero." });
    }
  }
}

function validateGeneroFields(descricao, res) {
  console.log("[INFO] Verificando campos dos Gêneros");
  
  if (!descricao) {
    return res.status(400).json({ error: "Campos obrigatórios não informados" });
  }

  const isValidLength = descricao.length >= 4 && descricao.length <= 100;
  const isValidCharacters = /^[A-Za-z\s/]+$/.test(descricao);

  if (!isValidLength && descricao.length < 4) {
    return res.status(400).json({ error: "Mínimo 4 caracteres." });
  }
  if (!isValidCharacters) {
    return res.status(400).json({ error: 'Só pode conter letras e o caractere especial "/".' });
  }
  if (!isValidLength && descricao.length > 100) {
    return res.status(400).json({ error: "Máximo 100 caracteres." });
  }
}

