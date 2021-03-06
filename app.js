require('dotenv').config(); // подключает библиотеку dotenv которая парсит .env файл и добавляет значения из него в локальное окружение сервера
const express = require('express');
// const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const loginRouter = require('./routes/loginRouter');
const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
// const { userChecker } = require('./middleware/middleware');

const app = express(); // app - экземпляр сервера
// const PORT = 3000;

// Start server settings
app.set('view engine', 'hbs'); // дает нам право рендерить hbs в res.render()
// End server settings

// Start middleware section
app.use(express.json()); // Распознавание входящего объекта в POST-запросе как объекта JSON
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // чтобы данные из форм корректно обрабатывались
app.use(express.static('public')); // указали public в кач-ве статической директории, т.е. это папка, к которой юзер имеет доступ
app.use(cookieParser()); // этот мидлвер позволяет парсить куки из строки в объект
app.use(
  session({
    store: new FileStore({}), // если не работает попробуй ввести в терминале chmod -R 777 sessions
    secret: process.env.SECRET ?? 'qwerty',
    resave: false,
    // Если false, куки появляются только при установке req.session
    saveUninitialized: false,
    // В продакшне нужно "secure: true" для HTTPS
    cookie: { secure: false }, // HTTPS = false
    name: 'auth',
  }),
);
app.use('/login', loginRouter);

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect('/login');
  }
});
// End middleware section

// app.use(userChecker);
app.use('/', indexRouter);

app.use('/users', usersRouter);
// End routes section

app.listen(process.env.PORT ?? 3001, () => {
  console.log('server started');
});

// если sequelize-cli не видит подключение к ДБ
// export DB_CONNECTION=postgres://fox:123@localhost:5432/foxes
