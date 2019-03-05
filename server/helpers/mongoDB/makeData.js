const fs = require('fs');
const faker = require('faker');
const path = require('path');

const saveData = () => {
  let i = 1;
  const numberOfRecords = 10000000;
  const file = fs.createWriteStream(
    path.resolve(__dirname, '../data/mongo/products')
  );

  const writeData = () => {
    let result = true;
    let random = [];
    for (let k = 0; k <= 105; k++) {
      random.push(Math.abs(Math.random() - Math.random()));
    }
    const reviews = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    const generateCategory = number => {
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

    while (i <= numberOfRecords && result) {
      const product = {};

      product.id = i;
      product.name = 'Product ' + i;
      product.category = generateCategory(i % 100);
      product.price = Math.round(random[i % 100] * 100 + 5) + '.00';
      product.avg_review = reviews[Math.round(9 - random[i % 100] * 9)];
      product.review_count = Math.round(random[(i % 100) + 1] * 300);
      product.is_prime = random[i % 100] < 0.5 ? true : false;
      product.image = faker.image.imageUrl();
      product.manufacturer = faker.company.companyName();
      const recs = [];
      for (let k = 0; k < 20; k++) {
        recs.push(Math.floor(random[(i + k) % 100] * 10000000));
      }
      product.recs = recs;
      result = file.write(JSON.stringify(product) + '\n');
      i++;
    }

    if (i < numberOfRecords) {
      file.once('drain', writeData);
    }
  };

  return writeData;
};

const saver = saveData();
saver();
