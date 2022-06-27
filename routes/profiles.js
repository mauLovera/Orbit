import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

//* GET to localhost:3000/profile
//? Render an index view that has all profiles 
router.get('/', profilesCtrl.index)


//* GET to localhost:3000/profile/:id
//? Render a show view that has profile information of the user or someone elses
router.get('/:id', isLoggedIn, profilesCtrl.show)

export {
  router
}
