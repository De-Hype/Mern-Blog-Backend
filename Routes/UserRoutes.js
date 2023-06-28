const { Register, Login, getAllUsers, singleUser, changeUserName } = require('../Controllers/Authenitication');
const router = require('express').Router()

router.post('/register', Register)
router.get('/all-users', getAllUsers)
router.get('/single-user/:id', singleUser)
router.post('/login', Login)
router.put('/reset-username', changeUserName)

module.exports = router