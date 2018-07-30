// Bring Mongoose into the app
const mongoose = require('mongoose');
const fs = require('fs');
const { MONGODB_URI } = require('../config');
if (!MONGODB_URI) {
  throw new Error('No MongoDB URI provided, please add the env variable MONGODB_URI');
}

const dbURI = `mongodb://${MONGODB_URI}`;

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.info(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Read all schemas and load them to Mongoose
const allowedFiles = /^(?!index\.js)|.*\.js$/;
fs.readdirSync(__dirname).forEach(function (file) {
  if (!allowedFiles.test(file)) {
    return null;
  }
  require(`${__dirname}/${file}`);
});
