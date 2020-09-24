const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const dbConnect = require('../server/config/db-connection');
const userRoutes = require('./routes/users');
const loginRoute = require('./routes/login')

//DB Config

dbConnect()

//routes
app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.use('/', userRoutes, loginRoute);

// catch error and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
// return json with error info
  res.status(error.status || 500);
  res.json({
    error: {
      message : error.message
    }
  });
});

module.exports = app;

app.listen(port, () => console.log(`App listening on port ${port}!`))