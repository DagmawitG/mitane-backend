const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TeamSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  profile_image: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  location: {
    type: {
      type: String,
      enum: "Point",
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    modifiedAt: 'modified_at'
  }
});


TeamSchema.plugin(mongoosePaginate);
TeamSchema.index({
  location: "2dsphere"
});
module.exports = mongoose.model('Teams', TeamSchema);