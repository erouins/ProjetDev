const io = require('../nodeserver');

function sendData(action) {
    console.log("in emit")
    if (action == "orderModified"){
        io.emit('orderModified');
    }
  
}

module.exports = {
  sendData,
};