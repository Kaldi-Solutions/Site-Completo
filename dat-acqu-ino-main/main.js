// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 8080;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'producao';

const serial = async (
    valoresDht11Umidade,
    valoresDht11Temperatura

) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'aluno',
                password: 'sptech',
                database: 'Kaldi'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
        
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        //console.log(data);
        const valores = data.split(';');
        const dht11Umidade = parseFloat(valores[0]);
        const dht11Temperatura = parseFloat(valores[1]);

        console.log(dht11Umidade);

        valoresDht11Umidade.push(dht11Umidade);
        valoresDht11Temperatura.push(dht11Temperatura);


        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO Leitura (temperatura, umidade, dt, HORA, fkSensor) VALUES (${dht11Temperatura}, ${dht11Umidade}, GETDATE(), CURTIME(), 1),(${dht11Temperatura}, ${dht11Umidade}, GETDATE(), CURTIME(), 2),  (${dht11Temperatura}, ${dht11Umidade}, GETDATE(), CURTIME(), 3),(${dht11Temperatura}, ${dht11Umidade}, GETDATE(), CURTIME(), 4),(${dht11Temperatura}, ${dht11Umidade}, GETDATE(), CURTIME(), 5),(${dht11Temperatura}, ${dht11Umidade}, GETDATE(), CURTIME(), 6)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=kaldisolutions.database.windows.net;Database=bdKaldi;User Id=admin-Kaldi;Password=#Gfgrupo4;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", ")
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
                await poolBancoDados.execute(
                    'INSERT INTO Leitura (temperatura, umidade, dt, HORA, fkSensor) VALUES (?, ?, CURDATE(), CURTIME(), 1),(?, ?, CURDATE(), CURTIME(), 2),  (?, ?, CURDATE(), CURTIME(), 3),(?, ?, CURDATE(), CURTIME(), 4),(?, ?, CURDATE(), CURTIME(), 5),(?, ?, CURDATE(), CURTIME(), 6)',
                    [dht11Temperatura, dht11Umidade,dht11Temperatura*1.2, dht11Umidade*0.90,dht11Temperatura*0.95, dht11Umidade*1.13, dht11Temperatura*1.25, dht11Umidade *1.2,dht11Temperatura*1.17, dht11Umidade*0.96,dht11Temperatura*1.03, dht11Umidade*0.84]
            
                );
                console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura)

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
const servidor = (
    valoresDht11Umidade,
    valoresDht11Temperatura
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });
}

(async () => {
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    await serial(
        valoresDht11Umidade,
        valoresDht11Temperatura
    );
    servidor(
        valoresDht11Umidade,
        valoresDht11Temperatura
    );
})();
