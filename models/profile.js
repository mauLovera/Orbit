import mongoose from 'mongoose'
import { gameSchema } from './game.js'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  orbit: [gameSchema],
  bio: String,
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
