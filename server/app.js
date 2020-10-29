const express = require('express');
const session = require('express-session')
const app = express();

require('dotenv').config();

const cors = require("cors");
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"] }) );

const TWO_HOURS = 1000 * 60 * 60 * 2;
 //Bodyparser middleware
app.use(express.json());

app.use( session({
  name: process.env.SESSION_NAME,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,

  cookie: { maxAge: TWO_HOURS,
  sameSite: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
 }
}));

//Connect to mongo
const dbConnect = require('../server/config/db-connection');
dbConnect();

//routes
app.use('/api', require('./routes/signup'));
app.use('/api', require('./routes/signin'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/logout'));

// global error handler
app.use(require('./middleware/error-handler'));

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;