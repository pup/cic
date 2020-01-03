import "es5-polyfill";

let Connection = require('./Connection.js');

module.exports = {
  createConnection() {
    return new Connection();
  }
}
