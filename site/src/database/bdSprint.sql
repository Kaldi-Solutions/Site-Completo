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
    Complemento varchar(45),
    Token varchar(50)
    );
    
CREATE TABLE usuario (
    idUsuario int primary key auto_increment,
    nomeUsuario VARCHAR(45),
    email VARCHAR(45), CONSTRAINT chkEmailUsuario check (email like '%@%'),
    CPF char(11),
    senha VARCHAR(45),
    telcel char(11),
    telFixo char(10),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa(idEmpresa)
);


    
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
(null, 18457358124513, 'Kaldi Solutions', 'André', '22029458', '02960090', '216', '1325',1234567),
(null, 18457358124512, 'MRI Tech', 'Bruno', '22029450', '02022020', '210', '1325',102030),
(null, 18457358124511, 'Koldi solução', 'Jonatas', '22029412', '01310300', '200', '1325',777888);




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
insert into Estufa values 
(4,4,3);



insert into sensor values 

(null, 'Ativo', 1),
(null ,'Ativo', 1),
(null, 'Manutenção', 1),
(null, 'Inativo', 2);

insert into leitura values 

(1, '22.50', '60.5', '2022-10-10 13:30:00', 1),
(2, '24.15', '60.5', '2022-10-10 14:00:00', 2),
(3, '28.96', '60.5', '2022-10-10 14:30:00', 3),
(4, '21.13', '60.5', '2022-10-10 15:00:00', 4);

delete from Usuario where idUsuario =2;

SELECT * FROM Usuario;
SELECT * FROM Empresa;
SELECT * FROM Sensor;
SELECT * FROM Leitura;
SELECT * FROM Estufa;

select empresa.nomeComercial, empresa.responsavel, usuario.nomeUsuario, usuario.email, leitura.* from usuario 
join empresa on fkEmpresa = idEmpresa
join leitura on fkSensor = idleitura;

select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Sensor.statusSensor, leitura.temperatura,
leitura.umidade , leitura.dtHora from Empresa join Estufa on fkEmpresa =idEmpresa 
join Sensor on idEstufa = fkEstufa 
join Leitura on idSensor = fkSensor where idEmpresa = 1;

select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dtHora 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa 
        join Leitura on idSensor = fkSensor where idEmpresa = 1
                    order by dtHora  desc limit 12;


DROP TABLE usuario;
DROP TABLE Empresa;
DROP TABLE Sensor;
DROP TABLE Estufa;
DROP TABLE Leitura;
