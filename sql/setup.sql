-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run npm run setup-db

DROP TABLE IF EXISTS colors;
DROP TABLE IF EXISTS animals;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS apps;

create table colors (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(25),
	is_my_favorite BOOLEAN
);
insert into colors (name, is_my_favorite) values ('Purple', false);
insert into colors (name, is_my_favorite) values ('Red', false);
insert into colors (name, is_my_favorite) values ('Pink', false);
insert into colors (name, is_my_favorite) values ('Blue', true);
insert into colors (name, is_my_favorite) values ('Orange', false);

create table animals (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	common_name VARCHAR(25),
	num_legs INT
);
insert into animals (common_name, num_legs) values ('Echidna', 4);
insert into animals (common_name, num_legs) values ('Capuchin', 2);
insert into animals (common_name, num_legs) values ('Python', 0);
insert into animals (common_name, num_legs) values ('Fox', 4);
insert into animals (common_name, num_legs) values ('Butterfly', 6);

create table users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(25),
	email VARCHAR(50)
);
insert into users (username, email) values ('tguinan0', 'jlefriec0@feedburner.com');
insert into users (username, email) values ('ctixall1', 'sducker1@nationalgeographic.com');
insert into users (username, email) values ('bvannucci2', 'pdagostini2@smh.com.au');
insert into users (username, email) values ('bandrieu3', 'ajohnsey3@paypal.com');
insert into users (username, email) values ('dedy4', 'ebalcon4@elpais.com');

create table cities (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50),
	address VARCHAR(50)
);
insert into cities (name, address) values ('Sungai', '359 Loomis Junction');
insert into cities (name, address) values ('Ambelókipoi', '0 Merry Street');
insert into cities (name, address) values ('Portland', '19 Harper Plaza');
insert into cities (name, address) values ('Lamakera Dua', '64739 Beilfuss Lane');
insert into cities (name, address) values ('Bojongsarung', '2 Rowland Point');

create table apps (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50),
	version VARCHAR(50)
);
insert into apps (name, version) values ('Span', '3.29');
insert into apps (name, version) values ('Voltsillam', '6.2.9');
insert into apps (name, version) values ('Treeflex', '7.0');
insert into apps (name, version) values ('Hatity', '6.9.0');
insert into apps (name, version) values ('Prodder', '9.4.4');
