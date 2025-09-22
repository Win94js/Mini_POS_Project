const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const Product = require('./Models/Product'); // Adjust path to your schema
const Unit = require('./Models/Unit'); // Assuming you have this
const AdminAccount = require('./Models/AdminAccount'); // Assuming you have this

mongoose.connect('mongodb://localhost:27017/your_db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function generateSampleProducts(count = 100) {
  try {
    const units = await Unit.find();
    const admins = await AdminAccount.find();

    if (!units.length || !admins.length) {
      console.error('Please ensure Unit and AdminAccount collections have data.');
      process.exit(1);
    }

    const sampleCategories = ['Beverages', 'Snacks', 'Entrees', 'Desserts'];
    const sampleSubCategories = ['Soft Drinks', 'Chips', 'Burgers', 'Cakes'];

    const sampleProducts = [];

    for (let i = 0; i < count; i++) {
      const originalPrice = faker.datatype.number({ min: 10, max: 200 });
      const salePrice = faker.datatype.number({ min: 5, max: originalPrice });
      const unitQuantity = faker.datatype.number({ min: 1, max: 10 });

      sampleProducts.push({
        productID: faker.datatype.uuid(),
        productName: faker.commerce.productName(),
        originalPrice,
        salePrice,
        wholeSalePrice: salePrice - faker.datatype.number({ min: 1, max: 5 }),
        quantity: faker.datatype.number({ min: 10, max: 100 }),
        alertQuantity: faker.datatype.number({ min: 3, max: 10 }),
        unitQuantity,
        unit: faker.random.arrayElement(units)._id,
        description: faker.commerce.productDescription(),
        photo: [
          faker.image.imageUrl(),
          faker.image.imageUrl(),
        ],
        category: faker.random.arrayElement(sampleCategories),
        subCategory: faker.random.arrayElement(sampleSubCategories),
        options: [],
        createdBy: faker.random.arrayElement(admins)._id,
      });
    }

    await Product.insertMany(sampleProducts);
    console.log(`${count} sample products inserted.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

generateSampleProducts();
