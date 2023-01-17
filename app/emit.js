function sendData(action) { 
    console.log(io)
    if (action == "orderModified"){
        io.emit('orderModified');
    }
  
}

module.exports = {
  sendData,
};