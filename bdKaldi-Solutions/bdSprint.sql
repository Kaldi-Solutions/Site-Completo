DROP DATABASE Kaldi;
CREATE DATABASE Kaldi;
USE Kaldi;

CREATE TABLE Empresa (
    idEmpresa int primary key auto_increment,
	CNPJ char(14),
    nomeComercial VARCHAR(100),
    responsavel VARCHAR(45),
    telfixo char(10),
    CEP CHAR(9),
    Numero int,
    Complemento varchar(45)
    );
    
CREATE TABLE usuario (
    idUsuario int,
    nomeUsuario VARCHAR(45),
    email VARCHAR(45), CONSTRAINT chkEmailUsuario check (email like '%@%'),
    CPF char(11),
    senha VARCHAR(45),
    telcel char(11),
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa (idEmpresa),
	primary key (fkEmpresa, idUsuario));
    
Create table Estufa (
	idEstufa int primary key auto_increment,
	numeroEstufa int,
	fkEmpresa int,
	foreign key (fkEmpresa) references Empresa (idEmpresa)

);

CREATE TABLE Sensor (
	idSensor INT primary key auto_increment,
    statusSensor VARCHAR(45),
    CONSTRAINT chkStatus CHECK(statusSensor IN('Ativo', 'Inativo','Manutenção')),
    fkEstufa int,
    foreign key (fkEstufa) references Estufa (idEstufa)
);

CREATE TABLE Leitura(
	idLeitura INT,
	temperatura FLOAT,
    umidade FLOAT,
    dtHora DATETIME,
    fkSensor int,
    foreign key (fkSensor) references Sensor (idSensor),
    primary key (idLeitura, fkSensor)
);

insert into empresa values 
(null, 18457358124513, 'Kaldi Solutions', 'André', '22029458', 'São Paulo', 'São Paulo', '02124730', '126', null ),
(null, 18457356924513, 'Agronomios', 'Alan', '22014568', 'São Paulo', 'São Paulo', '02334740', '154', null ),
(null, 18457321469513, 'Mecoffee', 'Caio', '24752058', 'São Paulo', 'São Paulo', '02351030', '159', null),
(null, 18457345921349, 'CoffeeZN', 'Gabriel', '22014688', 'São Paulo', 'São Paulo', '02234030', '157', null);

INSERT INTO usuario VALUES
(1, 'Alexander Kimura' , 'alexander@gmail.com', '84572384591' , '1234', '11993457456', 1),
(2, 'Bruno Diedrich' , 'bruno@gmail.com', '1264', '17459235962' ,'11995927456',1),
(3, 'Guilherme Cocoloti' , 'guilherme@gmail.com', 'abcd', '18459235691' ,'11993258456',2),
(4, 'Erik Amorim' , 'erik@gmail.com', '1346', '12952395510' , '11993263456',3);

insert into Estufa values 
(1,2,1),
(2,1,1),
(3,2,2),
(4,4,2);

insert into leitura values 

(1, '22.50', '60.5', '2022-10-10 13:30:00', 1),
(2, '24.15', '60.5', '2022-10-10 14:00:00', 2),
(3, '28.96', '60.5', '2022-10-10 14:30:00', 3),
(4, '21.13', '60.5', '2022-10-10 15:00:00', 4);

insert into sensor values 

(null, 'Ativo', 1),
(null ,'Ativo', 1),
(null, 'Manutenção', 1),
(null, 'Inativo', 2);




SELECT * FROM Usuario;
SELECT * FROM Empresa;
SELECT * FROM Sensor;
SELECT * FROM Leitura;
SELECT * FROM Estufa;

select empresa.nomeComercial, empresa.responsavel, usuario.nomeUsuario, usuario.email, leitura.* from usuario 
join empresa on fkEmpresa = idEmpresa
join leitura on fkSensor = idleitura;

DROP TABLE usuario;
DROP TABLE Empresa;
DROP TABLE Sensor;
DROP TABLE Estufa;
DROP TABLE Leitura;
