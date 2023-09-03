require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
// const { notFoundStatus } = require('./utils/constants');
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/NotFoundError");
const errorHandler = require("./middlewares/error-handler");

const app = express();

app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mesto");

const { PORT = 3000 } = process.env;

app.use(requestLogger);
app.use(limiter);
app.use("/signup", require("./routes/signup"));
app.use("/signin", require("./routes/signin"));

app.use(auth);
app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use("*", (req, res, next) => {
  next(new NotFoundError({ message: "Такой старницы не существует" }));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
// app.use((error, req, res) => {
//   // если у ошибки нет статуса, выставляем 500
//   const { statusCode = 500, message } = error;
//   res.status(statusCode).send({
//     // проверяем статус и выставляем сообщение в зависимости от него
//     message: statusCode === 500 ? "На сервере произошла ошибка" : message,
//   });
// });

app.listen(PORT);
