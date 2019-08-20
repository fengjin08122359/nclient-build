const fs = require('fs');

module.exports = function(name) {
  return new Promise ((resolve, reject) => {
    fs.exists(name, exists => {
      if (exists) {
        reject(exists);
      } else {
        resolve();
      }
    });
  });
};