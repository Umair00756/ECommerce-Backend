const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
});

(async () => {
    try {
        const [rows] = await sequelize.query('SELECT name, images FROM Products LIMIT 5');
        console.log('SQLITE PRODUCTS:', rows);
        await sequelize.close();
    } catch (err) {
        console.error('Error:', err.message);
    }
})();
