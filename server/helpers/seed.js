const fs = require('fs');
const faker = require('faker');
const path = require('path');

let data = [];
var reviews = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

let random = [];
for (var i = 0; i <= 101; i++) {
  random.push(Math.abs(Math.random() - Math.random()));
}

for (var j = 1; j <= 10; j++) {
  let product = {};
  product.price = Math.round(random[j] * 100 + 5) + '.00';
  product.avg_review = reviews[Math.round(9 - random[j - 1] * 9)];
  product.review_count = Math.round(random[j + 1] * 300);
  product.is_prime = random[j] < 0.5 ? true : false;

  product.image = faker.image.imageUrl();
  product.manufacturer = faker.company.companyName();

  data.push(product);
}

fs.writeFile(
  path.resolve(__dirname, 'data/testCSV'),
  JSON.stringify(data),
  err => {
    if (err) throw err;
    console.log('saved!');
  }
);
