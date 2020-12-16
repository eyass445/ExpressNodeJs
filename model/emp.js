const mongoose = require('mongoose')
const Joi = require('joi');


const employeeSchema = new mongoose.Schema({
    FullName : {
        type: String ,
        require:true,
        minlength : 3,
        maxlength: 44
    } ,
    salary : {
        type : Number ,
        require : true
    }
})

const Employee  = mongoose.model('Employee' ,employeeSchema) ;


function empsValed(emp) {
    const schema = Joi.object({
        FullName : Joi.string().min(3).required() ,
        salary : Joi.number().integer().required()
    })

    return schema.validate(emp)

}

function empsPutValed(emp) {
    const schema = Joi.object({
        FullName : Joi.string().min(3).required() 
    })

    return schema.validate(emp)
}


exports.Employee = Employee;
exports.empsValed = empsValed;
exports.empsPutValed = empsPutValed;

