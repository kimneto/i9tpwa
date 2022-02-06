const Parse = require('parse/node');
Parse.initialize("0Gi3NSxdGbl32WhRCVTErJCjnXYYeTwH40AJjIXc", "2fs5i4XjsYqwYKui28YijUlFwjHf5GXs8LGBgbMk", "8dA8MVPa1QXvMNcX6O9x23BpGnYJuHSqeXkn39Tm");
Parse.serverURL = 'https://parseapi.back4app.com/';

async function run() {
    /*   let myQuery = new Parse.Query('Fct');
       myQuery.equalTo('objectId', 'SURvdqh3vb');
       let myObject = await myQuery.first();
       let relacao = myObject.relation('trafegos');
       let relacaoQuery = relacao.query();
       let primeiroItem = await relacaoQuery.find();
   
       let traf = primeiroItem.map(item => {
           item = item.toJSON();
           let d = new Date;
   
           return {
               id: item.objectId,
               horaChegada: item.horaChegada,
               horaPartida: item.horaPartida,
               hodometro: item.hodometro,
               pontoParada: item.pontoParada,
   
           }
       });
   
       console.log(traf);
   */

    let queryFct = new Parse.Query('Fct');
    queryFct.include('trafego');
    queryFct.include('veiculo');
    queryFct.include('condutor');
    result = await queryFct.find();
    let printa = await result.map(async function (fct) {

        fct = fct.toJSON();
        return {
            id: fct.objectId,
            concluido: fct.concluido,
            documento: fct.documento,
            veiculoPlaca: fct.veiculo.placa,
            veiculoPatrimonio: fct.veiculo.patrimonio,
            veiculoGrupo: fct.veiculo.grupo,
            veiculoTipo: fct.veiculo.tipo,
            novidadesVerificadas: fct.novidadesVerificadas,
            defeitosVerificados: fct.defeitosVerificados,

        }
    });
    console.log(printa);
}

run();