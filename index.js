const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express(),
    sequelize = new Sequelize('isisvanderplas', 'isisvanderplas', '', { dialect: 'postgres' });

// Our model definition:
var Book = sequelize.define('book', {
    title: Sequelize.STRING,
    imageURL: Sequelize.STRING,
    author: Sequelize.STRING,
    description: Sequelize.TEXT
  });
// ======================
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

var app = express();

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/books');
});

app.get('/books', (request, response) => {
  Book.findAll().then((books) => {
    response.render('books/index', { books: books });
  });
});

app.post('/books', (request, response) => {
  Book.create(request.body).then(() => {
    response.redirect('/books');
  });
});

// app.get('/books', (request, response) => {
//   response.render('books/index');
// });

app.get('/books/new', (request, response) => {
  response.render('books/new');
});

app.get('/books/:id/edit', (request, response) => {
  Book.findById(request.params.id).then((book) => {
    response.render('books/edit', { book: book });
  });
});

sequelize.sync().then(() => {
  console.log('Connected to database');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
