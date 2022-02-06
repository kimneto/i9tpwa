/* ############## CONDUTOR ############## */

Parse.Cloud.define("cria-condutor", async (req) => {
   const condutor = new Condutor();
   const queryCondutor = new Parse.Query(Condutor);
   const resultCondutor = await queryCondutor
      .equalTo("cpf", req.params.cpf)
      .find({ useMasterKey: true });

   console.log(resultCondutor);
   try {
      if (resultCondutor.length <= 0) {
         condutor.set("nome", req.params.nome);
         condutor.set("cpf", req.params.cpf);
         condutor.set("nivel", req.params.nivel);
         condutor.set("email", req.params.email);
         condutor.set("codUnidade", req.params.codUnidade);

         const resultCondutor = await condutor.save(null, {
            useMasterKey: true,
         });
         const retorno = resultCondutor.toJSON();

         p = {
            id: retorno.objectId,
            cpf: retorno.cpf,
            codUnidade: retorno.codUnidade,
            nome: retorno.nome,
            email: retorno.email,
            nivel: retorno.nivel,
         };

         return {
            menssagem: "Condutor cadastrado com sucesso",
            data: p,
            sucesso: true,
            erro: null,
         };
      } else {
         return {
            menssagem: "Condutor já cadastrado com este CPF",
            data: {},
            sucesso: false,
            erro: null,
         };
      }
   } catch (e) {
      return {
         menssagem: "Erro ao cadastrar condutor",
         data: {},
         sucesso: false,
         erro: e.message,
      };
   }
});

Parse.Cloud.define("pega-condutor-por-cpf", async (req) => {
   const queryCondutor = new Parse.Query(Condutor);

   try {
      const resultCondutor = await queryCondutor
         .equalTo("cpf", req.params.cpf)
         .find({ useMasterKey: true });
      const retorno = resultCondutor.map(function (p) {
         p = p.toJSON();
         return {
            id: p.objectId,
            cpf: p.cpf,
            codUnidade: p.codUnidade,
            nome: p.nome,
            email: p.email,
            nivel: p.nivel,
         };
      });
      if (retorno.length === 0) {
         return {
            menssagem: "Condutor não encontrado",
            data: {},
            sucesso: false,
            erro: null,
         };
      }
      return {
         menssagem: "Condutor carregado com sucesso",
         data: retorno,
         sucesso: true,
         erro: null,
      };
   } catch (e) {
      return {
         menssagem: "Erro ao listar veículos",
         data: {},
         sucesso: false,
         erro: e.message,
      };
   }
});
