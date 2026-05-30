const sequelize = require('../config/database');
const { Product, Category } = require('../models');

async function check() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const [tables] = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'");
        console.log('Tables in DB:', tables.map(t => t.name).join(', '));

        const categories = await Category.findAll();
        console.log('\n--- Categories ---');
        categories.forEach(c => {
            console.log(`ID: ${c.id}, Name: ${c.name}, Image: ${c.image}`);
        });

        const products = await Product.findAll({ limit: 5 });
        console.log('\n--- Products (First 5) ---');
        products.forEach(p => {
            console.log(`ID: ${p.id}, Name: ${p.name}, Images: ${JSON.stringify(p.images)}`);
        });

        const [baroqueProducts] = await sequelize.query("SELECT count(*) as count FROM Products WHERE images LIKE '%baroque%'");
        console.log('\nProducts with Baroque in images:', baroqueProducts[0].count);

        const [unsplashProducts] = await sequelize.query("SELECT count(*) as count FROM Products WHERE images LIKE '%unsplash%'");
        console.log('Products with Unsplash in images:', unsplashProducts[0].count);

    } catch (error) {
        console.error('Check failed:', error);
    } finally {
        process.exit(0);
    }
}

check();
