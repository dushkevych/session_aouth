const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        
    await mongoose.connect(process.env.DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    console.log('MongoDB Connected…')
    }catch(err) {
        console.log('DB CONNECTION ERROR');
        throw err;
    };
};

module.exports = dbConnect