CREATE TABLE Users (
    id SERIAL UNIQUE PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    password VARCHAR(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE,
    deletedAt DATE
    );

