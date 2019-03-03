let convertJSONToCSV = product => {
  const keys = Object.keys(product);
  let string = '';
  keys.forEach(field => {
    let data = product[field];
    if (typeof data === 'object') {
      string += `"${JSON.stringify(data)}"` + '|';
    } else {
      string += JSON.stringify(data) + '|';
    }
  });
  return string.slice(0, string.length - 1);
};

module.exports.formatCSV = convertJSONToCSV;
