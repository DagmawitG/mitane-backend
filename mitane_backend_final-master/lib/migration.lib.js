
var { permissions, roles, users, machineries, categories, farming_ingredient, products } = require('../config/migrations')


const logger = require('../config/logger');

const permissionModel = require('../models/permission-model')
const roleModel = require('../models/role-model')
const machineryModel = require('../models/machinery-model')
const categoryModel = require('../models/category-model')
const ingredientsModel = require('../models/ingredient-model')
const productModel = require('../models/product-model')
const userModel = require('../models/user-model')
const priceModel = require('../models/price-model')

module.exports = {
    
    migratePermissions: async () => {
        logger.info(`Checking permissions migrations...`);
        // retrieve all permissions from db
        let permissionDocument =  await permissionModel.find({})
        
        if(permissions.length > permissionDocument.length) {
                logger.info(`Found new permissions...`);
                // some operation
                permissions = permissions.filter(per => {
                    return permissionDocument.findIndex(val => val.name === per) === -1
                })
                await permissionModel.insertMany([
                    ...permissions.map(val => ({name: val}))
                ])
                logger.info(`migrate permission completed ...`);
                return;
                
            }
            logger.info(`Noting to migrate fro permission ...`);
    },

    migrateRoles: async () => {
        logger.info(`Checking role migrations...`);

        await Object.keys(roles).forEach( async index => {
            // count if role exists
            let roleDocumentCount = await roleModel.countDocuments({ name: index})
            if(roleDocumentCount === 0) {
                logger.info(`Found new role...`);
                 let data =  await permissionModel.find({
                      name: {
                          $in: roles[index]
                      }
                  })
                  
                  await roleModel.create({
                        name: index,
                        permissions: data.map(val => val._id)
                    })
                    logger.info(`completed ${index} role migrated...`);
                   
            }
            })
            logger.info(`completed roles migrations...`);
        
    },

    migrateMachineries: async () => {
        logger.info(`Checking machineries migrations...`);
        // retrieve all machineries from db
        let machineryDocument =  await machineryModel.find({})
        
        if(machineries.length > machineryDocument.length) {
                logger.info(`Found new machineries...`);
                // some operation
                machineries = machineries.filter(per => {
                    return machineryDocument.findIndex(val => val.name === per) === -1
                })
                await machineryModel.insertMany([
                    ...machineries.map(val => (val))
                ])
                logger.info(`migrate machinery completed ...`);
                return;
                
            }
            logger.info(`Noting to migrate from machinery ...`);
    },

    migrateCategories: async () => {
        logger.info(`Checking categories migrations...`);
        // retrieve all categories from db
        let categoryDocument =  await categoryModel.find({})
        
        if(categories.length > categoryDocument.length) {
                logger.info(`Found new categories...`);
                // some operation
                categories = categories.filter(per => {
                    return categoryDocument.findIndex(val => val.name === per) === -1
                })
                await categoryModel.insertMany([
                    ...categories.map(val => (val))
                ])
                logger.info(`migrate category completed ...`);
                return;
                
            }
            logger.info(`Noting to migrate from category ...`);
    },

    migrateingredientss: async () => {
        logger.info(`Checking ingredients migrations...`);

        await farming_ingredient.forEach( async ingredients => {
            // count if ingredients exists
            let ingredientsDocumentCount = await ingredientsModel.countDocuments({ 
                name: ingredients.name
            })
            if(ingredientsDocumentCount === 0) {
                logger.info(`Found new ingredients...`);
                 let data =  await categoryModel.find({
                      name: {
                          $in: ingredients.category
                      }
                  })
                  logger.info(`here's the data ${data._id}`)
                  
                  await ingredientsModel.create({
                        name: ingredients.name,
                        category: data.map(val => val._id)
                    })
                    logger.info(`completed ${ingredients.name} ingredients migrated...`);
                   
            }
            })
            logger.info(`completed ingredientss migrations...`);
        
    },

    migrateProducts: async () => {
        logger.info(`Checking product migrations...`);

        await products.forEach( async product => {
            // count if product exists
            let productDocumentCount = await productModel.countDocuments({ 
                name: product.name
            })
            if(productDocumentCount === 0) {
                logger.info(`Found new product...`);
                 let data =  await categoryModel.find({
                      name: {
                          $in: product.category
                      }
                  })
                  logger.info(`here's the data ${data._id}`)
                  
                  await productModel.create({
                        name: product.name,
                        weather: product.weather? product.weather: ['summer'],
                        category: data.map(val => val._id)
                    })
                    logger.info(`completed ${product.name} product migrated...`);
                   
            }
            })
            logger.info(`completed products migrations...`);
        
    },

    migrateUsers: async () => {
        logger.info(`Checking users migrations...`);

        await users.forEach(async user => {
            let userDocumentCount = await userModel.countDocuments({
                name: user.name
            })
            
                if(userDocumentCount === 0) {
                    let data = await roleModel.find({
                        name: {
                            $in: user.roles // [1,2,3]
                        }
                    })
                        await userModel.create({
                            ...user,
                            roles: data.map(val => val._id)
                        })
                        logger.info(`completed ${user.name} user migrated...`);
                        
                }
        })
        logger.info(`completed users migrations...`);
    },

    migratePrices: async () => {
        logger.info(`Checking price migrations...`);
        const products = await productModel.find({});
        const max = 500;
        const min = 300;
        if(products){
            await products.forEach(async product => {
                let priceDocumentCount = await priceModel.countDocuments({
                    product: product._id
                })
                const randomPrice =  Math.floor(Math.random() * (max - min) + min);
                if(priceDocumentCount === 0) {
                    await priceModel.create({
                        category: product.category,
                        product: product._id,
                        price_of_the_day: [{}],
                        last_price: 0

                    })
            
                    logger.info(`completed ${product.name} price migrated...`);
                }
                // else{
                //     const dailyPrice = await priceModel.findOneAndUpdate({product:product._id},{$push:{price_of_the_day:randomPrice, last_price: randomPrice}},{
                //         new:true,
                //         runValidators:true
                //     })
                
                //     if(!dailyPrice){
                //         next(new ErrorResponse(`Product not found`,400));
                //     }
                // }
            })
        }
        
        logger.info(`completed price migrations...`);
    }

}