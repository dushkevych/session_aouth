const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const dbConnect = require('../server/config/db-connection');

const userRoutes = require('./routes/users');
const loginRoute = require('./routes/login')

//DB Config
dbConnect()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//routes
// app.use('/', express.static('./dist', {
//   index: "index.html"
// }))
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/', userRoutes, loginRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`));

// catch error and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(error);
});

// error handler
app.use((err, req, res, next) => {
// return json with error info
  res.status(err.status || 500);
  res.json({
    error: {
      message : err.message
    }
  });
});

module.exports = app;