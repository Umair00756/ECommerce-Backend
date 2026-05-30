const { Product, Category } = require('../models');
const { Op } = require('sequelize');

exports.getProducts = async (req, res) => {
    try {
        const { category, subCategory, minPrice, maxPrice, sortBy, size } = req.query;

        let where = {};

        if (category) {
            where.categoryId = category;
        }

        if (subCategory) {
            where.subCategory = subCategory;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
        }

        if (size) {
            where.sizes = { [Op.like]: `%${size}%` }; // Primitive search in JSON stringified column
        }

        let order = [['createdAt', 'DESC']];
        if (sortBy === 'price-low') {
            order = [['price', 'ASC']];
        } else if (sortBy === 'price-high') {
            order = [['price', 'DESC']];
        }

        const products = await Product.findAll({
            where,
            order,
            include: [{ model: Category }]
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { slug: req.params.slug },
            include: [{ model: Category }]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
