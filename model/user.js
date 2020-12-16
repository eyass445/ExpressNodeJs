const mongoose = require('mongoose')
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { boolean } = require('joi');


const userSchema = new mongoose.Schema({
    FullName : {
        type: String ,
        require:true,
        minlength : 3,
        maxlength: 44
    } ,
    email : {
        type : String ,
        require : true,
        unique : true,
        minlength : 3,
        maxlength: 255
    },
    password : {
        type : String ,
        require : true,
        minlength : 8,
        maxlength: 1024
    },
    isAdmin : Boolean
})

userSchema.methods.generateTokens = function () {

    const token = jwt.sign({_id : this._id,isAdmin:this.isAdmin},'privetKey')
    return token
}

const User = mongoose.model('User', userSchema )


function userValed(user) {
    const schema = Joi.object({
        FullName : Joi.string().min(3).required().max(44) ,
        email : Joi.string().min(3).max(255).required().email(),
        password : Joi.string().min(8).max(255).required(),
    })
    return schema.validate(user)
}

exports.User = User;
exports.userValed = userValed;
