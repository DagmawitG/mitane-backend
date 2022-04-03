const Product = require('../models/product-model');
const Category = require('../models/category-model');
const Role = require('../models/role-model');


exports.getProductObjectId = async (name)=>{
    const product = await Product.findOne({name:name});
    if(!product) return null;
    return product._id;
}

exports.getCategoryObjectId = async (name)=>{
    const category = await Category.findOne({name:name});
    if(!category) return null;
    return category._id;
}

exports.getRoleObjectId = async (name)=>{
    const role = await Role.findOne({name:name});
    if(!role) return null;
    return role._id;
}