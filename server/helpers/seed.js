const fs = require('fs');
const faker = require('faker');
const path = require('path');

let random = [];
for (let i = 0; i <= 105; i++) {
  random.push(Math.abs(Math.random() - Math.random()));
}

for (let i = 1; i <= 50; i++) {
  let data = [];
  var reviews = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

  for (let j = 1; j <= 50000; j++) {
    var generateCategory = number => {
      const categories = [
        'jewelry',
        'electronics',
        'beauty',
        'outdoor',
        'wearables',
        'bath',
        'clothing',
        'board games',
        'food',
        'toys'
      ];
      return categories[number % 10];
    };

    const product = {};
    const id = i * 500000 + j;
    product.id = id;
    product.name = 'Product ' + id;
    product.category = generateCategory(j % 100);
    product.price = Math.round(random[j % 100] * 100 + 5) + '.00';
    product.avg_review = reviews[Math.round(9 - random[(j % 100) - 1] * 9)];
    product.review_count = Math.round(random[(j % 100) + 1] * 300);
    product.is_prime = random[j % 100] < 0.5 ? true : false;
    const recs = [];
    for (let k = 0; k < 20; k++) {
      recs.push(Math.floor(random[(id + k) % 100] * 10000000));
    }
    product.recs = recs;

    product.image = faker.image.imageUrl();
    product.manufacturer = faker.company.companyName();

    data.push(product);
  }

  fs.writeFile(
    path.resolve(__dirname, `data/testCSV${i}`),
    JSON.stringify(data),
    err => {
      if (err) throw err;
      console.log('saved!');
    }
  );
}
