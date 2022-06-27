import { Profile } from "../models/profile.js"

//? Render index view and pass the profile info that will default to showing the initials on the profile photo but then switch to chosen profile photo
function index (req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('index', 
      { 
        title: 'Orbit', 
        user: req.user ? req.user : null ,
        profiles,
      }
    )
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
}