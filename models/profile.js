import mongoose from 'mongoose'
import { gameSchema } from './game.js'

const usernameGen = () => {
  let ranNum = Math.random() * 10000
  let ranNumToString = String(ranNum).slice(0, 4) 
  return ranNumToString = `orion${Number(ranNumToString)}`
}

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  orbit: [{type: Schema.Types.ObjectId, ref: 'Game'}],
  bio: String,
  username: { type: String, default: 'orion'},
  // defaultUsername: { type: String, value: usernameGen() },
  friends: [{type: Schema.Types.ObjectId, ref: 'Profile',}], 
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)



export {
  Profile
}
