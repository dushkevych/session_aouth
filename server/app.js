const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path'); 
const cors = require("cors");
const session = require('express-session')
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = require('../server/config/db-connection');

app.use(cors({ 
  origin: ["http://localhost:3001", "http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"] }) 
      );

 //Bodyparser middleware
app.use(express.json());

//Connect to mongo
dbConnect()

//session middleware configuration
const MongoStore = connectMongo(session);

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
    domain: "/localhost:3000",
    maxAge: 1000 * 60 * 60 * 2, //two hours
    sameSite: process.env.NODE_ENV === 'production' ? true : 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : false
    }
  };

app.use(session(sessionOptions));

//Dinamically add routes from routes folder
fs.readdir('server/routes', (err, files) => {
  if (err) {
    throw new Error;
  } else {
    files.forEach(file => {
      if (path.extname(file) == ".js") {
        app.use("/api", require("./routes/" + file))
      }
    });
  }
});

//Global error handler
app.use(require('./middleware/error-handler'));

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;