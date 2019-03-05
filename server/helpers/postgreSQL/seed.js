const faker = require('faker');
const database = require('../../config.js');

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
    return database('products').insert(data);
  })
  .then(() => {
    process.exit();
  })
  .catch(err => {
    throw err;
  });
