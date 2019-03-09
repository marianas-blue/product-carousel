const { selectRecs, setRec } = require('../database/models.js');

const getRecs = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  const data = await selectRecs(id, name);

  data.forEach(item => {
    item['avgReview'] = item.avg_review.toString();
    delete item.avg_review;

    item.price = item.price.toString();

    item['isPrime'] = item.is_prime;
    delete item.is_prime;

    item['reviewCount'] = item.review_count;
    delete item.review_count;
  });

  res.status(200).send(data);
};

const updateRec = async (req, res) => {
  const { id } = req.params;
  if (req.body) {
    const {name, oldId, oldName, newId, newName } = req.body;
  } else {
    const { name, oldId, oldName, newId, newName } = req.query;
  }

  await setRec(id, oldId, newId);
  res.sendStatus(204);
};

const postClick = (req, res) => {
  const { id } = req.params;
  const { name, adId, adName } = req.query;
  // This is where client data would be sent to another server after a recommended product was clicked, to optimize product recommendations.
  res.sendStatus(201);
};

module.exports.getRecs = getRecs;
module.exports.updateRec = updateRec;
module.exports.postClick = postClick;
