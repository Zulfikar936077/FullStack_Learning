USE BikeStores;
GO
CREATE TABLE production.pokemon (
	pokemon_id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(20),
	email VARCHAR(255),
);
GO