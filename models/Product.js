'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
            Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
        }
    }
    Product.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        subCategory: {
            type: DataTypes.STRING,
        },
        images: {
            type: DataTypes.TEXT,
            get() {
                const value = this.getDataValue('images');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue('images', JSON.stringify(value));
            }
        },
        sizes: {
            type: DataTypes.TEXT,
            get() {
                const value = this.getDataValue('sizes');
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue('sizes', JSON.stringify(value));
            }
        },
        inStock: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
