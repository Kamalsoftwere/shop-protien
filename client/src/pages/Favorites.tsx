import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  category: string;
}

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, loading } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setProductsLoading(false);
        return;
      }

      try {
        setProductsLoading(true);
        console.log('Fetching favorite products:', favorites);
        const promises = favorites.map(id => 
          axios.get(`http://localhost:5000/api/products/${id}`)
        );
        
        const responses = await Promise.all(promises);
        const products = responses.map(response => {
          const product = response.data.product;
          return {
            ...product,
            image: product.image.startsWith('/') ? `http://localhost:5000${product.image}` : product.image
          };
        });
        
        console.log('Favorite products:', products);
        setFavoriteProducts(products);
      } catch (error) {
        console.error('Error fetching favorite products:', error);
        setFavoriteProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  if (loading || productsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 hover:bg-muted">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src="/muscle-icon.png" 
              alt="Muscle Icon" 
              className="w-8 h-8"
            />
            <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'product' : 'products'} in your favorites
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/muscle-icon.png" 
                alt="Muscle Icon" 
                className="w-16 h-16"
              />
              <Heart className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start adding products to your favorites by clicking the heart icon on any product
            </p>
            <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary-hover">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
