function sendData(action) { 
    console.log("socket emit ", action)
    io.emit(action);
}

module.exports = {
  sendData,
};