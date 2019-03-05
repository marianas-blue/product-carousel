const fs = require('fs');
const path = require('path');

const saveData = () => {
  let i = 9000001;
  const numberOfRecords = 10000000;
  const file = fs.createWriteStream(
    path.resolve(__dirname, '../data/postgreSQL/recs/recs10.csv')
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
        recs.push(Math.floor(random[(i + k) % 100] * 10000000 + 1));
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
