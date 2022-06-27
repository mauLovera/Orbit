import { Profile } from "../models/profile.js"

//? Render a view that shows all the profiles within the app 
function index (req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', 
      { 
        title: 'Profiles | Orbit',
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


//? Render show view of a profile and pass in a user self checker to conditionally render a button that will allow the user to update certain parts of their profile
function show (req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', 
      { 
        title: `${profile.name} | Orbit`, 
        profile,
        isSelf,
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
  show,
}