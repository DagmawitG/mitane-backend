const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Ingredients = require('../models/ingredient-model');
const {getCategoryObjectId, getProductObjectId} = require('../utility/getObjectId');

exports.getAll = async function (req,res,next){
//     const {name} = req.query;
//    try{
//        if(name){
//         var ingredients = await Ingredients.find({name:name}).populate({path:'category',select:'name'});
//         res.status(200).json({ingredients});
//        }
//        else{
//            var ingredients = await Ingredients.find({}).populate({path:'category',select:'name'});
//            res.status(200).json({ingredients});
//        }

//    } 
//    catch (e) {
//        res.status(400).json({
//         status: 400, message: e.message});
// }

    let query;
    const {keyword} = req.query;
    if(keyword){
        query = Ingredients.find({$text: {$search:keyword}}).populate({path:'category',select:'name'}); 
    }else{
        query = Ingredients.find().populate({path:'category',select:'name'});
    }
    const ingredients = await query;
    if(!ingredients){
        res.status(200).json({
            count: ingredients.length,
            success: true,
            data:ingredients
        });
    }
    res.status(200).json({
        count:ingredients.length,
        success:true,
        data:ingredients
    });


}

exports.getIngredientById = async function (req,res,next){
    try{
  var ingredients = await Ingredients.findById(req.params.id).populate({path:'category',select:'name'});
  res.status(200).json({ingredients});

    }
    catch(e){
        res.status(400).json({
            status: 400, message: e.message});

    }
}

exports.addIngredient = async function (req,res,next){
    // try{
    //     var ingredients = await Ingredients.create(req.body);
    //     res.status(200).json({ingredients});
    // }
    // catch(e){
    //     res.status(400).json({
    //         status: 400, message: e.message});

    // }

    const {name,category} = req.body;

    let ingredient = null;
    const objId = await getCategoryObjectId(category);
    if(objId){
        ingredient = await Ingredients.create({name,category:objId})
        res.status(200).json({
            success:true,
            data: ingredient
        }).populate({path:'category',select:'name'});

    } else{
        next(new ErrorResponse('Category not found',400));
    }

}

exports.updateIngredient = async function (req,res,next){
    // try{
    //    var ingredients = await Ingredients.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate({path:'category',select:'name'})
    //    res.status(200).json({ingredients});
    // }
    // catch(e){
    //     res.status(400).json({
    //         status: 400, message: e.message});

    // }

    const {name, category} = req.body;

    const objId = await getCategoryObjectId(category);
    if (objId) {
        let ingredient = await Ingredients.findOneAndUpdate({ name: req.params.name }, { name:name, category: objId }, {
            new:true,
            runValidators:true
        }).populate({path:'category',select:'name'}); 

        res.status(200).json({
            success:true,
            data:ingredient
        });

        if (!ingredient) {
            return next(new ErrorResponse(`Resource not found with name ${req.params.name}`,400));
        }
    } else{
        return next(new ErrorResponse(`Resource not found`,400));
    }

}

exports.deleteIngredient = async function (req,res,next){
    // try{
    //    var ingredients = await Ingredients.findByIdAndDelete(req.params.id).populate({path:'category',select:'name'})
    //    res.status(200).json({ingredients});
    // }
    // catch(e){
    //     res.status(400).json({
    //         status: 400, message: e.message});
    // }

    const ingredient = await Ingredients.findOneAndDelete({name:req.params.name}).populate({path:'category',select:'name'}); 

    if(!ingredient){
        return next(new ErrorResponse(`Resource not found with name ${req.params.name}`,400));
    }

    res.status(200).json({
        success:true,
        data:ingredient
    });

}
