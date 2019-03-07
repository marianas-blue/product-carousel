const { selectRecs, setRec } = require('../database/models.js');

const getRecs = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  const data = await selectRecs(id, name);
  data.forEach(item => {
    const avgReview = item.avg_review;
    delete item.avg_review;
    item['avgReview'] = avgReview;
  });

  res.status(200).send(data);
};

const updateRec = (req, res) => {
  const callback = (err, data) => {
    if (err) throw err;
    res.sendStatus(204);
  };
  // setRec(callback);
};

const postClick = (req, res) => {
  // This is where client data would be sent to another server, to optimize product recommendations.
  res.status(201).send(data);
};

module.exports.getRecs = getRecs;
module.exports.updateRec = updateRec;
module.exports.postClick = postClick;
