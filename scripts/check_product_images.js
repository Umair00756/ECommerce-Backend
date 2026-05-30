const sequelize = require('../config/database');
const { Product } = require('../models');

async function check() {
    try {
        const p = await Product.findOne();
        if (p) {
            console.log('Product Name:', p.name);
            console.log('Raw images in DB:', p.getDataValue('images'));
            console.log('Parsed images via getter:', p.images);
        } else {
            console.log('No products found.');
        }
    } catch (error) {
        console.error('Check failed:', error);
    } finally {
        process.exit(0);
    }
}

check();
