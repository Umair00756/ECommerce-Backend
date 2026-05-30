const axios = require('axios');

async function testCategories() {
    const url = 'http://localhost:5000/api/categories';
    console.log(`Fetching categories from ${url}...`);
    try {
        const response = await axios.get(url);
        console.log('Status:', response.status);
        console.log('Categories count:', response.data.length);
        if (response.data.length > 0) {
            console.log('First category:', response.data[0].name);
        } else {
            console.log('No categories found!');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testCategories();
