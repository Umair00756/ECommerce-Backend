const axios = require('axios');

async function test() {
    const id = '_a_FlMKo4Lk'; // Example ID from previous test
    const url = `https://images.unsplash.com/photo-${id}?q=80&w=1000&auto=format&fit=crop`;
    console.log(`Testing URL: ${url}`);
    
    try {
        const response = await axios.head(url);
        console.log('Status:', response.status);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
        }
    }
}

test();
