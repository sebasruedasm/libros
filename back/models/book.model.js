import pgService from "../services/pg.service.js";

export const getAllBooksModel = async () => {
    const pg = new pgService();
    return await pg.connection.any('SELECT * FROM book.libro');
};

export const getBookByIdModel = async (id) => {
    const pg = new pgService();
    return await pg.connection.oneOrNone('SELECT * FROM book.libro WHERE id_libro = $1', [id]);
};

export const searchBooksByTitleModel = async (title) => {
    const pg = new pgService();
    const rows = await pg.connection.any('SELECT * FROM book.libro WHERE titulo ILIKE $1', [`%${title}%`]);
    return rows;
};

export const createBookModel = async (book) => {
    const pg = new pgService();
    const { titulo, autor, anyo, ciudad, editorial, images } = book;
    return await pg.connection.one(
        `INSERT INTO book.libro (titulo, autor, anyo, ciudad, editorial, images) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [titulo, autor, anyo, ciudad, editorial, images]
    );
};

export const updateBookModel = async (id, book) => {
    const pg = new pgService();
    const { titulo, autor, anyo, ciudad, editorial, images } = book;
    return await pg.connection.none(
        `UPDATE book.libro 
        SET titulo = $1, autor = $2, anyo = $3, ciudad = $4, editorial = $5, images = $6 
        WHERE id_libro = $7`,
        [titulo, autor, anyo, ciudad, editorial, images, id]
    );
};

export const deleteBookModel = async (id) => {
    const pg = new pgService();
    return await pg.connection.none('DELETE FROM book.libro WHERE id_libro = $1', [id]);
};
