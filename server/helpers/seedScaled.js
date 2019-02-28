let faker = require('faker');

let data = [];
var reviews = [
  '0.5',
  '1.0',
  '1.5',
  '2.0',
  '2.5',
  '3.0',
  '3.5',
  '4.0',
  '4.5',
  '5.0'
];

let random = [];
for (var i = 0; i <= 101; i++) {
  random.push(Math.abs(Math.random() - Math.random()));
}

for (var j = 1; j <= 100; j++) {
  let product = {};
  product.price = JSON.stringify(Math.round(random[j] * 100 + 5)) + '.00';
  product.avgReview = reviews[Math.round(9 - random[j - 1] * 9)];
  product.reviewCount = Math.round(random[j + 1] * 300);
  product.isPrime = random[j] < 0.5 ? true : false;

  product.category = faker.commerce.department();
  product.manufacturer = faker.company.companyName();

  data.push(product);
}
