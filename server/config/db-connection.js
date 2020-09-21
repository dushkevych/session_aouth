const mongoose = require('mongoose');

async function dbConnect() {
    try {
    await mongoose.connect(process.env.DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB Connected…')
    }catch(e) {
        console.log('DB CONNECTION ERROR');
        throw e;
    }
}

module.exports.default = dbConnect;