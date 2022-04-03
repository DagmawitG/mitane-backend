const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    weather:[{
        type: String,
        enum: ['authumn','spring','summer','winter'],
        default: 'summer',
    }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true }], 
    archived: { type: Boolean, default: false },
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});

// plugins
ProductSchema.plugin(mongoosePaginate);
//index
ProductSchema.index({name:'text'});
module.exports = mongoose.model('Products', ProductSchema);
