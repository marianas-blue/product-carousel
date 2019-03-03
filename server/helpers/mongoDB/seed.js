const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', err => {
  throw err;
});
db.once('open', () => {
  console.log('mongodb connected!');
});

const carouselSchema = mongoose.Schema({
  product_id: Number,
  name: String,
  image: String,
  price: Number,
  avg_review: Number,
  review_count: Number,
  is_prime: Boolean,
  category: String,
  manufacturer: String,
  recs: [{ id: Number }]
});

const Carousel = mongoose.model('Carousel', carouselSchema);
