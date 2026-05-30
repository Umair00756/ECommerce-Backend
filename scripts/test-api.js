const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const runTests = async () => {
    try {
        console.log('--- Starting API Tests ---');

        // 1. Get Categories
        const categories = await axios.get(`${API_URL}/categories`);
        console.log('GET /categories: SUCCESS', categories.data.length, 'categories found');

        // 2. Get Products
        const products = await axios.get(`${API_URL}/products`);
        console.log('GET /products: SUCCESS', products.data.length, 'products found');

        // 3. Register User
        const register = await axios.post(`${API_URL}/auth/register`, {
            firstName: 'Test',
            lastName: 'User',
            email: `test${Date.now()}@example.com`,
            password: 'password123'
        });
        console.log('POST /auth/register: SUCCESS');
        const token = register.data.token;

        // 4. Login User
        const login = await axios.post(`${API_URL}/auth/login`, {
            email: register.data.user.email,
            password: 'password123'
        });
        console.log('POST /auth/login: SUCCESS');

        // 5. Create Order
        const order = await axios.post(`${API_URL}/orders`, {
            items: [
                { productId: products.data[0].id, quantity: 1, price: products.data[0].price, size: 'M' }
            ],
            totalAmount: products.data[0].price,
            shippingAddress: '123 Test St, Test City'
        }, {
            headers: { 'x-auth-token': token }
        });
        console.log('POST /orders: SUCCESS');

        // 6. Get User Orders
        const orders = await axios.get(`${API_URL}/orders`, {
            headers: { 'x-auth-token': token }
        });
        console.log('GET /orders: SUCCESS', orders.data.length, 'orders found');

        console.log('--- All Tests Passed! ---');
        process.exit(0);
    } catch (error) {
        console.error('--- Test Failed! ---');
        console.error(error.response ? error.response.data : error.message);
        process.exit(1);
    }
};

runTests();
