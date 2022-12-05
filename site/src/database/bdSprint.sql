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
    dt DATE,
    HORA TIME,
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
(4,4,2),
(5,3,3),
(6,3,3),
(7,3,3);




insert into sensor values 

(null, 'Ativo', 1),
(null ,'Ativo', 1),
(null, 'Manutenção', 1),
(null, 'Inativo', 2),
(null, 'Ativo', 3);

insert into leitura values 

(1, '22.50', '60.5', '2022-10-10','12:00:00', 1),
(2, '24.15', '55.0', '2022-10-10','13:00:00', 2),
(3, '28.96', '57.2', '2022-10-10','14:00:00', 3),
(4, '21.13', '53.9', '2022-10-10','15:00:00', 4),
(5, '18.50', '54.5', '2022-10-10','16:00:00', 4),
(6, '20.13', '53.5', '2022-10-10','17:00:00', 4),
(7, '22.00', '50.1', '2022-10-10','18:00:00', 4),
(8, '21.19', '47.5', '2022-10-10','19:00:00', 4),
(9, '19.13', '45.5', '2022-10-10','20:00:00', 4),
(10, '21.57', '45.9', '2022-10-10','21:00:00', 4),
(11, '22.03', '46.6', '2022-10-10','22:00:00', 4),
(12, '24.18', '48.0', '2022-10-10','23:00:00', 4);

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
leitura.umidade , leitura.Hora from Empresa join Estufa on fkEmpresa =idEmpresa 
join Sensor on idEstufa = fkEstufa 
join Leitura on idSensor = fkSensor where idEmpresa = 1;

select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Sensor.statusSensor, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa 
        join Leitura on idSensor = fkSensor where idEmpresa = 1
                    order by Hora  desc limit 12;

truncate table empresa;
truncate table usuario;
truncate table sensor;
truncate table estufa;
truncate table leitura;

DROP TABLE usuario;
DROP TABLE Empresa;
DROP TABLE Sensor;
DROP TABLE Estufa;
DROP TABLE Leitura;
