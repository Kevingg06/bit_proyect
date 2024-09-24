drop database if exists messi;

create database messi;

use messi;

create table users(
    userId varchar(70) not null,
    username varchar(40),
    userPassword varchar(120),
    role varchar(30),
    createdAt date,
    description text,
    titles varchar(255),
    age int(3),
    phoneNumber varchar(30) DEFAULT NULL,
    mail varchar(320),
    subscription boolean,
    address varchar(255),
    primary key (userId)
);


create table posts(
    postId int(30) not null,
    userId varchar(70) not null,
    title varchar(100),
    body text not null,
    createdAt date not null,
    primary key(postId),
    foreign key (userId) references users (userId)
);

create table company(
    companyId varchar(70) not null,
    name varchar(255) not null,
    mail varchar(320),
    description text,
    cuit varchar(25),
    companyPassword varchar(20),
    PRIMARY KEY(companyId)
);

create table noticia(
    id varchar(70) not null,
    companyId varchar(70) not null,
    title varchar(255),
    body text,
    fecha date not null,
    primary key(id),
    foreign key (companyId) references company (companyId)
);

create table jobsHistory(
    userId varchar(70) not null,
    companyId varchar(50) not null,
    jobDescription text not null,
    jobRole varchar(30) not null,
    primary key (userId, companyId),
    FOREIGN KEY (userId) references users (userId),
    foreign key (companyId) references company (companyId)
);




insert into users(userId, username, role, userPassword, createdAt, age, phoneNumber, mail, subscription, address)
values("1", "martuski", "administrador", "pepe", '2024-4-23', 17, 1170809090,"martin.galeanoet32@gmail.com",true ,"aa"),
("2", "mankigamer", "usuario","uh uh ah ah", '2024-4-22',  21, 1170889922,"mankijuega@gmail.com",false,"aaa"),
("3", "señordelanoche", "usuario","vivachavez", '2024-4-22',  90, 5828071954,"chavezvive@gmail.com",false,"aaaaa"),
("4", "mitelbi", "admin","siadiviasestacontraseña", '2024-4-10',  25, 123234545,"holasoymrbeast@gmail.com",true,"a");
