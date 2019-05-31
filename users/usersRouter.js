const router = require('express').Router();
const Users = require ('./usersModel');
// const restricted = require('../auth/restricted-middleware');

// retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Uh-oh! There was an error retrieving your list of users'})
  }
});

// retrieve specific users by id #
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the person you\'re looking for',
    });
  }
});

// remove a user
router.delete('/:id', async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been removed from the trip...au revoir!' })
    } else {
      res.status(404).json({ message: 'Uh-oh! Action could not found.' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Unable to remove user. Can\'t get rid of them that easy!',
    });
  }
});

// add a user
router.post('/', async (req, res) => {
  try {
    const user = await Users.add(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Bummer. Error adding the user',
    });
  }
})

// update a user
router.put('/:id', async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Uh-oh! User could not be found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Bummer. Error updating the user' })
  }
})



module.exports = router;
