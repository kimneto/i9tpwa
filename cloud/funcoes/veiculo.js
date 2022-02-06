/* ################## VEICULOS ################## */

Parse.Cloud.define("pega-veiculos", async (req) => {
   const queryVeiculos = new Parse.Query(Veiculo);
   try {
      const resultVeiculos = await queryVeiculos.find({ useMasterKey: true });
      const retorno = resultVeiculos.map(function (p) {
         p = p.toJSON();
         return {
            id: p.objectId,
            nome: p.nome,
            placa: p.placa,
            statusVeiculo: p.statusVeiculo,
            grupo: p.grupo,
            tipo: p.tipo,
            patrimonio: p.patrimonio,
         };
      });
      return {
         menssagem: "Lista de veículos carregada com sucesso",
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

Parse.Cloud.define("pega-veiculos-por-status", async (req) => {
   const queryVeiculos = new Parse.Query(Veiculo);

   try {
      const resultVeiculos = await queryVeiculos
         .equalTo("statusVeiculo", req.params.statusVeiculo)
         .find({ useMasterKey: true });
      const retorno = resultVeiculos.map(function (p) {
         p = p.toJSON();
         return {
            id: p.objectId,
            nome: p.nome,
            placa: p.placa,
            statusVeiculo: p.statusVeiculo,
            grupo: p.grupo,
            tipo: p.tipo,
            patrimonio: p.patrimonio,
         };
      });
      return {
         menssagem:
            "Lista de veículos status " +
            req.params.statusVeiculo +
            " carregada com sucesso",
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
