import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
      cardUserId: String,
      name: String,
      topic: String,
      term: String,
      definition: String
});

const Card = mongoose.model('Card', cardSchema);

export default Card;