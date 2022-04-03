const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StoreSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },

  product_items: [{
    type: new mongoose.Schema({
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
      },
      quantity: {
        type: Number
      },
      image: {
        type: String
      },
      price_per_kg: {
        type: Number
      }
    }, {
      timestamps: true
    })
  }],
  machinery_items: [{
    type: new mongoose.Schema({
      machinery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machineries'
      },
      quantity: {
        type: Number,
      },
      image: {
        type: String
      },
      price_per_piece: {
        type: Number,
      }
    }, {
      timestamps: true
    })
  }],
  ingredient_items: [{
    type: new mongoose.Schema({
      ingredients: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredients'
      },
      quantity: {
        type: Number,
      },
      image: {
        type: String
      },
      price_per_kg: {
        type: Number,
      }

    }, {
      timestamps: true
    })
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

StoreSchema.plugin(mongoosePaginate);
StoreSchema.index({
  location: "2dsphere"
});
module.exports = mongoose.model('Stores', StoreSchema);