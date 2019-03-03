const fs = require('fs');
const path = require('path');

const saveData = () => {
  let i = 1;
  const numberOfRecords = 404;
  const file = fs.createWriteStream(
    path.resolve(__dirname, '../data/postgreSQL/recs.csv')
  );

  const writeData = () => {
    let result = true;
    let random = [];
    for (let k = 0; k <= 105; k++) {
      random.push(Math.random());
    }

    while (i <= numberOfRecords && result) {
      const recs = [];
      let recsCSV = '';
      for (let k = 0; k < 20; k++) {
        recs.push(Math.floor(random[(i + k) % 100] * 404 + 1));
      }
      recs.forEach(recId => {
        recsCSV += i + '|' + recId + '\n';
      });

      result = file.write(recsCSV);
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
