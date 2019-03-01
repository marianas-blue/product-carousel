const faker = require('faker');
const database = require('../../config.js');

const start = new Date();

database.schema
  .dropTableIfExists('products')
  .then(() =>
    database.schema.createTable('products', table => {
      table.increments('product_id');
      table.string('name');
      table.string('image');
      table.decimal('price');
      table.decimal('avg_review', 2, 1);
      table.integer('review_count');
      table.boolean('is_prime');
      table.string('category');
      table.string('manufacturer');
    })
  )
  .then(() => {
    let data = [];
    var reviews = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

    let random = [];
    for (var i = 0; i <= 101; i++) {
      random.push(Math.abs(Math.random() - Math.random()));
    }

    for (var j = 1; j <= 100; j++) {
      let product = {};
      product.price = Math.round(random[j] * 100 + 5) + '.00';
      product.avg_review = reviews[Math.round(9 - random[j - 1] * 9)];
      product.review_count = Math.round(random[j + 1] * 300);
      product.is_prime = random[j] < 0.5 ? true : false;

      product.image = faker.image.imageUrl();
      product.manufacturer = faker.company.companyName();

      data.push(product);
    }
    return database('products').insert(data);
  })
  .then(() => {
    process.exit();
  })
  .then(() => {
    const end = new Date();
    console.log('TOTAL DURATIONS', end - start);
  })
  .catch(err => {
    throw err;
  });
