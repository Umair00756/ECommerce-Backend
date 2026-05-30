const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('./authMiddleware');

const { check, validationResult } = require('express-validator');

router.post('/', [
    auth,
    check('items', 'Items are required and must be an array').isArray({ min: 1 }),
    check('totalAmount', 'Total amount is required and must be numeric').isNumeric(),
    check('shippingAddress', 'Shipping address is required').not().isEmpty()
], orderController.createOrder);
router.get('/', auth, orderController.getUserOrders);

module.exports = router;
