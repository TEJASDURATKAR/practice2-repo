const express = require('express')
const router = express.Router()
const {addUser,signin,signup} = require('../controller/user-controller');

    

router.post('/singup',signup)
    
router.post('/singin',signin)
    

module.exports = router