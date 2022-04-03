const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');


const ingredientsSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true}],
    archived: { type: Boolean, default: false },
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});

// plugins
ingredientsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Ingredients', ingredientsSchema);
