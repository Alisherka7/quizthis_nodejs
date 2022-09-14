const { response } = require('express');
const express = require('express');
const session = require('express-session');
const con = require('./database/db');
const app = express();
const port = process.env.port || 3010;
const db = require('./database/db');

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');

// get request
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/auth', function (request, response) {
  let login = request.body.login;
  let password = request.body.password;

  if (login && password) {
    db.query(
      'select * from users where login = ? and password = ?',
      [login, password],
      function (err, res, fields) {
        if (err) throw err;
        if (res.length > 0) {
          console.log('Logged in');
          response.render('home');
        } else {
          console.log(login);
          console.log(typeof password);
          console.log('check your login or password');
          response.send('Error login and password');
        }
        response.end();
      }
    );
  } else {
    response.send('Please enter Username and Password');
    response.end();
  }
});

// db.query('select * from quiz', function (err, res, fiels) {
//   if (err) throw err;
//   console.log(res);
// });

app.listen(port, () => {
  console.log('Server running');
});
