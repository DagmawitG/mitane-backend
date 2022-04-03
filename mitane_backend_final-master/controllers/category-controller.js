const Categories = require('../models/category-model');
const ErrorResponse = require('../utility/errorResponse');
const asyncHandler = require('../middlewares/async');
const {getCategoryObjectId} = require('../utility/getObjectId');
//@desc Get All Category
//@route    category/
//@filter   category?name
//@access   public
exports.getCategory = asyncHandler(async (req,res,next)=>{
    let {keyword} = req.query;
    let category;
    if(keyword){
        category = await Categories.find({$text:{$search:keyword}})
    }else{
        category = await Categories.find();
    }
    
    if(!category){
        res.status(200).json({
            success:true,
            count: category.length,
            data:category
        });
    }
    res.status(200).json({
        success:true,
        count: category.length,
        data:category
    });

});

//@desc Get Category by Id 
//@route    category/:id
//@access   public
exports.getCategoryById = asyncHandler(async (req,res,next)=>{

    const category = await Categories.findById(req.params.id);
    if(!category){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400));
    }
    res.status(200).json({
        success:true,
        data:category
    });

});

//@desc Get All Category under products
//@route    category/type/{name}
//@access   public
exports.getCategoryByType = asyncHandler(async (req,res,next)=>{
    const category = await Categories.find({type: req.params.name});
    
    if(!category){
        return next(new ErrorResponse(`Resource not found`,400));
    }

    res.status(200).json({
        success:true,
        count: category.length,
        data:category
    });

});


//@desc Create Category
//@route    category/
//@access   private
exports.createCategory = asyncHandler(async (req,res,next)=>{
    const {name} = req.body;
    const category = await Categories.create({name});
    res.status(200).json({
        success:true,
        data:category
    });

});


//@desc Update category
//@desc category/:id
//@access   Private
exports.updateCategory = asyncHandler(async (req,res,next)=>{
    const category = await Categories.findOneAndUpdate({name:req.params.name},req.body,{
        new:true,
        runValidators:true
    });
    if(!category){
        return next(new ErrorResponse(`Resource not found with name ${req.params.name}`,400))
    }
    res.status(200).json({
        success:true,
        data:category
    });
    
});


//@desc Delete Category 
//@desc api/v1/agri-products/category/:id
//@access   Private
exports.deleteCategory = asyncHandler(async (req,res,next)=>{
    const category = await Categories.findOneAndDelete({name:req.params.name});
    if(!category){
        return next(new ErrorResponse(`Category not found with name ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        data: category
    });
   
});

