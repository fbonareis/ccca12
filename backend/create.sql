-- DROP DATABASE cccat12;
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

CREATE TABLE IF NOT EXISTS ride (
	ride_id uuid primary key,
	passenger_id uuid,
	driver_id uuid,
	from_lat numeric,
	from_long numeric,
	to_lat numeric,
	to_long numeric,
	status text,
	request_date timestamp,
	accept_date timestamp,
	start_date timestamp,
	end_date timestamp,
	price numeric
);