var database = require("../database/config");

function buscarUltimasMedidas(idEmpresa, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} order by HORA desc limit ${limite_linhas}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} order by HORA desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} order by HORA desc limit ${limite_linhas}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} order by HORA desc limit ${limite_linhas}`;
    } else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
