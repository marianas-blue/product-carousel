const pg = require('pg');
const dbString = require('../../config');

const client = new pg.Client(dbString);
client.connect();

const selectRecs = async (id, name) => {
  return client
    .query(
      `SELECT products.* FROM products, recs WHERE recs.product_id = ${id} AND recs.rec_id = products.id`
    )
    .then(res => {
      return res.rows;
    })
    .catch(e => console.error(e.stack));
};

const setRec = (id, oldId, newId) => {
  return client
    .query(
      `UPDATE recs SET rec_id = ${newId} WHERE product_id = ${id} AND rec_id = ${oldId};`
    )
    .then(res => {
      return res.rows;
    })
    .catch(e => console.error(e.stack));
};

module.exports.selectRecs = selectRecs;
module.exports.setRec = setRec;
