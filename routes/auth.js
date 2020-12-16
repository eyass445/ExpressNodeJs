const express = require('express');
const { User } = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');




router.post('/' , async (req, res) => {


    const { error } =  Valed(req.body)

    if (error) {
        return res.send(error.details);
    }

    let newUser = await User.findOne({email : req.body.email});

    if (!newUser) {
        res.status(404).send({error :'Invaled email or password'})
    }

    const checkPassword = await bcrypt.compare(req.body.password , newUser.password)

    if (!checkPassword) {
        res.status(404).send({error :'Invaled email or password'})
    }

    const token = newUser.generateTokens();


    //res.send(_.pick(newUser , ['_id' , 'FullName' , 'email']));
    res.send(token);
    //res.send('ok');

})


function Valed(req) {
    const schema = Joi.object({
        email : Joi.string().min(3).max(255).required().email(),
        password : Joi.string().min(8).max(255).required(),
    })
    return schema.validate(req)
}


module.exports = router;

