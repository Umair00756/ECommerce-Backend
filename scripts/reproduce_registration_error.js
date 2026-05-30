const axios = require('axios');

async function testRegistration() {
    const url = 'http://localhost:5000/api/auth/register';
    const userData = {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'password123'
    };

    console.log(`Testing registration at ${url}...`);
    try {
        const response = await axios.post(url, userData);
        console.log('Status:', response.status);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
        }
    }
}

testRegistration();
