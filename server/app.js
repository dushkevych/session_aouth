const express = require('express')
const app = express()
//const port = 3000

const cors = require("cors");
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"] }) );

//Bodyparser middleware
app.use(express.json());

//Connect to mongo
const dbConnect = require('../server/config/db-connection');
dbConnect()

//routes
app.use('/api/auth', require('./routes/signup'));

// global error handler
app.use(require('./middleware/error-handler'));

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;