const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'ftp'
        });

        const [rows] = await conn.execute('SELECT id, images FROM Products');
        const summary = {};
        rows.forEach(r => {
            if (!r.images) return;
            try {
                const imgs = JSON.parse(r.images);
                imgs.forEach(url => {
                    const m = url.match(/https?:\/\/([^\/\s]+)/);
                    const domain = m ? m[1] : 'other';
                    summary[domain] = (summary[domain] || 0) + 1;
                });
            } catch (e) {
                summary['error'] = (summary['error'] || 0) + 1;
            }
        });

        console.log('PRODUCT IMAGE DOMAINS SUMMARY:', summary);
        console.log('TOTAL PRODUCTS:', rows.length);

        const [cats] = await conn.execute('SELECT id, name, slug, image FROM Categories');
        console.log('CATEGORIES SUMMARY:', cats.map(c => ({ id: c.id, slug: c.slug, hasBaroque: c.image && c.image.includes('baroque.pk') })));

        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
})();
