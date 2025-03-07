import Restaurant from '../models/Restaurant.js';

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const addRestaurant = async (req, res) => {
  const { name, address, cuisine, menu } = req.body;
  try {
    const restaurant = new Restaurant({ name, address, cuisine, menu });
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};