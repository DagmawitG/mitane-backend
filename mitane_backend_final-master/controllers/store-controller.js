const storeModel = require('../models/store-model');
const machineryModel = require('../models/machinery-model');
const productModel = require('../models/product-model');
const ingredientModel = require('../models/ingredient-model');
const storeService = require('../services/store-services');
var path = require('path');
var fs = require('fs');

const {
    getCategoryObjectId,
    getProductObjectId
} = require('../utility/getObjectId');


const uuid = require("uuid-v4");
const {
    admin
} = require("../firebase-service");
const bucket = admin.storage().bucket();

exports.getAll = async (req, res, next) => {

    try {

        // let sort = {}
        // if(req.query.sort) {
        //     sort[req.query.sort] = req.query.asc ? 1 :-1 
        // }

        // let query = {}

        // if(req.query.filter) {
        //     let filter = JSON.parse(req.query.filter);
        //     query = pick(filter, ['name', 'active']) 

        // }

        // const options = {
        //     sort: Object.values(sort).length > 0 ? sort: {
        //         'created_at': -1
        //     },
        //     page: req.query.page || 1,
        //     limit: req.query.limit || 10,
        //     populate: { path: 'product_items.product', populate: {path: 'permissions'}}
        // }
        // TODO
        // const stores = await storeModel.paginate(query,options)

        const stores = await storeModel.find({}).populate([{
                path: 'user',
                select: "name"
            },
            {
                path: 'product_items.product',
                select: 'name'
            },
            {
                path: 'machinery_items.machinery'
            },
            {
                path: 'ingredient_items.ingredients',
                select: 'name'
            },
        ])


        res.json(stores)

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.getByID = async (req, res) => {

    try {
        const store = await storeModel.findById(req.params.id).populate([{
                path: 'user',
                select: "name"
            },
            {
                path: 'product_items.product',
                select: 'name'
            },
            {
                path: 'machinery_items.machinery'
            },
            {
                path: 'ingredient_items.ingredients',
                select: 'name'
            },
        ])
        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.getByUserId = async (req, res) => {
    const user_id = req.params.id
    try {
        const store = await storeModel.findOne({
            user: {
                $in: user_id
            }
        }).populate([{
                path: 'user',
                select: "name"
            },
            {
                path: 'product_items.product'
            },
            {
                path: 'machinery_items.machinery'
            },
            {
                path: 'ingredient_items.ingredients'
            },
        ])
        if (!store) {
            throw new Error('User not found')
        }

        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.getSelfStore = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id
    const roles = user.data.roles
    try {
        const store = await storeModel.findOne({
            user: {
                $in: user_id
            }
        }).populate([{
                path: 'user',
                select: "name"
            },
            {
                path: 'product_items.product',
                select: 'name'
            },
            {
                path: 'machinery_items.machinery'
            },
            {
                path: 'ingredient_items.ingredients',

            },
            {
                path: 'ingredient_items.ingredients.category',
                model: 'Categories'
            },
        ])
        if (!store) {
            throw new Error("User doesn't have a store")
        }

        res.json(store)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.getSelfProduct = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id

    try {
        if (user) {

            const stores = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            }).select("product_items").populate([
                {
                    path: 'product_items.product',
                    select: 'name'
                },
            ]);
            res.json(stores.product_items);
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.getSelfIngredient = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id

    try {
        if (user) {

            const stores = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            }).select("ingredient_items").populate([
                {
                    path: 'ingredient_items.ingredients',
                    select: 'name'
                },
            ]);
            res.json(stores.ingredient_items);
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.getSelfMachinery = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id

    try {
        if (user) {

            const stores = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            }).select("machinery_items").populate([
                {
                    path: 'machinery_items.machinery',
                    select: 'name'
                },
            ]);
            res.json(stores.machinery_items);
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.createStore = async (req, res) => {
    const {
        user
    } = req
    const roles = user.data.roles
    const user_id = user.data._id
    const coordinates = [req.body.longitude, req.body.latitude]

    try {
        if (user) {

            const store = await storeService.createStore(user_id, roles, coordinates);
            res.json(store)
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.addItemToStore = async (req, res) => {
    const {
        user
    } = req
    let user_id = user.data._id;
    try {
        if (user) {
            let item_type;
            let item = req.body.product ? req.body.product : ((req.body.machinery) ? req.body.machinery : req.body.ingredient)
            let quantity = req.body.quantity
            let price = req.body.price
            let image = req.files.image
            console.log(`addItemToStore Image: ${image}`)
            let store;
            store = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            })
            if (store) {
                if (req.body.product) item_type = 'product';
                else {
                    if (req.body.machinery) item_type = 'machinery';
                    else item_type = 'ingredient'
                }
                let uploaded;
                if (image) {
                    const uuid4 = uuid();
                    const filename = path.join(process.cwd(), 'uploads', 'store', uuid4 + '.png');
                    console.log("File Upload write before");
                    fs.writeFileSync(filename, 'create file!');
                    console.log("File Upload write after");
                    image.mv(filename)
                    uploaded = await uploadFile(filename)
                    console.log("uploaded", uploaded);
                }
                store = await storeService.addItem(item_type, item, quantity, price, store, uploaded);
                res.json(store);
            } else {
                throw new Error("store not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.updateStore = async (req, res) => {
    const {
        user
    } = req
    try {
        if (user) {
            let item_type;
            let item = req.body.product ? req.body.product : ((req.body.machinery) ? req.body.machinery : req.body.ingredient)
            let quantity = req.body.quantity
            let price = req.body.price
            let image = (req.files) ? (!req.files.image ? req.body.image : req.files.image) : req.body.image;
            let storeItem = req.body.storeitem;
            let store;
            store = await storeModel.findById(req.params.id);
            if (store) {
                if (req.body.product) item_type = 'product';
                else {
                    if (req.body.machinery) item_type = 'machinery';
                    else item_type = 'ingredient';
                }
                var uploaded = image;
                if (image && typeof image != 'string') {
                    const uuid4 = uuid();
                    const filename = path.join(process.cwd(), 'uploads', 'store', uuid4 + '.png');
                    fs.writeFileSync(filename, 'create file!');

                    image.mv(filename)
                    uploaded = await uploadFile(filename)
                    console.log("uploaded", uploaded);
                }
                store = await storeService.updateStore(item_type, item, storeItem, quantity, price, store, uploaded);
                res.json(store);
            } else {
                throw new Error("store not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.deleteItem = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id
    try {
        if (user) {
            let item_type;
            let item = req.body.product ? req.body.product : ((req.body.machinery) ? req.body.machinery : req.body.ingredient)
            let store;
            store = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            })

            if (store) {
                if (req.body.product) item_type = 'product';
                else {
                    if (req.body.machinery) item_type = 'machinery';
                    else item_type = 'ingredient'
                }
                store = await storeService.removeItem(item_type, item, store);
                res.json(store);
            } else {
                throw new Error("store not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.getByMachineryId = async (req, res) => {
    const {
        user
    } = req;
    try {
        if (user) {
            let item_id = req.body.machinery;
            let longitude = req.body.longitude;
            let latitude = req.body.latitude;
            let item;
            item = await machineryModel.findById(item_id);

            if (item) {
                const stores = await storeModel.find({
                    machinery_items: {
                        $elemMatch: {
                            machinery: item_id
                        }
                    },
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    }
                }).populate([{
                        path: "user",
                        select: "location name phone_no",
                        populate: {
                            path: 'roles',
                            select: "name-_id"
                        }
                    },
                    {
                        path: 'product_items.product'
                    },
                    {
                        path: 'machinery_items.machinery'
                    },
                    {
                        path: 'ingredient_items.ingredients'
                    },
                ]);
                res.json(stores);
            } else {
                throw new Error("machinery not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.getMachineries = async (req, res) => {
    const {
        user
    } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if (user) {

            const stores = await storeModel.find({
                $expr: {
                    $gt: [{
                        $size: "$machinery_items"
                    }, 0]
                },
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                    }
                }
            }).populate([{
                    path: "user",
                    select: "location name phone_no",
                    populate: {
                        path: 'roles',
                        select: "name-_id"
                    }
                },
                {
                    path: 'product_items.product'
                },
                {
                    path: 'machinery_items.machinery'
                },
                {
                    path: 'ingredient_items.ingredients'
                },
            ]);
            res.json(stores);
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.getByProductId = async (req, res) => {
    const {
        user
    } = req;
    try {
        if (user) {
            let item_id = req.body.product;
            let item;
            item = await productModel.findById(item_id);

            if (item) {
                const stores = await storeModel.find({
                    product_items: {
                        $elemMatch: {
                            product: item_id
                        }
                    },
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    }
                }).populate([{
                        path: "user",
                        select: "location name phone_no",
                        populate: {
                            path: 'roles',
                            select: "name-_id"
                        }
                    },
                    {
                        path: 'product_items.product'
                    },
                    {
                        path: 'machinery_items.machinery'
                    },
                    {
                        path: 'ingredient_items.ingredients'
                    },
                ]);
                res.json(stores);
            } else {
                throw new Error("product not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.getOrderedProducts = async (req, res) => {
    const {
        user
    } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if (user) {
            const {
                keyword,
                categoryName
            } = req.query;
            const sort = res.locals.sort;
            console.log(req.query);
            let query = productModel.find();
            if (keyword) {
                query = productModel.find({
                    $text: {
                        $search: keyword
                    }
                });
            }
            if (categoryName) {
                const objId = await getCategoryObjectId(categoryName);
                console.log(`categoryName ${objId}`);
                if (objId) {
                    query.where('category').equals(objId)
                } else {
                    return res.status(400).json({
                        error: true,
                        message: 'Category not found'
                    })
                }
            }
            console.log(`Sort items ${sort}`);
            console.log(sort);
            let products = await query.sort({
                "name": 1
            }).populate({
                path: 'category',
                select: 'name'
            });
            products = (!products) ? [] : products;
            let storeProducts = [];

            for (let i = 0; i < products.length; i++) {
                var product = products[i];
                var stores = await storeModel.find({
                    product_items: {
                        $elemMatch: {
                            product: product._id
                        }
                    },
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    }
                }).populate([{
                        path: "user",
                        select: "location name phone_no",
                        populate: {
                            path: 'roles',
                            select: "name-_id"
                        }
                    }, {
                        path: 'product_items.product',
                    },
                    {
                        path: 'product_items.product.category',
                        model: 'Categories'
                    },
                ]);


                for (let j = 0; j < stores.length; j++) {
                    const store = stores[j];
                    let product_item;
                    for (let k = 0; k < store.product_items.length; k++) {
                        if (store.product_items[k].product._id.toString() == product._id.toString()) {
                            product_item = store.product_items[k];
                            product_item.product = product;
                            break;
                        }
                    }
                    storeProducts.push({
                        id: store._id,
                        product: product_item,
                        user: store.user,
                        location: store.location
                    })
                }
            }

            storeProducts.sort(function (a, b) {
                return (!a.product.updatedAt) ? 1 : a.product.updatedAt - b.product.updatedAt
            });
            if (sort) {
                if (sort.date) {
                    if (sort.date == 1)
                        storeProducts.sort(function (a, b) {
                            return (!a.product.updatedAt) ? 1 : a.product.updatedAt - b.product.updatedAt
                        });
                    if (sort.date == -1)
                        storeProducts.reverse(function (a, b) {
                            return (!a.product.updatedAt) ? 1 : a.product.updatedAt - b.product.updatedAt
                        });
                }
                if (sort.price) {
                    if (sort.price == 1)
                        storeProducts.sort(function (a, b) {
                            return a.product.price_per_kg - b.product.price_per_kg
                        });
                    if (sort.price == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.product.price_per_kg - b.product.price_per_kg
                        });
                }
                if (sort.quantity) {
                    if (sort.quantity == 1)
                        storeProducts.sort(function (a, b) {
                            return a.product.quantity - b.product.quantity
                        });
                    if (sort.quantity == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.product.quantity - b.product.quantity
                        });
                }
                if (sort.name) {
                    if (sort.name == 1)
                        storeProducts.sort(function (a, b) {
                            return a.product.name.localeCompare(b.product.name)
                        });
                    if (sort.name == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.product.name.localeCompare(b.product.name)
                        });
                }
            }

            res.status(200).json({
                error: false,
                data: storeProducts
            });
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.getOrderedIngrident = async (req, res) => {
    const {
        user
    } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if (user) {
            const {
                keyword,
                categoryName
            } = req.query;
            const sort = res.locals.sort;
            console.log(req.query);
            let query = ingredientModel.find();
            if (keyword) {
                query = ingredientModel.find({
                    $text: {
                        $search: keyword
                    }
                });
            }
            if (categoryName) {
                const objId = await getCategoryObjectId(categoryName);
                console.log(`categoryName ${objId}`);
                if (objId) {
                    query.where('category').equals(objId)
                } else {
                    return res.status(400).json({
                        error: true,
                        message: 'Category not found'
                    })
                }
            }
            console.log(`Sort items ${sort}`);
            console.log(sort);
            let products = await query.sort({
                "name": 1
            }).populate({
                path: 'category',
                select: 'name'
            });
            products = (!products) ? [] : products;
            let storeProducts = [];

            for (let i = 0; i < products.length; i++) {
                var product = products[i];
                var stores = await storeModel.find({
                    ingredient_items: {
                        $elemMatch: {
                            ingredients: product._id
                        }
                    },
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    }
                }).populate([{
                        path: "user",
                        select: "location name phone_no",
                        populate: {
                            path: 'roles',
                            select: "name-_id"
                        }
                    }, {
                        path: 'ingredient_items.ingredients',
                    },
                    {
                        path: 'ingredient_items.ingredients.category',
                        model: 'Categories'
                    },
                ]);


                for (let j = 0; j < stores.length; j++) {
                    const store = stores[j];
                    let product_item;
                    for (let k = 0; k < store.ingredient_items.length; k++) {
                        if (store.ingredient_items[k].ingredients._id.toString() == product._id.toString()) {
                            product_item = store.ingredient_items[k];
                            product_item.ingredients = product;
                            break;
                        }
                    }
                    storeProducts.push({
                        id: store._id,
                        ingredient: product_item,
                        user: store.user,
                        location: store.location
                    })
                }
            }

            storeProducts.sort(function (a, b) {
                return (!a.ingredient.updatedAt) ? 1 : a.ingredient.updatedAt - b.ingredient.updatedAt
            });
            if (sort) {
                if (sort.date) {
                    if (sort.date == 1)
                        storeProducts.sort(function (a, b) {
                            return (!a.ingredient.updatedAt) ? 1 : a.ingredient.updatedAt - b.ingredient.updatedAt
                        });
                    if (sort.date == -1)
                        storeProducts.reverse(function (a, b) {
                            return (!a.ingredient.updatedAt) ? 1 : a.ingredient.updatedAt - b.ingredient.updatedAt
                        });
                }
                if (sort.price) {
                    if (sort.price == 1)
                        storeProducts.sort(function (a, b) {
                            return a.ingredient.price_per_kg - b.ingredient.price_per_kg
                        });
                    if (sort.price == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.ingredient.price_per_kg - b.ingredient.price_per_kg
                        });
                }
                if (sort.quantity) {
                    if (sort.quantity == 1)
                        storeProducts.sort(function (a, b) {
                            return a.ingredient.quantity - b.ingredient.quantity
                        });
                    if (sort.quantity == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.ingredient.quantity - b.ingredient.quantity
                        });
                }
                if (sort.name) {
                    if (sort.name == 1)
                        storeProducts.sort(function (a, b) {
                            return a.ingredient.name.localeCompare(b.ingredient.name)
                        });
                    if (sort.name == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.ingredient.name.localeCompare(b.ingredient.name)
                        });
                }
            }

            res.status(200).json({
                error: false,
                data: storeProducts
            });
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.getOrderedMachinery = async (req, res) => {
    const {
        user
    } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if (user) {
            const {
                keyword
            } = req.query;
            const sort = res.locals.sort;
            console.log(req.query);
            let query = machineryModel.find();
            if (keyword) {
                query = machineryModel.find({
                    $text: {
                        $search: keyword
                    }
                });
            }

            console.log(`Sort items ${sort}`);
            console.log(sort);
            let products = await query.sort({
                "name": 1
            }).populate();
            products = (!products) ? [] : products;
            let storeProducts = [];

            for (let i = 0; i < products.length; i++) {
                var product = products[i];
                var stores = await storeModel.find({
                    machinery_items: {
                        $elemMatch: {
                            machinery: product._id
                        }
                    },
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    }
                }).populate([{
                    path: "user",
                    select: "location name phone_no",
                    populate: {
                        path: 'roles',
                        select: "name-_id"
                    }
                }, {
                    path: 'machinery_items.machinery',
                }]);


                for (let j = 0; j < stores.length; j++) {
                    const store = stores[j];
                    let product_item;
                    for (let k = 0; k < store.machinery_items.length; k++) {
                        if (store.machinery_items[k].machinery._id.toString() == product._id.toString()) {
                            product_item = store.machinery_items[k];
                            product_item.machinery = product;
                            break;
                        }
                    }
                    storeProducts.push({
                        id: store._id,
                        machinery: product_item,
                        user: store.user,
                        location: store.location
                    })
                }
            }

            storeProducts.sort(function (a, b) {
                return (!a.machinery.updatedAt) ? 1 : a.machinery.updatedAt - b.machinery.updatedAt
            });
            if (sort) {
                if (sort.date) {
                    if (sort.date == 1)
                        storeProducts.sort(function (a, b) {
                            return (!a.machinery.updatedAt) ? 1 : a.machinery.updatedAt - b.machinery.updatedAt
                        });
                    if (sort.date == -1)
                        storeProducts.reverse(function (a, b) {
                            return (!a.machinery.updatedAt) ? 1 : a.machinery.updatedAt - b.machinery.updatedAt
                        });
                }
                if (sort.price) {
                    if (sort.price == 1)
                        storeProducts.sort(function (a, b) {
                            return a.machinery.price_per_piece - b.machinery.price_per_piece
                        });
                    if (sort.price == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.machinery.price_per_piece - b.machinery.price_per_piece
                        });
                }
                if (sort.quantity) {
                    if (sort.quantity == 1)
                        storeProducts.sort(function (a, b) {
                            return a.machinery.quantity - b.machinery.quantity
                        });
                    if (sort.quantity == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.machinery.quantity - b.machinery.quantity
                        });
                }
                if (sort.name) {
                    if (sort.name == 1)
                        storeProducts.sort(function (a, b) {
                            return a.machinery.name.localeCompare(b.machinery.name)
                        });
                    if (sort.name == -1)
                        storeProducts.reverse(function (a, b) {
                            return a.machinery.name.localeCompare(b.machinery.name)
                        });
                }
            }

            res.status(200).json({
                error: false,
                data: storeProducts
            });
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        console.log(error);
        throw error;
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}


exports.getProducts = async (req, res) => {
    const {
        user
    } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if (user) {

            const stores = await storeModel.find({
                $expr: {
                    $gt: [{
                        $size: "$product_items"
                    }, 0]
                },
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                    }
                }
            }).populate([{
                    path: "user",
                    select: "location name phone_no",
                    populate: {
                        path: 'roles',
                        select: "name-_id"
                    }
                },
                {
                    path: 'product_items.product'
                },
                {
                    path: 'machinery_items.machinery'
                },
                {
                    path: 'ingredient_items.ingredients'
                },
            ]);

            res.json(stores);
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.getByingredientsId = async (req, res) => {
    const {
        user
    } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;

    try {
        if (user) {
            let item_id = req.body.ingredient;
            let item;
            item = await ingredientModel.findById(item_id);

            if (item) {
                const stores = await storeModel.find({
                    ingredient_items: {
                        $elemMatch: {
                            ingredients: item_id
                        }
                    },
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },
                        }
                    }
                }).populate([{
                        path: "user",
                        select: "location name phone_no",
                        populate: {
                            path: 'roles',
                            select: "name-_id"
                        }
                    },
                    {
                        path: 'product_items.product'
                    },
                    {
                        path: 'machinery_items.machinery'
                    },
                    {
                        path: 'ingredient_items.ingredients'
                    },
                ]);
                res.json(stores);
            } else {
                throw new Error("ingredient not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.getIngredients = async (req, res) => {
    const {
        user
    } = req;
    const latitude = req.body.latitude || 50;
    const longitude = req.body.longitude || 60;
    try {
        if (user) {

            const stores = await storeModel.find({
                $expr: {
                    $gt: [{
                        $size: "$ingredient_items"
                    }, 0]
                },
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                    }
                }
            }).populate([{
                    path: "user",
                    select: "location name phone_no",
                    populate: {
                        path: 'roles',
                        select: "name-_id"
                    }
                },
                {
                    path: 'product_items.product'
                },
                {
                    path: 'machinery_items.machinery'
                },
                {
                    path: 'ingredient_items.ingredients'
                },
            ]);
            res.json(stores);
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.clearStore = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id
    try {
        if (user) {
            let store;
            store = await storeModel.findOne({
                user: {
                    $in: user_id
                }
            })

            if (store) {
                store = await storeService.clearStore(store);
                res.json(store);
            } else {
                throw new Error("store not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.deleteStore = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id
    try {
        if (user) {
            let store;
            store = await storeModel.findOneAndDelete({
                user: {
                    $in: user_id
                }
            }).populate([{
                    path: 'user',
                    select: "name"
                },
                {
                    path: 'product_items.product'
                },
                {
                    path: 'machinery_items.machinery'
                },
                {
                    path: 'ingredient_items.ingredients'
                },
            ])

            if (store) {
                res.json(store);
            } else {
                throw new Error("store not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}


async function uploadFile(filename, dest, type, uuid4 = uuid()) {
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid4,
        },
        contentType: type == null ? "image/jpg" : type,
        cacheControl: "public, max-age=31536000",
    };
    // Uploads a local file to the bucket
    let file = (await bucket.upload(filename, {
        gzip: true,
        destination: (dest != undefined && dest) ?
            dest : "uploads/team/" + uuid4 + ".jpg",
        metadata: metadata,
    }))[0];

    console.log(`${filename} uploaded.`);
    return "https://storage.googleapis.com/" + bucket.name + "/" + (file.name);
}