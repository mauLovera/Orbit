import { Game } from "../models/game.js"


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
  Game.findById(req.params.id)
  .then(game => {
    res.render('games/show', 
      { 
        title: `${game.title} | Orbit`, 
        game,
      }
    )
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function search(req, res) {
  axios.get(`https://api.rawg.io/api/games?page_size=10&search=${req.body.search}&key=${process.env.API_KEY}`)
  .then((response) => {
    res.render("games/results", {
      title: "Search",
      results: response.data.results,
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
  search
}