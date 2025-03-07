import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 0 },
  menu: [{ 
    name: String, 
    price: Number, 
    description: String 
  }],
});

export default mongoose.model('Restaurant', restaurantSchema);