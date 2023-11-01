const mongoose = require('mongoose');
const author = require("./Author");
const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Référence au modèle 'Author'
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Référence au modèle 'Category'
  },
  publicationYear: Number,
  ISBN: {
    type: String,
    unique: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

const createBook = async (bookData) => {
  try {
    const book = new Book(bookData);
    const savedBook = await book.save();
    return savedBook;
  } catch (error) {
    throw new Error("Erreur lors de la création du livre.");
  }
};

const getAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des livres.');
  }
};

const updateBook = async (ISBN, updatedData) => {
  try {
    const updatedBook = await Book.findOneAndUpdate({ ISBN }, updatedData, { new: true });
    if (!updatedBook) {
      throw new Error('Livre non trouvé.');
    }
    return updatedBook;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du livre.');
  }
};

const deleteBook = async (ISBN) => {
  try {
    const deletedBook = await Book.findOneAndRemove({ ISBN });
    if (!deletedBook) {
      throw new Error('Livre non trouvé.');
    }
    return deletedBook;
  } catch (error) {
    throw new Error('Erreur lors de la suppression du livre.');
  }
};


