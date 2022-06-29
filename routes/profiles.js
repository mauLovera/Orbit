import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

//* GET to localhost:3000/profiles
//? Render an index view that has all profiles 
router.get('/', profilesCtrl.index)

//* GET to localhost:3000/profiles/:id
//? Render a show view that has profile information of the user or someone elses
router.get('/:id', isLoggedIn, profilesCtrl.show)

//* GET to localhost:3000/profiles/:id/edit
//? Render an edit view that has forum for the user to update their profile 
router.get('/:id/edit', isLoggedIn, profilesCtrl.edit)

//* PATCH to localhost:3000/profiles/:id
//? Update part of the profile
router.patch('/:id', isLoggedIn, profilesCtrl.update)

//* PATCH to localhost:3000/profiles/:id/friend
//? Updates part of the users model to now include a reference to the friends profile._id
router.patch('/:id/friend', isLoggedIn, profilesCtrl.addFriend)

//* PATCH to localhost:3000/profiles/:id/unfriend
//? Updates part of the users model to remove the reference of a profile._id if it exists within their friends list
router.patch('/:id/unfriend', isLoggedIn, profilesCtrl.removeFriend)



export {
  router
}
