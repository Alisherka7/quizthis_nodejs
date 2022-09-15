
if (process.env.NODE_ENV !== 'production') {}
const { response } = require('express');
const express = require('express');
const con = require('./database/db');
const app = express();
const port = process.env.port || 3010;
const db = require('./database/db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');



initializePassport(passport, 
  login => users.find(user => user.login === login)
);



const users = [];
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: false
}))
app.use(express.static(__dirname + '/assets'));
app.use(passport.initialize())
app.use(passport.session())



// get request
app.get('/', (req, res) => {
  res.render('index', {name :"Alisher"} );
});

app.get('/login', (req, res) => {
  res.render('login.ejs')
});

app.get('/register', (req, res) => {
  res.render('register.ejs')
});

app.post('/register', async(req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      login: req.body.login,
      password: hashedPassword
    })
    res.redirect('/login')
  }catch{
    res.redirect('/register')
  }
  console.log(users)
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// // authentication
// app.post('/auth', function (request, response) {
//   let login = request.body.login;
//   let password = request.body.password;

//   if (login && password) {
//     db.query(
//       'select * from users where login = ? and password = ?',
//       [login, password],
//       function (err, res, fields) {
//         if (err) throw err;
//         if (res.length > 0) {
//           let username = res[0].username;
//           let login = res[0].login;
//           let progress = res[0].progress;
//           app.get('/home', function(request, response){
//             let username = res[0].username;
//             let login = res[0].login;
//             let progress = res[0].progress;
//             console.log(username);
//             res.render('home', {username: username});
//           });
//         } else {
//           console.log(login);
//           console.log(typeof password);
//           console.log('check your login or password');
//           response.send('Error login and password');
//         }
//         response.end();
//       }
//     );
//   } else {
//     response.send('Please enter Username and Password');
//     response.end();
//   }
// });

// // move to home page
// const redirectToHome = app.post('/home', function(request, response){
//   let username = res[0].username;
//   let login = res[0].login;
//   let progress = res[0].progress;
//   console.log(username);
//   res.render('home');
// });

// db.query('select * from quiz', function (err, res, fiels) {
//   if (err) throw err;
//   console.log(res);
// });

app.listen(port, () => {
  console.log('Server running');
});
