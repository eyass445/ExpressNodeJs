const express = require('express');
const { User, userValed } = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');


router.get('/profile', auth ,async (req, res) => {
    const profile = await User.findById(req.newUser._id).select('-password')
    res.send(profile)
})


router.post('/' , async (req, res) => {


    const { error } =  userValed(req.body)

    if (error) {
        return res.send(error.details);
    }

    let newUser = await User.findOne({email : req.body.email});

    if (newUser) {
        res.status(404).send({error :'user is alerde in database'})
    }

    newUser = new User( _.pick(req.body,['FullName' , 'email' , 'password']))

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    newUser.password = await bcrypt.hash(newUser.password , saltRounds)

    await newUser.save()
    const token = newUser.generateTokens();
    res.header('x-auth-token',token).send(_.pick(newUser , ['_id' , 'FullName' , 'email']));

})


module.exports = router;
