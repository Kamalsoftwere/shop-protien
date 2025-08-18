import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        console.log('Response:', response.data);
        
        const productsWithImages = response.data.products.map((product: any) => ({
          ...product,
          image: product.image.startsWith('/') ? `http://localhost:5000${product.image}` : product.image
        }));
        
        console.log('Products with images:', productsWithImages);
        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
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
              src="muscle-icon.png" 
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
                src="muscle-icon.png" 
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
