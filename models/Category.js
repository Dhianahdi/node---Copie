const mongoose = require('mongoose');


// Define the Category schema
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Horror", "Mystery", "Science Fiction", "Fantasy", "Romance", "Adventure", "Thriller", "Drama", "Comedy"],
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports =Category;



