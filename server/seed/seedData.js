import Product from '../models/Product.js';

const seedProducts = [
  // PROTEIN PRODUCTS
  {
    name: "Clear Whey Protein Powder",
    description: "Our Clear Whey Protein is a premium, refreshing protein drink that provides 20g of high-quality protein per serving. Unlike traditional protein shakes, this clear formula mixes easily with water to create a light, refreshing drink.",
    price: "174.22 ₪",
    originalPrice: "199.99 ₪",
    rating: 4.5,
    reviewCount: 6089,
    category: "protein",
    image: "/assets/protein-clear.jpg",
    features: [
      "20g of high-quality whey protein per serving",
      "Light and refreshing - not thick or milky",
      "Available in delicious fruity flavors",
      "Fast absorption for optimal muscle recovery",
      "Low in sugar and fat"
    ],
    nutritionFacts: {
      servingSize: "25g",
      calories: "90",
      protein: "20g",
      carbohydrates: "1g",
      fat: "0.1g",
      sugar: "0.5g"
    },
    ingredients: "Whey Protein Isolate (Milk), Natural Flavoring, Citric Acid, Sucralose, Natural Colors",
    inStock: true,
    featured: true
  },
  {
    name: "Impact Creatine",
    description: "Pure Creatine Monohydrate to help increase physical performance in successive bursts of short-term, high intensity exercise.",
    price: "32.85 ₪",
    originalPrice: "",
    rating: 4.5,
    reviewCount: 4312,
    category: "creatine",
    image: "/assets/creatine-impact.jpg",
    features: [
      "3g of pure creatine monohydrate per serving",
      "Supports explosive power and strength",
      "Enhances muscle energy production",
      "Unflavored - mixes easily with any drink",
      "Pharmaceutical grade quality"
    ],
    nutritionFacts: {
      servingSize: "3g",
      calories: "0",
      protein: "0g",
      carbohydrates: "0g",
      fat: "0g",
      creatine: "3g"
    },
    ingredients: "100% Creatine Monohydrate",
    inStock: true,
    featured: true
  },
  {
    name: "Impact Whey Isolate Powder",
    description: "Our premium Whey Protein Isolate provides 25g of high-quality protein with minimal lactose, making it perfect for those with dairy sensitivities.",
    price: "153.00 ₪",
    originalPrice: "",
    rating: 4.5,
    reviewCount: 3971,
    category: "protein",
    image: "/assets/whey-isolate.jpg",
    features: [
      "25g of premium whey protein isolate per serving",
      "90% protein content - highest quality",
      "Low in lactose, fat, and carbs",
      "Fast-absorbing for post-workout recovery",
      "Available in multiple delicious flavors"
    ],
    nutritionFacts: {
      servingSize: "30g",
      calories: "110",
      protein: "25g",
      carbohydrates: "1g",
      fat: "0.5g",
      sugar: "0.5g"
    },
    ingredients: "Whey Protein Isolate (Milk), Natural and Artificial Flavoring, Lecithin, Sucralose",
    inStock: true,
    featured: true
  },
  {
    name: "Impact Diet Whey",
    description: "Our Diet Whey blend combines high-quality protein with added ingredients to support your weight management goals.",
    price: "187.68 ₪",
    originalPrice: "",
    rating: 4.5,
    reviewCount: 2546,
    category: "protein",
    image: "/assets/diet-whey.jpg",
    features: [
      "22g of protein per serving",
      "Added L-Carnitine and Green Tea Extract",
      "Lower calorie formula",
      "Supports lean muscle maintenance",
      "Great taste with added nutritional benefits"
    ],
    nutritionFacts: {
      servingSize: "30g",
      calories: "95",
      protein: "22g",
      carbohydrates: "2g",
      fat: "0.3g",
      sugar: "0.8g"
    },
    ingredients: "Whey Protein Blend (Milk), L-Carnitine, Green Tea Extract, Natural Flavoring, Sucralose",
    inStock: true,
    featured: false
  },

  // CREATINE PRODUCTS
  {
    name: "Creatine Monohydrate Powder",
    description: "Pure pharmaceutical-grade creatine monohydrate for maximum muscle power and strength gains.",
    price: "45.99 ₪",
    originalPrice: "",
    rating: 4.7,
    reviewCount: 2156,
    category: "creatine",
    image: "/assets/creatine-powder.jpg",
    features: [
      "5g of pure creatine monohydrate per serving",
      "Pharmaceutical-grade quality",
      "Unflavored - mixes with any drink",
      "Supports explosive power and strength",
      "Enhances muscle energy production"
    ],
    nutritionFacts: {
      servingSize: "5g",
      calories: "0",
      protein: "0g",
      carbohydrates: "0g",
      fat: "0g",
      creatine: "5g"
    },
    ingredients: "100% Creatine Monohydrate",
    inStock: true,
    featured: true
  },
  {
    name: "Creatine HCL Capsules",
    description: "Advanced creatine hydrochloride in convenient capsule form for easy absorption.",
    price: "67.50 ₪",
    originalPrice: "89.99 ₪",
    rating: 4.4,
    reviewCount: 892,
    category: "creatine",
    image: "/assets/creatine-capsules.jpg",
    features: [
      "750mg creatine HCL per capsule",
      "Enhanced absorption formula",
      "No loading phase required",
      "Convenient capsule form",
      "Reduced water retention"
    ],
    nutritionFacts: {
      servingSize: "2 capsules",
      calories: "0",
      protein: "0g",
      carbohydrates: "0g",
      fat: "0g",
      creatine: "1.5g"
    },
    ingredients: "Creatine Hydrochloride, Vegetable Cellulose Capsule",
    inStock: true,
    featured: false
  },



  // VEGAN PRODUCTS
  {
    name: "Vegan Protein Powder",
    description: "Plant-based protein powder made from pea, rice, and hemp proteins. Perfect for vegan athletes.",
    price: "89.99 ₪",
    originalPrice: "119.99 ₪",
    rating: 4.4,
    reviewCount: 1234,
    category: "vegan",
    image: "/assets/vegan-protein.jpg",
    features: [
      "22g complete plant protein",
      "Pea, rice, and hemp blend",
      "Easy to digest",
      "No artificial ingredients",
      "Suitable for vegans"
    ],
    nutritionFacts: {
      servingSize: "30g",
      calories: "120",
      protein: "22g",
      carbohydrates: "4g",
      fat: "2g",
      fiber: "3g"
    },
    ingredients: "Pea Protein, Brown Rice Protein, Hemp Protein, Natural Flavors, Stevia",
    inStock: true,
    featured: true
  },
  {
    name: "Vegan BCAA",
    description: "Plant-based branched-chain amino acids for muscle recovery and growth. 100% vegan formula.",
    price: "56.99 ₪",
    originalPrice: "",
    rating: 4.2,
    reviewCount: 678,
    category: "vegan",
    image: "/assets/vegan-bcaa.jpg",
    features: [
      "5g BCAA per serving",
      "Plant-based formula",
      "Great taste",
      "Supports muscle recovery",
      "Vegan certified"
    ],
    nutritionFacts: {
      servingSize: "5g",
      calories: "0",
      protein: "0g",
      carbohydrates: "0g",
      fat: "0g",
      bcaa: "5g"
    },
    ingredients: "Fermented BCAA (L-Leucine, L-Isoleucine, L-Valine), Natural Flavors, Stevia",
    inStock: true,
    featured: false
  },


];

export const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert seed products
    const products = await Product.insertMany(seedProducts);
    
    console.log(`Database seeded with ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

export default seedProducts;
