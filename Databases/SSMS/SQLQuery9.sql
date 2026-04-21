USE BikeStores;
GO
CREATE TABLE production.trainer(
	trainer_id INT IDENTITY(1,1) PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	phone VARCHAR(20),
	email VARCHAR(255) NOT NULL UNIQUE,
	poke_id INT,
	FOREIGN KEY (poke_id) 
		REFERENCES production.pokemon(pokemon_id)
		ON DELETE CASCADE ON UPDATE CASCADE
);