import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()

//* GET to localhost:3000/games/:id
//? Display all of a games details and reviews
router.get('/:id', isLoggedIn, gamesCtrl.show)

//* POST to localhost:3000/games/search
//? Post the input of the forum submittal to the search view
router.post('/search', isLoggedIn, gamesCtrl.search)

export {
  router
}