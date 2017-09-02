const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to append to file!');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle : 'Home page!',
    welcomeMessage : 'Welcome to my site'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Unable to fulfill request!'
  });
});

app.listen(3000, () => {
  console.log('Server up and running!');
});
