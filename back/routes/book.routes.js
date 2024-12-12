import { Router } from "express";
import { getAllBooks, getBookById, searchBooksByTitle, createBook, updateBook, deleteBook } from "../controllers/book.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { postBookValidator } from "../validators/book.validator.js";

const routeBook = Router();

routeBook.get('/search', searchBooksByTitle);
routeBook.get('/:id', getBookById);
routeBook.get('/', getAllBooks);
routeBook.post('/', validate(postBookValidator), createBook);
routeBook.put('/:id', validate(postBookValidator), updateBook);
routeBook.delete('/:id', deleteBook);

export default routeBook;
