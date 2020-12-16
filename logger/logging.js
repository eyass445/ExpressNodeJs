
//Middleware
function log1 (req, res , next) {
    console.log("eyas seyam")
    next();
}


module.exports = {log1}