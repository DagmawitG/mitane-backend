const asyncHandler = require('../middlewares/async');
const Price = require('../models/price-model');
const productModel = require('../models/product-model');
exports.getSuggestionsBasedOnPrice = asyncHandler(async(req,res,next) =>{   
    try{
       const suggestions = await Price.find({}).sort({last_price: -1}).populate({path:'product',select:'name'})
                                          .populate({path:'category',select:'name'}).limit(10);

        res.status(200).json({
            status:true,
            data: suggestions
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})

exports.getSuggestionsBasedOnWeather = asyncHandler(async(req,res,next) =>{   
    try{
        const weathers = ['authumn','spring','summer','winter']
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        let weather;
        switch(currentMonth){
            case 12:
            case 1:
            case 2:
                weather = weathers[3];
                break;
            case 3:
            case 4:
            case 5:
                weather = weathers[1];
                break;
            case 9:
            case 10:
            case 11:
                weather = weathers[0];
                break;
            case 6:
            case 7:
            case 8:
                weather = weathers[2];
                break;
        }
        const suggestions = await productModel.find({
            weather: { $in: 
                weather
            }
        }).populate({path: 'category'})

        res.status(200).json({
            status:true,
            data: suggestions
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
})


