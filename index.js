const express = require('express')
const app = express()
const logging = require('./logger/logging');
const emps = require('./routes/emps')
const users = require('./routes/users')
const auth = require('./routes/auth')
const helmet = require("helmet");
const morgan = require('morgan')
const mongoose = require('mongoose')
const logger = require('./config/logger')
const compression = require('compression')


 
 
mongoose.connect('mongodb://localhost/myCompany', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
})
.then(()=>console.log('connected to data base'))
.catch((error)=>logger.error('Check your database server ' + error))
mongoose.set('useCreateIndex' , true)


app.use(express.json());
app.use(helmet());
app.use(compression())
app.use('/api/emps',emps); 
app.use('/api/users',users); 
app.use('/api/auth',auth); 

app.all('*' , (req, res , next)=>{
  res.status(404).json({
    status : 'false',
    message : 'page not found'
  })
})


if (app.get('env') === 'development') {
    app.use(logging.log1);
    app.use(morgan('tiny'));
}


const port = process.env.port || 3000;
app.listen(port, ()=> logger.info('app working on prot '+port+' ... '))


// app.get('/api/emps/:FirstName/:LastName', (req, res) => {
//     res.send(req.query)
// })

// app.get('/api/emps/:FullName', (req, res) => {
//     res.send(req.query)
// })