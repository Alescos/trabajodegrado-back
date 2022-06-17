CREATE TABLE Users (
    id SERIAL UNIQUE PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    password VARCHAR(100) NOT NULL,
    organization_id integer REFERENCES Organizations (id),
    createdAt DATE,
    updatedAt DATE,
    deletedAt DATE
    );

CREATE TABLE Organizations(
    id SERIAL UNIQUE PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    nit numeric UNIQUE NOT NULL,
    description VARCHAR(500),
    createdAt DATE,
    updatedAt DATE,
    deletedAt DATE
);

CREATE TABLE Areas(
    id SERIAL UNIQUE PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    phone VARCHAR(50),
    organization INT,
    createdAt DATE,
    updatedAt DATE,
    deletedAt DATE,
    CONSTRAINT organization
        FOREIGN KEY(id)
        REFERENCES Organizations(id)
);

INSERT INTO Organizations(name,NIT,description)
VALUES('Organizacion de prueba',1234567,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged');


INSERT INTO Areas(name,description,phone,organization)
VALUES('Area de prueba','adadlladiawa,asda d','325189048',1);
