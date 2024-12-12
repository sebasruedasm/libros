

-- Crear un nuevo squema dentro de la base de datos Postgres

create schema book;


-- Tabla de usuarios

create table book.users(
    id serial,
    email varchar,
    password varchar,
    CONSTRAINT PK_USER PRIMARY KEY (id)
)


-- Tabla de Libros

CREATE TABLE book.LIBRO (
	ID_LIBRO SERIAL,
	TITULO VARCHAR(100),
	AUTOR VARCHAR(50),
	ANYO VARCHAR(4),
	CIUDAD VARCHAR(20),
	EDITORIAL VARCHAR(100),
    IMAGES varchar,
	CONSTRAINT PK_LIBRO PRIMARY KEY (ID_LIBRO)
);

-- Insertar datos a la tabla de usuario:
INSERT INTO book.users (email, password) VALUES ('sebastian@gmail.com', '12345');



-- Insertar datos a la tabla de productos:

INSERT INTO book.LIBRO (TITULO, AUTOR, ANYO, CIUDAD, EDITORIAL,IMAGES )
VALUES('The Game', 'Terry Schott', '2012', 'Francia', 'CreateSpace Independent Publishing Platform', 'https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_54.zip&file=0012547191-L.jpg'),
('Quieting Your Heart', 'Darlene Schacht', '2016', 'BERLIN', 'Time-Warp Wife Ministries', 'https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_54.zip&file=0012547192-L.jpg'),
('LA HOJARASCA', 'GABRIEL GARCIA MARQUEZ', '1955', 'COLOMBIA', 'LIBRERIA NACIONAL','https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_54.zip&file=0012547199-L.jpg')
