module.exports = mongoose => {

  const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
  });


    const User = mongoose.model(
      "User",
      userSchema
    );
  
    return User;
  };

