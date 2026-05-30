const sequelize = require('../config/database');
const { Category, Product } = require('../models');
require('dotenv').config();

const categoriesData = [
    { id: 'unstitched', name: 'Unstitched', image: 'https://baroque.pk/cdn/shop/files/MAin_BAnner50.jpg?v=1771057778&width=1400' },
    { id: 'ready-to-wear', name: 'Ready to Wear', image: 'https://baroque.pk/cdn/shop/files/MAin_BAnner49_d4f8ebd5-e21f-42cb-88c9-22824224964c.jpg?v=1770904583&width=1400' },
    { id: 'chantelle', name: 'Chantelle', image: 'https://baroque.pk/cdn/shop/files/MAin_BAnner48_f69b241c-a81c-4e55-89bf-63d88b9a128d.jpg?v=1770893859&width=1400' },
    { id: 'bottoms', name: 'Bottoms', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1500&auto=format&fit=crop' },
    { id: 'dupatta', name: 'Dupattas', image: 'https://images.unsplash.com/photo-1610413344654-e91b6194b63e?q=80&w=1000&auto=format&fit=crop' }
];

const masterImageIds = [

    '1581591524425-c7e0978865fc', '1572429735150-f89bcd98801d', '1528459801456-ebfa4e5541e2', '1528459105426-b9548367069b',
    '1524234107056-1c1f48f64ab8', '1618220179428-22790b461013', '1550418482-44df3c512e03', '1558231018-00040ee462bb',
    '1606136968306-ab2fe6e81f02', '1605652599691-1b1574763321', '1601934520912-706346747ed3', '1601933543110-3949806e22f2',
    '1590736912318-ab19b4b03945', '1598418037146-2495b6c3f683', '1578301978018-3005759f48f3', '1578632292335-df3abbb0d586',
    '1551232864-3f0890e580d9', '1551232863-71f654060803', '1516762689617-e1cff94b101e', '1517551069398-e59873fc3436',
    '1504198453319-5ce911baf5ea', '1504509544547-1ba9b4aaefd1', '1490481651871-ab68de25d43d', '1492707892479-7bc8d5a4ee9d',
    '1483985988355-763728e1935b', '1445205170230-053b83016050', '1441986300917-64674bd600d8', '1469334031218-e382a71b716b',
    '1496747611176-843222e1e57c', '1434389677669-e08b4cac3105', '1620799140408-edc6dcb6d633', '1570141695589-383742f1f008',
    '1556905055-8f358a7a4bb2', '1539109136881-3be0616acf4b', '1485230895311-6cd6d2267865', '1445205130240-023b83016020',
    '1618220179421-22790b461011', '1550418485-44df3c512e01', '1558231012-00040ee462b2', '1554412930-c74719c8406b',

    '1594223274512-ad4803739b7c', '1496171367470-9ed9a91ea931', '1564859228273-274232fdb516', '1564859227346-4e6a490ca962',
    '1581091870622-0402e1069cd2', '1581091870598-319ce928d360', '1558769132-cb1aea458c5e', '1534030347209-467a5b0ad3e6',
    '1552374196-1ab2a1c593e8', '1479064566237-6b700b93a3ad', '1488161628813-fd4411162295', '1495121605193-b116b5b9c5fe',
    '1506152983158-b4a74a01c721', '1523381235312-3f113d27bc8f', '1505022610485-0249ba5b3675', '1491336477066-31156b5e4f35',
    '1525498128493-380d1990a112', '1494790108377-be9c29b29330', '1546733227-68a3f1442081', '1556950290-c17244b99001',
    '1532453288672-3a27e9be4efd', '1503342217505-b0a15ec3261c', '1520006403991-3c9f3e0a7bd1', '1520006698608-a1529141f6f1',
    '1543087903-1ac2ec7aa8c5', '1515372039744-b8f02a3ae446', '1540575861541-91c09c377397', '1532453241-1f9095064568',
    '1566206091558-7f218b696731', '1569410651474-06d99a36526e', '1556740758-90eb39f31050', '1581333100576-b73bbe19e19a',
    '1556905155-8f358a7a4bb2', '1485230815311-6cd6d2267865', '1445205110240-023b83016020', '1618220119421-22790b461011',
    '1550418415-44df3c512e01', '1558231112-00040ee462b2', '1606136161306-ab2fe6e81f01', '1605652119691-1b1574763322',

    '1601054704854-1a2e79dac4d3', '1542272604-787c3835535d', '1591195853828-11db59a44f6b', '1473966968600-fa801b869a1a',
    '1489987707025-afc232f7ea0f', '1523359346063-d879414d0ad3', '1523359346064-d879414d0ad4', '1601934520911-706346747ed2',
    '1601933543111-3949806e22f1', '1590736912311-ab19b4b03941', '1598418037141-2495b6c3f681', '1578301978011-3005759f48f1',
    '1578632292331-df3abbb0d581', '1551232861-3f0890e580d1', '1551232861-71f654060801', '1516762681617-e1cff94b1011',
    '1517551061398-e59873fc3431', '1504198451319-5ce911baf5e1', '1504509541547-1ba9b4aaefd1', '1492707891479-7bc8d5a4ee91',

    '1483985981355-763728e19351', '1445205110230-053b83016051', '1469334011218-e382a71b7161', '1434389617669-e08b4cac3101',
    '1620799110408-edc6dcb6d631', '1570141615589-383742f1f001', '1556905015-8f358a7a4bb1', '1532453218672-3a27e9be4ef1',
    '1503342211505-b0a15ec32611', '1520006413991-3c990e1a7bd1',

    '1496171317470-9ed9a91ea931', '1469334111218-e382a71b7161', '1490481611871-ab68de25d431', '1539109116881-3be0616acf41',
    '1485230815905-ec40ba36b9b1', '1445205110230-053b83016052', '1441986310917-64674bd300d1', '1564859218273-274232fdb512',
    '1564859217346-4e6a490ca963', '1581091817062-0402e1069cd2'
];

function getImageUrl(index) {
    return `https://images.unsplash.com/photo-${masterImageIds[index]}?q=80&w=1000&auto=format&fit=crop`;
}

const productsData = [
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `us-${i + 1}`,
        name: `Unstitched Embroidered ${i + 1}`,
        price: 4500 + (i * 100),
        categoryId: 'unstitched',
        subCategory: i < 7 ? 'Summer Lawns' : i < 14 ? 'Chiffon' : 'Winter Collection',
        images: [getImageUrl(i * 2), getImageUrl(i * 2 + 1)],
        sizes: ['Unstitched'],
        inStock: true,
        slug: `unstitched-embroidered-${i + 1}`
    })),

    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `rtw-${i + 1}`,
        name: `Ready to Wear ${i + 1}`,
        price: 8500 + (i * 150),
        categoryId: 'ready-to-wear',
        subCategory: i < 7 ? 'Solid' : i < 14 ? 'Printed' : 'Embroidered',
        images: [getImageUrl(40 + i * 2), getImageUrl(41 + i * 2)],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        inStock: true,
        slug: `ready-to-wear-${i + 1}`
    })),

    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `ch-${i + 1}`,
        name: `Chantelle Exclusive ${i + 1}`,
        price: 15000 + (i * 500),
        categoryId: 'chantelle',
        subCategory: i < 5 ? 'Wedding' : 'Party Wear',
        images: [getImageUrl(80 + i * 2), getImageUrl(81 + i * 2)],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        slug: `chantelle-exclusive-${i + 1}`
    })),

    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `bt-${i + 1}`,
        name: `Classic Bottom ${i + 1}`,
        price: 1500 + (i * 50),
        categoryId: 'bottoms',
        subCategory: i < 3 ? 'Trousers' : 'Shalwar',
        images: [getImageUrl(100 + i * 2), getImageUrl(101 + i * 2)],
        sizes: ['S', 'M', 'L'],
        inStock: true,
        slug: `classic-bottom-${i + 1}`
    })),

    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `dp-${i + 1}`,
        name: `Luxury Dupatta ${i + 1}`,
        price: 2500 + (i * 100),
        categoryId: 'dupatta',
        subCategory: i < 3 ? 'Chiffon' : 'Organza',
        images: [getImageUrl(110 + i * 2), getImageUrl(111 + i * 2)],
        sizes: ['Standard'],
        inStock: true,
        slug: `luxury-dupatta-${i + 1}`
    }))
];

const seed = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        const allImageUrls = productsData.flatMap(p => p.images);
        const uniqueUrls = new Set(allImageUrls);
        if (uniqueUrls.size !== allImageUrls.length) {
            const duplicates = allImageUrls.filter((item, index) => allImageUrls.indexOf(item) !== index);
            console.error('Validation Error: Duplicate image URLs found:', [...new Set(duplicates)]);
            process.exit(1);
        }
        console.log(`Validation passed: All ${allImageUrls.length} image URLs are unique.`);

        await Category.destroy({ where: {}, truncate: false });
        await Product.destroy({ where: {}, truncate: false });
        console.log('Existing categories and products cleared');

        for (const cat of categoriesData) {
            await Category.create({
                id: cat.id,
                name: cat.name,
                slug: cat.id,
                image: cat.image
            });
        }
        console.log('Categories seeded');

        for (const prod of productsData) {
            await Product.create(prod);
        }
        console.log('Products seeded');

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
