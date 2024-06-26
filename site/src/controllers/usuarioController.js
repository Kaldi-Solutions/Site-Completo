var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function pegarEmpresa(req, res) {
    var nomeComercial = req.body.nomeComercialServer;


    usuarioModel.pegarEmpresa(nomeComercial)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("nomeComercial inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo nomeComercial!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pegarToken(req, res) {
    var tokenEmpresa = req.body.tokenEmpresaServer;
    usuarioModel.pegarToken(tokenEmpresa)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length == 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Token da empresa inválido(s)");
                } else {
                    res.status(403).send("Mais de uma Empresa com o mesmo Token!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao pegar o Token! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrarUsuario(req, res) {
    var nomeUsuario = req.body.usuarioServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    var telCel = req.body.celServer;
    var telFixo = req.body.telFixoServer;
    var idEmpresa = req.body.idEmpresaServer;

    if (nomeUsuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (telCel == undefined) {
        res.status(400).send("Seu celular está indefinida!");
    } else if (telFixo == undefined) {
        res.status(400).send("Seu telefone está indefinido!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa está indefinido!");
    } else {

        usuarioModel.cadastrarUsuario(nomeUsuario, email, cpf, senha, telCel, telFixo, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cnpj = req.body.cnpjServer;
    var nomeC = req.body.nomeCServer;
    var nomeR = req.body.nomeRServer;
    var telFixo = req.body.telFixoServer;
    var cep = req.body.cepServer;
    var num = req.body.numServer;
    var comp = req.body.compServer;

    // Faça as validações dos valores
    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (nomeC == undefined) {
        res.status(400).send("Seu nome comercial está undefined!");
    } else if (nomeR == undefined) {
        res.status(400).send("Seu nome responsável está undefined!");
    } else if (telFixo == undefined) {
        res.status(400).send("Seu telefone fixo está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else if (num == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (comp == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(cnpj, nomeC, nomeR, telFixo, cep, num, comp)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    pegarEmpresa,
    pegarToken,
    cadastrarEmpresa,
    listar,
    testar,
    cadastrarUsuario
}