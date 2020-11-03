const express = require('express');
const session = require('express-session')
const app = express();

require('dotenv').config();

const cors = require("cors");
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"] }) );

 //Bodyparser middleware
app.use(express.json());

const mongoose = require('mongoose');

//Connect to mongo
const dbConnect = require('../server/config/db-connection');
dbConnect.dbConnect()


const connectMongo = require('connect-mongo');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const MongoStore = connectMongo(session);

mongoose.connection = mongoose.createConnection(process.env.DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

app.use( session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  // Forces the session to be saved back to the session store, even if the session was never modified during the request.
  resave: false,
  rolling: true, // renew cookie maxAge to 24 hours on every new request
  saveUninitialized: false,
  
  cookie: 
    { maxAge: TWO_HOURS,
  sameSite: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
    }
  })
);

//routes
app.get('/api/home', (req, res) => {
  res.json({ message: "You are on a home page, please sign in or sign up"})
});

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