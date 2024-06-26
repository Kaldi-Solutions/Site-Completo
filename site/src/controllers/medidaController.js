var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    var limite_linhas = req.params.limite_linhas;
    var idEmpresa = req.params.idEmpresa;
    var numeroDaEstufa = req.params.numeroDaEstufa;


    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idEmpresa, numeroDaEstufa, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarUltimasMedidas2(req, res) {

    var limite_linhas = req.params.limite_linhas;
    var idEmpresa = req.params.idEmpresa;
    var numeroDaEstufa = req.params.numeroDaEstufa;


    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas2(idEmpresa, numeroDaEstufa, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var limite_linhas = req.params.limite_linhas;
    var idEmpresa = req.params.idEmpresa;
    var numeroDaEstufa = req.params.numeroDaEstufa;

    
    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idEmpresa, numeroDaEstufa, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidas2,
    buscarMedidasEmTempoReal

}