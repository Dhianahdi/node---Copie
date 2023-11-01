const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  nationality: String,

});



const Author = mongoose.model('Author', authorSchema);

const createAuthor = async (authorData) => {
  try {
    const author = new Author(authorData);
    const savedAuthor = await author.save();
    return savedAuthor;
  } catch (error) {
    throw new Error("Erreur lors de la création du livre.");
  }
};

const getAllAuthors = async () => {
  try {
    const authors = await Author.find();
    return authors;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des livres.');
  }
};

const updateAuthor = async (ISBN, updatedData) => {
  try {
    const updatedAuthor = await Author.findOneAndUpdate({ ISBN }, updatedData, { new: true });
    if (!updatedAuthor) {
      throw new Error('Livre non trouvé.');
    }
    return updatedAuthor;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du livre.');
  }
};

const deleteAuthor = async (ISBN) => {
  try {
    const deletedAuthor = await Author.findOneAndRemove({ ISBN });
    if (!deletedAuthor) {
      throw new Error('Livre non trouvé.');
    }
    return deletedAuthor;
  } catch (error) {
    throw new Error('Erreur lors de la suppression du livre.');
  }
};

module.exports =Author;

