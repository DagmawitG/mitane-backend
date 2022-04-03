const asyncHanler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Price = require('../models/price-model');

const {nextDay} = require('../middlewares/price_helper');
const {getProductObjectId, getCategoryObjectId} = require('../utility/getObjectId');


//@desc Get price by product
//@route    Get price/
//@access   Public
exports.getDailyPrice = asyncHanler(async (req,res,next)=>{
    let date = req.params.date;
    let prices = await Price.find({price_of_the_day:{$elemMatch:{day :
            {
                '$gte' : new Date(date), 
                '$lt' : nextDay(date)
            }}}},{'price_of_the_day.$':1}).populate({path:'product',select:'name'})
                                          .populate({path:'category',select:'name'});
    

    res.status(200).json({
        status:true,
        count:prices.length,
        data: prices
    });
});

//@desc Get daily price
//@route    Get price/
//@access   Public
exports.getDailyPriceByCategory = asyncHanler(async (req,res,next)=>{
    let {category,date} = req.query;
    const objId = await getCategoryObjectId(category);
    if(!objId) next(new ErrorResponse('Category not found',400));
    const dailyPrice = await Price.find({category:objId},{price_of_the_day:{$elemMatch:{day :
                    {
                        '$gte' : new Date(date), 
                        '$lt' : nextDay(date)
                    }}}},{'price_of_the_day.$':1}).populate({path:'product',select:'name'})
                                                  .populate({path:'category',select:'name'});
    if(!dailyPrice){
        return next(new ErrorResponse("Resource not found",400));
    }
    res.status(200).json({
        count:dailyPrice.length,
        success:true,
        data:dailyPrice
    });
});




//@desc Create daily price
//@route    Post price/
//@access   Private
exports.createDailyPrice = asyncHanler(async (req,res,next)=>{
    let dailyPrice;
    let {product,category} = req.body;
    const objId1 = await getProductObjectId(product);
    const objId2 = await getCategoryObjectId(category);

    if(!objId1 || !objId2){
        return next(new ErrorResponse('Product not found',400));
    }

    dailyPrice = await Price.create({product:objId1,category:objId2,last_price:0});
    
    res.status(200).json({
        success:true,
        data: dailyPrice
    });
});

//@desc Update daily price
//@route    Put price/:productId
//@access   Private
exports.addDailyPrice = asyncHanler(async (req,res,next)=>{
    const {price} = req.body;
    let objId = await getProductObjectId(req.params.product);
    if(!objId){
        next(new ErrorResponse('Product not found',400));
    }
    const dailyPrice = await Price.findOneAndUpdate({product:objId},{$push:{price_of_the_day:[{price}]}, last_price: price},{
        new:true,
        runValidators:true
    }).populate({path:'product',select:'name'})
      .populate({path:'category',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Product not found`,400));
    }

    res.status(201).json({
        success:true,
        data:dailyPrice
    });

});

//@desc Delete product price
//@route    delet price/:productName
//@access   Private
exports.deleteProductPrice = asyncHanler(async (req,res,next)=>{
    let objId = await getProductObjectId(req.params.product);
    if(!objId){
        next(new ErrorResponse('Product not found',400));
    }
    const dailyPrice = await Price.findOneAndDelete({product:objId}).populate({path:'product',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Resource with id ${req.params.productId} not found`,400));
    }
    res.status(200).json({
        success:true,
        data:dailyPrice
    });
});

//@desc Delete daily price
//@route    delet /price
//@access   Private
exports.deleteDailyPrice = asyncHanler(async (req,res,next)=>{
    const {product,date} = req.body;
    let objId = await getProductObjectId(product);
    if(!objId){
        next(new ErrorResponse('Product not found',400));
    }
    const dailyPrice = await Price.findOneAndUpdate({product:objId},
        {$pull:{price_of_the_day:{
            day:{
                "$gte" : new Date(date), 
                "$lt" : nextDay(date)
            } 
        }}},{returnDocument:'before'}).populate({path:'product',select:'name'});

    if(!dailyPrice){
        next(new ErrorResponse(`Resource not found`,400));
    }
    res.status(200).json({
        success:true,
        data:dailyPrice
    });
});


