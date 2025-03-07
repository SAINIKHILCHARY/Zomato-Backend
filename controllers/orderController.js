import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress, paymentMethod, specialInstructions } = req.body;

    // Validate restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        msg: 'Restaurant not found'
      });
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const order = new Order({
      user: req.user.id,
      restaurant: restaurantId,
      items,
      total,
      deliveryAddress,
      paymentMethod,
      specialInstructions
    });

    await order.save();

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(400).json({
      success: false,
      msg: error.message
    });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('restaurant', 'name');

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      msg: 'Error fetching orders'
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name address')
      .populate('user', 'name phoneNumber');

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: 'Order not found'
      });
    }

    // Check if user is authorized to view this order
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        msg: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      msg: 'Error fetching order'
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: 'Order not found'
      });
    }

    // Validate status transition
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['preparing', 'cancelled'],
      preparing: ['ready', 'cancelled'],
      ready: ['delivered', 'cancelled'],
      delivered: [],
      cancelled: []
    };

    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({
        success: false,
        msg: `Cannot transition from ${order.status} to ${status}`
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(400).json({
      success: false,
      msg: error.message
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        msg: 'Order cannot be cancelled at this stage'
      });
    }

    // Check if user is authorized to cancel this order
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        msg: 'Not authorized to cancel this order'
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      msg: 'Order cancelled successfully',
      order
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      msg: 'Error cancelling order'
    });
  }
};

// Get restaurant orders (for restaurant owners)
export const getRestaurantOrders = async (req, res) => {
  try {
    const { status } = req.query;
    
    // Check if user owns the restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user.id });
    if (!restaurant) {
      return res.status(403).json({
        success: false,
        msg: 'Not authorized to view restaurant orders'
      });
    }

    // Build query
    const query = { restaurant: restaurant._id };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'name phoneNumber')
      .populate('restaurant', 'name');

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get restaurant orders error:', error);
    res.status(500).json({
      success: false,
      msg: 'Error fetching restaurant orders'
    });
  }
};