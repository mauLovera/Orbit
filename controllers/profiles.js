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
  .populate('friends')
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    const isFriend = profile.friends?.includes(req.user.profile._id)
    res.render('profiles/show', 
      { 
        title: `${profile.name} | Orbit`, 
        profile,
        isSelf,
        isFriend,
      }
    )
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render(`profiles/edit`, {
      profile,
      title: `Edit Profile - ${profile.name} | Orbit`,
      isSelf,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profile/${profile._id}`)
  })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(profile => {
    res.redirect(`/profiles/${profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function addFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params._id)
    profile.save()
    .then(() => {
      res.redirect(`/profile/${req.params.id}`)
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })
  })
}

function removeFriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.remove({_id: req.params._id})
    profile.save()
    .then(() => {
      res.redirect(`/profile/${req.params.id}`)
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })
  })
}

export {
  index,
  show,
  edit,
  update,
  addFriend,
  removeFriend,
}