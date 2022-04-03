const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');


const MachinerySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    archived: { type: Boolean, default: false },
},{timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});


// plugins
MachinerySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Machineries', MachinerySchema);
