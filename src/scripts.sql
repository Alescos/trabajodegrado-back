CREATE TABLE Users (
    id SERIAL UNIQUE PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE,
    deletedAt DATE
    );

insert into users values
    ('admin','admin'),
    ('user','user123');