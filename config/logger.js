const winston = require('winston');
require('winston-mongodb');


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  //defaultMeta: { service: 'user-service' },
  transports: [
    
     new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format : winston.format.combine(winston.format.timestamp() , winston.format.json())
    }),



    new winston.transports.MongoDB({
        level: 'error',
        options : { useUnifiedTopology: true } ,
        db: 'mongodb://localhost/myCompany',
    })

 
    
    // new winston.transports.File({ filename: 'combined.log' }),
    //new winston.transports.Console()
  ] 
});

module.exports = logger