const ErrorResponse = require('../utility/errorResponse');


const errorHandler = (err,req,res,next)=>{
    console.log(err);
    res.status(err.statusCode || 200).json({
        success:false,
        data: err.message
    });
}

module.exports = errorHandler;
