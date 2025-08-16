import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  originalPrice: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['protein', 'creatine', 'vitamins', 'vegan']
  },
  image: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  nutritionFacts: {
    servingSize: String,
    calories: String,
    protein: String,
    carbohydrates: String,
    fat: String,
    sugar: String,
    creatine: String
  },
  ingredients: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create text index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
