import { Router } from 'express'
import * as indexCtrl from '../controllers/index.js'

const router = Router()

//* GET to localhost:3000
//? Display profile photo on navbar
router.get('/', indexCtrl.index)

export {
  router
}
