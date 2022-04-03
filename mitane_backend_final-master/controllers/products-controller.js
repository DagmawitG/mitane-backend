const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utility/errorResponse');
const Products = require('../models/product-model');
const {getCategoryObjectId, getProductObjectId} = require('../utility/getObjectId');

//@desc Get all products
//@route    products/
//@filter   products?name
//@filter   category/:categoryName/products
//@access   Public
exports.getProducts = asyncHandler(async (req,res,next)=>{
    let query;
    const {keyword} = req.params;
    if(req.params.categoryName){
        const objId = await getCategoryObjectId(req.params.categoryName);
        if(objId){
            query = Products.find({category: objId}).populate({path:'category',select:'name'}); 
            
        }else{
            next(new ErrorResponse('Category not found',400));
        }
    } else if(keyword){
        query = Products.find({$text: {$search:keyword}}).populate({path:'category',select:'name'}); 
    }else{
        query = Products.find().populate({path:'category',select:'name'});
    }
    const products = await query;
    if(!products){
        res.status(200).json({
            count: products.length,
            success: true,
            data:products
        });
    }
    res.status(200).json({
        count:products.length,
        success:true,
        data:products
    });
  
});

//@desc Get a product by name
//@route products/n/:name
//@access Public
exports.getProductByName = asyncHandler(async (req,res,next)=>{
    let product = null;
    const productId = await getProductObjectId(req.params.name);

    if (productId) {
        product = await Products.findById(productId).populate({path:'category',select:'name'}); 
    
        if(!product){
            return next(new ErrorResponse(`Resource not found`,400));
        }
        
        res.status(200).json({
            success:true,
            data:product
        });

    } else{
        next(new ErrorResponse('Resource not found',400));
    }
    
  
});


//@desc Get a product by Id 
//@route    products/:id
//@access   Public
exports.getProductById = asyncHandler(async (req,res,next)=>{

    const products = await Products.findById(req.params.id).populate({path:'category',select:'name'});
    if(!products){
        return next(new ErrorResponse(`Resource not found with id ${req.params.id}`,400));
    }


    res.status(200).json({
        success:true,
        data:products
    });
  
});


//@desc Create product 
//@desc products/
//@access   Private
exports.createProduct = asyncHandler(async (req,res,next)=>{
    const {name,category} = req.body;

    let product = null;
    const objId = await getCategoryObjectId(category);
    if(objId){
        product = await Products.create({name,category:objId})
        res.status(200).json({
            success:true,
            data: product
        }).populate({path:'category',select:'name'});
    } else{
        next(new ErrorResponse('Category not found',400));
    }
    
  
});

//@desc Update product
//@desc products/:name
//@access   Private
exports.updateProduct = asyncHandler(async (req,res,next)=>{
    const {name, category} = req.body;

    const objId = await getCategoryObjectId(category);
    if (objId) {
        let product = await Products.findOneAndUpdate({ name: req.params.name }, { name:name, category: objId }, {
            new:true,
            runValidators:true
        }).populate({path:'category',select:'name'}); 

        res.status(200).json({
            success:true,
            data:product
        });

        if (!product) {
            return next(new ErrorResponse(`Resource not found with name ${req.params.name}`,400));
        }
    } else{
        return next(new ErrorResponse(`Resource not found`,400));
    }

    
    
});

//@desc Delete product 
//@desc products/:name
//@access   Private
exports.deleteProduct = asyncHandler(async (req,res,next)=>{
    const product = await Products.findOneAndDelete({name:req.params.name}).populate({path:'category',select:'name'}); 

    if(!product){
        return next(new ErrorResponse(`Resource not found with name ${req.params.name}`,400));
    }

    res.status(200).json({
        success:true,
        data:product
    });
   
});


