/* ############ TRAFEGO ############ */

Parse.Cloud.define("pega-trafegos", async (req) => {
   const queryTrafego = new Parse.Query(Trafego);

   queryTrafego.include("fct");
   queryTrafego.include("veiculo");

   try {
      const resultTrafegos = await queryTrafego.find({ useMasterKey: true });

      return {
         menssagem: "Lista de trafegos carregada com sucesso",
         data: resultTrafegos,
         sucesso: true,
         erro: null,
      };
   } catch (e) {
      return {
         menssagem: "Erro ao listar trafegos",
         data: {},
         sucesso: false,
         erro: e.message,
      };
   }
});

Parse.Cloud.define("cria-trafego", async (req) => {
   const trafego = new Trafego();
   const fct = await new Parse.Query("Fct").get(req.params.fctId);

   trafego.set("hodometro", req.params.hodometro);
   trafego.set("horaChegada", req.params.horaChegada);
   trafego.set("pontoParada", req.params.pontoParada);
   trafego.set("fct", fct);

   try {
      const alfa = await trafego.save(null, { useMasterKey: true });
      return {
         menssagem: "Novo trafego criado com sucesso",
         data: {
            id: alfa.id,
         },
         sucesso: true,
         erro: null,
      };
   } catch (e) {
      return {
         menssagem: "Erro ao criar Trafego",
         data: {},
         sucesso: false,
         erro: e.message,
      };
   }
});

Parse.Cloud.define("deleta-trafego", async (req) => {
   const trafego = await new Parse.Query("Trafego").get(req.params.trafegoId);
   try {
      const alfa = await trafego.destroy(null, { useMasterKey: true });
      return {
         menssagem: "Trafego deletado com sucesso",
         data: {
            id: alfa.id,
         },
         sucesso: true,
         erro: null,
      };
   } catch (e) {
      return {
         menssagem: "Erro ao deletar Trafego",
         data: {},
         sucesso: false,
         erro: e.message,
      };
   }
});
