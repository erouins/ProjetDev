module.exports = mongoose => {

    const restaurantSchema = new mongoose.Schema({
      name: String,
      owner: String,
      menu: Array
    });
  
  
      const Restaurant = mongoose.model(
        "Restaurant",
        restaurantSchema
      );
    
      return Restaurant;
    };