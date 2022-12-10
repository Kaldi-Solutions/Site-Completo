var database = require("../database/config");

function buscarUltimasMedidas(idEmpresa,numeroDaEstufa, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Estufa.fkEmpresa,  Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} and numeroEstufa in ${numeroDaEstufa} order by HORA desc limit ${limite_linhas}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Estufa.fkEmpresa,  Sensor.statusSensor, leitura.idLeitura, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} and numeroEstufa in ${numeroDaEstufa} order by idLeitura desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidas2(idEmpresa,numeroDaEstufa, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Estufa.fkEmpresa,  Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} and numeroEstufa in ${numeroDaEstufa} order by HORA desc limit ${limite_linhas}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Estufa.fkEmpresa,  Sensor.statusSensor, leitura.idLeitura, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} and numeroEstufa in ${numeroDaEstufa} order by idLeitura desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idEmpresa,numeroDaEstufa, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {

        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Estufa.fkEmpresa,  Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} and numeroEstufa in ${numeroDaEstufa} order by HORA desc limit ${limite_linhas}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        instrucaoSql = `select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Estufa.fkEmpresa,  Sensor.statusSensor, leitura.idLeitura, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = ${idEmpresa} and numeroEstufa in ${numeroDaEstufa} order by idLeitura desc limit ${limite_linhas}`;
    } else {

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidas2,
    buscarMedidasEmTempoReal
}
