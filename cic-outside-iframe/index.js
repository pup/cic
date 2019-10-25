let Connection = require('./Connection.js');

module.exports = {
  createConnection(iframeWindow) {
    return new Connection(iframeWindow);
  }
}
