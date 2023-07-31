CREATE DATABASE cccat12;

\c cccat12;

-- drop table passenger;
CREATE TABLE IF NOT EXISTS passenger (
	passenger_id uuid primary key,
	name text,
	email text,
	document text
);

-- drop table driver;
CREATE TABLE IF NOT EXISTS driver (
	driver_id uuid primary key,
	name text,
	email text,
	document text,
	car_plate text
);

CREATE TABLE ride {
	
}