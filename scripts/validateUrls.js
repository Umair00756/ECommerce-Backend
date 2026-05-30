const axios = require('axios');

const masterImageIds = [
    // Unstitched (40 ids for 20 products)
    'photo-1581591524425-c7e0978865fc', 'photo-1572429735150-f89bcd98801d', 'photo-1528459801456-ebfa4e5541e2', 'photo-1528459105426-b9548367069b',
    'photo-1524234107056-1c1f48f64ab8', 'photo-1618220179428-22790b461013', 'photo-1550418482-44df3c512e03', 'photo-1558231018-00040ee462bb',
    'photo-1606136968306-ab2fe6e81f02', 'photo-1605652599691-1b1574763321', 'photo-1601934520912-706346747ed3', 'photo-1620799140408-edc6dcb6d633',
    'photo-1590736912318-ab19b4b03945', 'photo-1598418037146-2495b6c3f683', 'photo-1578301978018-3005759f48f3', 'photo-1578632292335-df3abbb0d586',
    'photo-1551232864-3f0890e580d9', 'photo-1551232863-71f654060803', 'photo-1516762689617-e1cff94b101e', 'photo-1517551069398-e59873fc3436',
    'photo-1504198453319-5ce911baf5ea', 'photo-1504509544547-1ba9b4aaefd1', 'photo-1490481651871-ab68de25d43d', 'photo-1492707892479-7bc8d5a4ee9d',
    'photo-1483985988355-763728e1935b', 'photo-1445205170230-053b83016050', 'photo-1441986300917-64674bd600d8', 'photo-1469334031218-e382a71b716b',
    'photo-1496747611176-843222e1e57c', 'photo-1434389677669-e08b4cac3105', 'photo-1570141695589-383742f1f008', 'photo-1556905055-8f358a7a4bb2',
    'photo-1539109136881-3be0616acf4b', 'photo-1485230895905-ec40ba36b9bc', 'photo-1509631179647-0177331693ae', 'photo-1515886657613-9f3515b0c78f',
    'photo-1554412930-c74719c8406b', 'photo-1512436991641-6745cdb1723f', 'photo-1525507119028-ed3c3c97f252', 'photo-1564859228273-274232fdb516',
    // Ready to Wear (40 ids for 20 products)
    'photo-1594223274512-ad4803739b7c', 'photo-1496171367470-9ed9a91ea931', 'photo-1581091870622-0402e1069cd2', 'photo-1558769132-cb1aea458c5e',
    'photo-1552374196-1ab2a1c593e8', 'photo-1488161628813-fd4411162295', 'photo-1506152983158-b4a74a01c721', 'photo-1505022610485-0249ba5b3675',
    'photo-1525498128493-380d1990a112', 'photo-1546733227-68a3f1442081', 'photo-1532453288672-3a27e9be4efd', 'photo-1520006403991-3c9f3e0a7bd1',
    'photo-1543087903-1ac2ec7aa8c5', 'photo-1540575861541-91c09c377397', 'photo-1566206091558-7f218b696731', 'photo-1556740758-90eb39f31050',
    'photo-1532453218-1f9095064568', 'photo-1475178626620-a4d074967452', 'photo-1515372039744-b8f02a3ae446', 'photo-1496981292728-4446369f6970',
    'photo-1503342217505-b0a15ec3261c', 'photo-1503341403567-5a03e4244aa8', 'photo-1524380365203-057d39a3f3f5', 'photo-1612817288484-6f916006741a',
    'photo-1495385794356-15337c99908a', 'photo-1576566580447-66a908851410', 'photo-1515886657613-9f3515b0c78f', 'photo-1554412930-c74719c8406b',
    'photo-1512436991641-6745cdb1723f', 'photo-1525507119028-ed3c3c97f252', 'photo-1539109136881-3be0616acf4b', 'photo-1485230895905-ec40ba36b9bc',
    'photo-1509631179647-0177331693ae', 'photo-1515886657613-9f3515b0c78f', 'photo-1554412930-c74719c8406b', 'photo-1512436991641-6745cdb1723f',
    'photo-1525507119028-ed3c3c97f252', 'photo-1539109136881-3be0616acf4b', 'photo-1485230895905-ec40ba36b9bc', 'photo-1509631179647-0177331693ae',
    // Chantelle (20 ids for 10 products)
    'photo-1601054704854-1a2e79dac4d3', 'photo-1542272604-787c3835535d', 'photo-1591195853828-11db59a44f6b', 'photo-1473966968600-fa801b869a1a',
    'photo-1489987707025-afc232f7ea0f', 'photo-1523359346063-d879414d0ad3', 'photo-1523359346064-d879414d0ad4', 'photo-1504198451319-5ce911baf5e1',
    'photo-1504509541547-1ba9b4aaefd1', 'photo-1492707892479-7bc8d5a4ee9d', 'photo-1483985988355-763728e1935b', 'photo-1445205170230-053b83016050',
    'photo-1441986300917-64674bd600d8', 'photo-1469334031218-e382a71b716b', 'photo-1496747611176-843222e1e57c', 'photo-1434389677669-e08b4cac3105',
    'photo-1570141695589-383742f1f008', 'photo-1556905055-8f358a7a4bb2', 'photo-1539109136881-3be0616acf4b', 'photo-1485230895905-ec40ba36b9bc',
    // Bottoms (10 ids for 5 products)
    'photo-1541099649105-f69ad21f3246', 'photo-1594633312681-425c7b97ccd1', 'photo-1582562124811-c09040d0a901', 'photo-1604176354204-926873ff3d11',
    'photo-1542272230-7f362122c6a5', 'photo-1551028150-64b9f398f678', 'photo-1584305116359-54140501f1ae', 'photo-1591195853828-11db59a44f6b',
    'photo-1473966968600-fa801b869a1a', 'photo-1515886657613-9f3515b0c78f',
    // Dupattas (10 ids for 5 products)
    'photo-1610413344654-e91b6194b63e', 'photo-1475178626620-a4d074967452', 'photo-1551488831-00ddcb6c6bd3', 'photo-1581591524425-c7e0978865fc',
    'photo-1572429735150-f89bcd98801d', 'photo-1528459801456-ebfa4e5541e2', 'photo-1528459105426-b9548367069b', 'photo-1524234107056-1c1f48f64ab8',
    'photo-1618220179428-22790b461013', 'photo-1550418482-44df3c512e03'
];

async function validateUrls() {
    console.log(`Starting validation for ${masterImageIds.length} URLs...`);
    let failCount = 0;

    for (const [index, id] of masterImageIds.entries()) {
        const url = `https://images.unsplash.com/${id}?q=80&w=1000&auto=format&fit=crop`;
        try {
            const response = await axios.head(url);
            if (response.status !== 200) {
                console.error(`[FAIL] ${index + 1}/${masterImageIds.length} - Status ${response.status}: ${id}`);
                failCount++;
            } else {
                process.stdout.write('.'); // Success marker
            }
        } catch (error) {
            console.error(`\n[ERROR] ${index + 1}/${masterImageIds.length} - ${id}: ${error.message}`);
            failCount++;
        }
    }

    console.log(`\n\nValidation complete.`);
    console.log(`Total: ${masterImageIds.length}`);
    console.log(`Success: ${masterImageIds.length - failCount}`);
    console.log(`Failed: ${failCount}`);

    if (failCount > 0) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

validateUrls();
