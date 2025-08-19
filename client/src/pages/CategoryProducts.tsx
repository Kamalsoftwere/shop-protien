import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';

// Import product images
import proteinClear from "@/assets/protein-clear.jpg";
import creatineImpact from "@/assets/creatine-impact.jpg";
import wheyIsolate from "@/assets/whey-isolate.jpg";
import dietWhey from "@/assets/diet-whey.jpg";
import veganProtein from "@/assets/vegan-protein.jpg";
import veganBcaa from "@/assets/vegan-bcaa.jpg";
import creatinePowder from "@/assets/creatine-powder.jpg";
import creatineCapsules from "@/assets/creatine-capsules.jpg";
import muscleIcon from "@/assets/muscle-icon.png";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  features: string[];
  nutritionFacts: any;
  ingredients: string;
  inStock: boolean;
  featured: boolean;
}

const categoryNames = {
  'protein': 'Protein Products',
  'creatine': 'Creatine Products',
  'vitamins': 'Vitamins & Minerals',
  'vegan': 'Vegan Products'
};

// Static product data for demo
const staticProducts = {
  protein: [
    {
      _id: 'whey-isolate',
      name: 'Impact Whey Isolate Powder',
      description: 'Premium whey protein isolate for muscle building and recovery',
      price: '153.00',
      originalPrice: '179.99',
      rating: 4.5,
      reviewCount: 3971,
      category: 'protein',
      image: wheyIsolate,
      features: ['High protein content', 'Low carbs', 'Fast absorption'],
      nutritionFacts: { protein: '25g', carbs: '3g', fat: '1g' },
      ingredients: 'Whey protein isolate, natural flavors',
      inStock: true,
      featured: true
    },
    {
      _id: 'clear-whey-protein',
      name: 'Clear Whey Protein Powder',
      description: 'Refreshing clear protein drink with great taste',
      price: '174.22',
      originalPrice: '199.99',
      rating: 4.5,
      reviewCount: 6089,
      category: 'protein',
      image: proteinClear,
      features: ['Clear formula', 'Great taste', 'Easy to mix'],
      nutritionFacts: { protein: '20g', carbs: '5g', fat: '0g' },
      ingredients: 'Hydrolyzed collagen, natural flavors',
      inStock: true,
      featured: false
    },
    {
      _id: 'diet-whey',
      name: 'Impact Diet Whey',
      description: 'Low-calorie whey protein for weight management',
      price: '187.68',
      originalPrice: '209.99',
      rating: 4.5,
      reviewCount: 2546,
      category: 'protein',
      image: dietWhey,
      features: ['Low calorie', 'High protein', 'Weight management'],
      nutritionFacts: { protein: '22g', carbs: '2g', fat: '1g' },
      ingredients: 'Whey protein concentrate, natural flavors',
      inStock: true,
      featured: true
    }
  ],
  creatine: [
    {
      _id: 'creatine-monohydrate',
      name: 'Creatine Monohydrate',
      description: 'Pure creatine monohydrate for strength and power',
      price: '29.99',
      originalPrice: '39.99',
      rating: 4.9,
      reviewCount: 203,
      category: 'creatine',
      image: creatinePowder,
      features: ['Pure creatine', 'No fillers', 'Proven results'],
      nutritionFacts: { creatine: '5g', calories: '20' },
      ingredients: 'Creatine monohydrate',
      inStock: true,
      featured: true
    },
    {
      _id: 'impact-creatine',
      name: 'Impact Creatine',
      description: 'Advanced creatine formula with enhanced absorption',
      price: '32.85',
      originalPrice: '49.99',
      rating: 4.5,
      reviewCount: 4312,
      category: 'creatine',
      image: creatineImpact,
      features: ['Enhanced absorption', 'No loading phase', 'Better results'],
      nutritionFacts: { creatine: '3g', betaAlanine: '2g' },
      ingredients: 'Creatine HCl, beta-alanine, natural flavors',
      inStock: true,
      featured: false
    },
    {
      _id: 'creatine-capsules',
      name: 'Creatine Capsules',
      description: 'Convenient creatine capsules for easy consumption',
      price: '34.99',
      originalPrice: '44.99',
      rating: 4.5,
      reviewCount: 98,
      category: 'creatine',
      image: creatineCapsules,
      features: ['Easy to take', 'No taste', 'Convenient'],
      nutritionFacts: { creatine: '2.5g', capsules: '60' },
      ingredients: 'Creatine monohydrate, vegetable capsule',
      inStock: true,
      featured: false
    }
  ],
  vegan: [
    {
      _id: 'vegan-protein',
      name: 'Vegan Protein Blend',
      description: 'Complete plant-based protein for vegans',
      price: '54.99',
      originalPrice: '74.99',
      rating: 4.6,
      reviewCount: 134,
      category: 'vegan',
      image: veganProtein,
      features: ['Plant-based', 'Complete protein', 'Easy digestible'],
      nutritionFacts: { protein: '22g', carbs: '4g', fat: '2g' },
      ingredients: 'Pea protein, rice protein, natural flavors',
      inStock: true,
      featured: true
    },
    {
      _id: 'vegan-bcaa',
      name: 'Vegan BCAA',
      description: 'Plant-based branched-chain amino acids',
      price: '39.99',
      originalPrice: '49.99',
      rating: 4.4,
      reviewCount: 87,
      category: 'vegan',
      image: veganBcaa,
      features: ['Plant-based', 'BCAA blend', 'Recovery support'],
      nutritionFacts: { bcaa: '5g', leucine: '2.5g' },
      ingredients: 'Fermented BCAA, natural flavors',
      inStock: true,
      featured: false
    }
  ]
};

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        console.log('Fetching products for category:', category);
        
        // Try to fetch from API first
        try {
          const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
          console.log('API Response:', response.data);
          
          const productsWithImages = response.data.products.map((product: any) => ({
            ...product,
            image: product.image.startsWith('/') ? `http://localhost:5000${product.image}` : product.image
          }));
          
          console.log('Products with images:', productsWithImages);
          setProducts(productsWithImages);
        } catch (apiError) {
          console.log('API not available, using static data');
          // Fallback to static data
          const categoryProducts = staticProducts[category as keyof typeof staticProducts] || [];
          setProducts(categoryProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static data
        const categoryProducts = staticProducts[category as keyof typeof staticProducts] || [];
        setProducts(categoryProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categoryName = categoryNames[category as keyof typeof categoryNames] || 'Products';

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <img 
              src={muscleIcon} 
              alt="Muscle Icon" 
              className="w-8 h-8"
            />
            <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src={muscleIcon} 
                alt="Muscle Icon" 
                className="w-12 h-12"
              />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground mb-4">No products available in this category yet.</p>
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
