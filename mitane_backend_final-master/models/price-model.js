const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PriceSchema = mongoose.Schema({
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Categories',required:true},
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Products',required:true,unique:true},
    price_of_the_day:[{
        price:{type:Number, required:false},
        day:{type:Date, default:Date.now}
    }],
    last_price: {type:Number, required:true}
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}});

PriceSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Prices',PriceSchema);