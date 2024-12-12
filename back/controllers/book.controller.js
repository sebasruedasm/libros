import { 
    getAllBooksModel, 
    getBookByIdModel, 
    searchBooksByTitleModel, 
    createBookModel, 
    updateBookModel, 
    deleteBookModel 
} from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await getAllBooksModel();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve books." });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await getBookByIdModel(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: "Book not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve book." });
    }
};

export const searchBooksByTitle = async (req, res) => {
    
    try {
        const { title } = req.query;
        const books = await searchBooksByTitleModel(title);
        console.log("fui a buscar")
        console.log(books)
        if (books.length > 0) {
            res.status(200).json({
                message: "Books found!",
                books: books
            });
        } else {
            res.status(200).json({ 
                message: "No hay libros para el criterio de busqueda.",
                books: books
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to search books." });
    }
};

export const createBook = async (req, res) => {
    try {
        const book = await createBookModel(req.body);
        res.status(201).json({
            message: "Book created successfully",
            book
        });
} catch (error) {
        res.status(500).json({ error: "Failed to create book." });
    }
};

export const updateBook = async (req, res) => {
    try {
        await updateBookModel(req.params.id, req.body);
        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update book." });
    }
};

export const deleteBook = async (req, res) => {
    try {
        await deleteBookModel(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book." });
    }
};
