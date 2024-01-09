require('dotenv').config();
const Mongoose = require('mongoose');
Mongoose.set('useCreateIndex', true);

const mongoOptions = {
    poolSize: 2,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 60000,
    tlsInsecure: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    promiseLibrary: require('bluebird')
};

Mongoose.connect(process.env.DB_Connect, mongoOptions);
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => console.log("Database Connection succeeded."));

module.exports.Mongoose = Mongoose;
module.exports.db = db;
