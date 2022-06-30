import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'Profile'},
  review: String,
  rating: Number,
}, {
  timestamps: true,
})

const gameSchema = new Schema({
  title: String,
  rawgId: Number,
  description: String,
  artwork: String,
  collectedBy: [{ type: Schema.Types.ObjectId, ref: 'Profile'}],
  reviews: [reviewSchema],
  genres: [String],
}, {
  timestamps: true,
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game,
  gameSchema,
}