const mongoose = require('mongoose');

const dbConnect = async function () {
    try {
    await mongoose.connect(//process.env.DB_CONNECTION_URI
        "mongodb+srv://saas_backend_1412:V11S5OY5Kq7w1s9e@cluster0.syqmf.mongodb.net/saas_startup?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
        , {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB Connected…')
    }catch(e) {
        console.log('DB CONNECTION ERROR');
        throw e;
    };
};

module.exports = dbConnect;