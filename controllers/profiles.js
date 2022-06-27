import { Profile } from "../models/profile.js"

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
  show,
}