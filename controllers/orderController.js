const { validationResult } = require('express-validator');
const { Order, OrderItem, Product } = require('../models');

exports.createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { items, totalAmount, shippingAddress } = req.body;
        const userId = req.user.id; // From auth middleware

        const order = await Order.create({
            userId,
            totalAmount,
            shippingAddress,
        });

        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
            });
        }

        const completedOrder = await Order.findByPk(order.id, {
            include: [{ model: OrderItem, include: [Product] }]
        });

        res.status(201).json(completedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{ model: OrderItem, include: [Product] }],
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
