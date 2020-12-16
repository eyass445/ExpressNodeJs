const express = require('express');
require('express-async-errors');
const { string, number } = require('joi');
const router = express.Router();
const {Employee,empsValed,empsPutValed} =  require('../model/emp');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', async (req, res) => {
    const emps = await Employee.find().sort('FullName')
    res.send(emps)
})


router.get('/pages', async (req, res) => {

    const {page = 1 , limet = 10} = req.query


    const emps = await Employee.find()
    .sort('FullName')
    .limit(limet * 1)
    .skip((page - 1) * limet).exec()
    res.send(emps)
})


router.get('/:empId', async (req, res) => {

    try {
        const findEmp = await Employee.findById(req.params.empId)
        if (!findEmp) {
            res.status(404).send({error :'thes name not found'})
        }
        res.send(findEmp)
        
    } catch (error) {

        res.status(404).json({
            status : 'false',
            message : 'emp not found'
          })

    }

    
})

router.post('/' , auth ,async (req, res) => {


    const { error } =  empsValed(req.body)

    if (error) {
        return res.send(error.details);
    }

    const newEmp = new Employee( {
        FullName : req.body.FullName ,
        salary : req.body.salary
    })

    await newEmp.save()
    res.send(newEmp);

})


router.put('/:id' , async (req, res) => {

    const { error } =  empsPutValed(req.body)

    if (error) {
        return res.send(error.details);
    }

    const emp = await Employee.findByIdAndUpdate(req.params.id,{
        FullName: req.body.FullName

    }, {new : true})

    if (!emp) {
        return res.status(404).send("invalid id ");
    }

    res.send(emp);
})


router.delete('/:id' ,[auth,admin] ,  async (req, res) => {

    const findEmp = await Employee.findByIdAndRemove(req.params.id)
    if (!findEmp) {
       return res.status(404).send({error :'thes name not found'})
    }

    res.send(findEmp);
})


module.exports = router;