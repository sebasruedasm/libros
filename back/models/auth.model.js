import pgService from "../services/pg.service.js";

export const getUsuarioModel = async (email, password) => {
    console.log("Checking user:", email, password); 
    const pg = new pgService();
    return await pg.connection.oneOrNone(
        'SELECT id, email FROM book.users WHERE email = $1 AND password = $2',
        [email, password]
    );
};
