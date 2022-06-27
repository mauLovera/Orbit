import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as porfileCtrl from '../controllers/profiles.js'

const router = Router()

//* GET to localhost:3000/profile/:id
//? Render a show view that has profile information of the user or someone elses
router.get('/', isLoggedIn, porfileCtrl.show)

export {
  router
}
