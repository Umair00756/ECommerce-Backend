const axios = require('axios');

async function test() {
    try {
        const url = 'https://unsplash.com/napi/search/photos?query=fashion&page=1&per_page=10';
        console.log(`Fetching ${url}...`);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        console.log('Status:', response.status);
        if (response.data && response.data.results) {
            console.log('Results found:', response.data.results.length);
            console.log('First result ID:', response.data.results[0]?.id);
        } else {
            console.log('No results found or different structure:', Object.keys(response.data));
        }
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
        }
    }
}

test();
