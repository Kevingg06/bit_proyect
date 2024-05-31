drop database if exists messi;

create database messi;

use messi;

create table users(
    userId varchar(70) not null,
    username varchar(40) not null,
    role varchar(30) not null,
    createdAt date not null,
    contactsNumber int(30) not null,
    age int(3) not null,
    phoneNumber varchar(30) not null,
    mail varchar(320) not null,
    subscription boolean not null,
    primary key (userId)
);

create table contact(
    contactId varchar(70) not null,
    user1Id varchar(70) not null,
    user2Id varchar(70) not null,
    primary key(contactId),
    foreign key (user1Id) references users (userId),
    foreign key (user2Id) references users (userId)
);

create table education(
    name varchar(70) not null,
    description text not null,
    speciality text not null,
    primary key (name)
);

create table chat(
    chatId int(30) not null,
    messageDate date not null,
    content text not null,
    emisor varchar(70) not null,
    receptor varchar(70) not null,
    primary key(chatId),
    FOREIGN KEY (emisor) references users (userId),
    FOREIGN KEY (receptor) references users (userId)
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
    name varchar(50) not null,
    description text not null,
    primary key(name)
);

create table jobsHistory(
    userId varchar(70) not null,
    companyName varchar(50) not null,
    jobDescription text not null,
    jobRole varchar(30) not null,
    primary key (userId, companyName),
    FOREIGN KEY (userId) references users (userId),
    foreign key (companyName) references company (name)
);


create table users_education(
    id varchar(70) not null,
    userId varchar(70) not null,
    educationName varchar(70) not null,
    description text not null,
    primary key (id),
    foreign key (userId) references users (userId),
    foreign key (educationName) references education (name)
);

insert into users(userId, username,role,createdAt, contactsNumber,age,phoneNumber,mail,subscription)
values("1", "martuski", "administrador", 2024-4-23, 2, 17, 1170809090,"martin.galeanoet32@gmail.com",true),
("2", "mankigamer", "usuario", 2024-4-22,3,  21, 1170889922,"mankijuega@gmail.com",false),
("3", "señordelanoche", "usuario", 2024-4-22,1,  90, 5828071954,"chavezvive@gmail.com",false),
("4", "mitelbi", "admin", 2024-4-10,200,  25, 123234545,"holasoymrbeast@gmail.com",true);
