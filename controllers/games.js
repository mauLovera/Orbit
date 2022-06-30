import { Game } from "../models/game.js"
import axios from "axios"
import { response } from "express"


//? Render index view and pass game model
function index (req, res) {
  Game.find({})
  .then (games => {
    res.render('games', {
      title: `Games | Orbit`,
      games
    })
  })
}

//? Render show view and pass the game that was found 
function show (req, res) {
  axios.get(
    `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`
  )
  .then(response =>{
    Game.findOne( { rawgId: response.data.id} )
    .then(game => {
      console.log(response.data)
      res.render(`games/show`, {
        apiResult: response.data,
        title: ` Game Details | Orbit`,
        game,
        userHasGame: game?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/games')
    })
  })
}

function search(req, res) {
  axios.get(
    `https://api.rawg.io/api/games?page_size=10&search=${req.body.search}&key=${process.env.API_KEY}`
  )
  .then((response) => {
    console.log('===============')
    console.log(response.data)
    console.log('===============')
    console.log(req.body)
    res.render("games/results", {
      title: "Search - ",
      results: response.data.results,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToOrbit (req, res) {
  req.body.collectedBy = req.user.profile._id
  Game.findOne({rawgId: req.params.id})
  .then(game => {
    if (game) {
      game.collectedBy.push(req.user.profile._id)
      game.save()
      .then(() => {
        res.redirect(`/games/${req.params.id}`)
      })
    } else {
      console.log(req.body)
      Game.create(req.body)
      .then(() => {
        res.redirect(`/games/${req.params.id}`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function removeFromOrbit(req, res) {
  Game.findOne({ rawgId: req.params.id })
  .then(game => {
    game.collectedBy.remove({_id: req.user.profile._id})
    game.save()
    .then(() => {
      res.redirect(`/games/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  show,
  search,
  addToOrbit,
  removeFromOrbit,
}