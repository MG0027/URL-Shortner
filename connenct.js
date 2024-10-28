const mongoose = require('mongoose');

async function connectmongoo(url) {
  return mongoose.connect(url);
}

module.exports = {connectmongoo};