const express = require('express');
const app = express();

require('dotenv').config();

const cors = require("cors");
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"] }) );

 //Bodyparser middleware
app.use(express.json());

//Connect to mongo
const dbConnect = require('../server/config/db-connection');
dbConnect()

//session middleware configuration
const session = require('express-session')

const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(session);

const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const sessionOptions = {
  store: new MongoStore({ mongooseConnection: connection }),
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  rolling: true, // renew cookie maxAge to 24 hours on every new request
  saveUninitialized: false,
  
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, //two hours
    sameSite: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    }
  }

app.use(session(sessionOptions));

//routes
app.use('/api', require('./routes/home'));
app.use('/api', require('./routes/signup'));
app.use('/api', require('./routes/signin'));
app.use('/api', require('./routes/logout'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/users'));


// global error handler
app.use(require('./middleware/error-handler'));

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;