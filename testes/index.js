const Parse = require('parse/node');
Parse.initialize("0Gi3NSxdGbl32WhRCVTErJCjnXYYeTwH40AJjIXc", "2fs5i4XjsYqwYKui28YijUlFwjHf5GXs8LGBgbMk", "8dA8MVPa1QXvMNcX6O9x23BpGnYJuHSqeXkn39Tm");
Parse.serverURL = 'https://parseapi.back4app.com/';

async function run() {
    let queryFct = new Parse.Query('Fct');
    let listaFcts = [];

    queryFct.findAll({ useMasterKey: true }).then(async function (fcts) {
        for (let i = 0; i < fcts.length; i++) {
            let fct = fcts[i].toJSON();
            fcts[i].relation("trafegos").query().find({ useMasterKey: true }).then(async function (trafegos) {
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
                    trafegos: trafegos.map(trafego => {
                        trafego = trafego.toJSON();
                        return {
                            id: trafego.objectId,
                            horaChegada: trafego.horaChegada,
                            horaPartida: trafego.horaPartida,
                            hodometro: trafego.hodometro,
                            pontoParada: trafego.pontoParada,
                        }
                    })
                };

            }).then(async function (tipa) {
                listaFcts.push(tipa);
                console.log(listaFcts);
            });

        }
    });

}



run();