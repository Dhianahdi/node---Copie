const express = require('express');
const router = express.Router();
const bookModel = require('../models/Book'); 
const Book = require('../models/Book');

router.post('/books', async (req, res) => {
  try {
    const bookData = req.body;
    const createdBook = await bookModel.createBook(bookData);
    res.json(createdBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author') // Populate the 'author' field
      .populate('Category'); // Populate the 'Category' field

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/books', async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/books/:isbn', async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    const updatedData = req.body;
    const updatedBook = await bookModel.updateBook(ISBN, updatedData);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/books/:isbn', async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    const deletedBook = await bookModel.deleteBook(ISBN);
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
