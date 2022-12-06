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
 select * from usuarios;   
    
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
	idLeitura INT auto_increment,
	temperatura FLOAT,
    umidade FLOAT,
    dt DATE,
    HORA TIME,
    fkSensor int,
    foreign key (fkSensor) references Sensor (idSensor),
    primary key (idLeitura, fkSensor)
);


insert into empresa values 
(null, 18457358124513, 'Kaldi Solutions', 'Ale', '22029458', '02960090', '216', '1325',1234567),
(null, 18457358124512, 'MRI Tech', 'Bruno', '22029450', '02022020', '210', '1325',102030),
(null, 18457358124511, 'Koldi solução', 'Jonatas', '22029412', '01310300', '270', '1525',777888);
-- (null, 18457358124511, 'Koldi solução', 'Jonatas', '22029412', '01310300', '270', '1525',777888);


INSERT INTO usuario VALUES
(NULL, 'Alexander Kimura' , 'alexander@gmail.com', '84572384591' , '123456', '1199345746', '1199345743', 1),
(NULL, 'Bruno Diedrich' , 'bruno@gmail.com', '84572384593', '123456' ,'11995927456' , '1199345716',1),
(NULL, 'Guilherme Cocoloti' , 'guilherme@gmail.com', '84572384592', '123456' ,'1199325846' , '1199445745',2),
(NULL, 'Erik Amorim' , 'erik@gmail.com', '84572384598', '123456' , '11893263456', '1199345346',2),
(NULL, 'Alexander' , 'alexander@gmail.com', '84572384599', '123456' , '11913253456', '1199345146',3),
(NULL, 'Marcelo' , 'marcelo@gmail.com', '84572384591', '123456' , '11793263456', '1199345246',3);

insert into Estufa values 
(NULL,1,1),
(NULL,2,1),
(NULL,3,1),
(NULL,4,1),
(NULL,5,1),
(NULL,6,1),
(NULL,1,2),
(NULL,2,2),
(NULL,3,2),
(NULL,4,2),
(NULL,5,2),
(NULL,6,2),
(NULL,1,3),
(NULL,2,3),
(NULL,3,3),
(NULL,4,3),
(NULL,5,3),
(NULL,6,3);


insert into sensor values 
(null, 'Ativo', 1),
(null ,'Ativo', 2),
(null, 'Manutenção', 3),
(null, 'Inativo', 4),
(null, 'Ativo', 5),
(null, 'Ativo', 6),
(null, 'Ativo', 7),
(null ,'Ativo', 8),
(null, 'Manutenção', 9),
(null, 'Inativo', 10),
(null, 'Ativo', 11),
(null, 'Ativo', 12),
(null, 'Ativo', 13),
(null ,'Ativo', 14),
(null, 'Manutenção', 15),
(null, 'Inativo', 16),
(null, 'Ativo', 17),
(null, 'Ativo', 18);


insert into leitura values 
-- Empresa 1
-- Estufa 1
(1, '22.50', '60.5', '2022-10-10','12:00:00', 1),
(2, '24.15', '55.0', '2022-10-10','13:00:00', 1),
(3, '28.96', '57.2', '2022-10-10','14:00:00', 1),
(4, '21.13', '53.9', '2022-10-10','15:00:00', 1),
(5, '18.50', '54.5', '2022-10-10','16:00:00', 1),
(6, '20.13', '53.5', '2022-10-10','17:00:00', 1),
(7, '22.00', '50.1', '2022-10-10','18:00:00', 1),
(8, '21.19', '47.5', '2022-10-10','19:00:00', 1),
(9, '19.13', '45.5', '2022-10-10','20:00:00', 1),
(10, '21.57', '45.9', '2022-10-10','21:00:00', 1),
(11, '22.03', '46.6', '2022-10-10','22:00:00', 1),
(12, '28.18', '48.0', '2022-10-10','23:00:00', 1),

-- Estufa 2
(13, '22.50', '60.5', '2022-10-10','12:00:00', 2),
(14, '24.15', '55.0', '2022-10-10','13:00:00', 2),
(15, '28.96', '57.2', '2022-10-10','14:00:00', 2),
(16, '21.13', '53.9', '2022-10-10','15:00:00', 2),
(17, '18.50', '54.5', '2022-10-10','16:00:00', 2),
(18, '20.13', '53.5', '2022-10-10','17:00:00', 2),
(19, '22.00', '50.1', '2022-10-10','18:00:00', 2),
(20, '21.19', '47.5', '2022-10-10','19:00:00', 2),
(21, '19.13', '45.5', '2022-10-10','20:00:00', 2),
(22, '21.57', '45.9', '2022-10-10','21:00:00', 2),
(23, '22.03', '46.6', '2022-10-10','22:00:00', 2),
(24, '24.18', '48.0', '2022-10-10','23:00:00', 2),

-- Estufa 3
(25, '22.50', '60.5', '2022-10-10','12:00:00', 3),
(26, '24.15', '55.0', '2022-10-10','13:00:00', 3),
(27, '28.96', '57.2', '2022-10-10','14:00:00', 3),
(28, '21.13', '53.9', '2022-10-10','15:00:00', 3),
(29, '18.50', '54.5', '2022-10-10','16:00:00', 3),
(30, '20.13', '53.5', '2022-10-10','17:00:00', 3),
(31, '22.00', '50.1', '2022-10-10','18:00:00', 3),
(32, '21.19', '47.5', '2022-10-10','19:00:00', 3),
(33, '19.13', '45.5', '2022-10-10','20:00:00', 3),
(34, '21.57', '45.9', '2022-10-10','21:00:00', 3),
(35, '22.03', '46.6', '2022-10-10','22:00:00', 3),
(36, '24.18', '48.0', '2022-10-10','23:00:00', 3);
-- Empresa 2

insert into leitura values (690, '27', '57', '2022-12-06', '16:04:30',1);


delete from Usuario where idUsuario =2;

SELECT * FROM Usuario;
SELECT * FROM Empresa;
SELECT * FROM Sensor;
SELECT * FROM Leitura order by idLeitura desc;
SELECT * FROM Estufa;

INSERT INTO Leitura (temperatura, umidade, dt, HORA, fkSensor) VALUES (20.0, 50.0, CURDATE(), CURTIME(), 1);

select Empresa.idEmpresa, Estufa.numeroEstufa, Estufa.idEstufa, Estufa.fkEmpresa, Sensor.statusSensor, idLeitura, leitura.temperatura,
        leitura.umidade , leitura.dt, leitura.HORA 
        from Empresa join Estufa on fkEmpresa =idEmpresa 
        join Sensor on idEstufa = fkEstufa join Leitura on idSensor = fkSensor where idEmpresa = 1 and numeroEstufa in(1)
        order by HORA desc limit 12;

select * from Leitura join sensor on fkSensor = idSensor join Estufa on idEstufa = fkEstufa join empresa
on idEmpresa = fkEmpresa;

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
