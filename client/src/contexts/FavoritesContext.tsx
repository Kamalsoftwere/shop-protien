import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (productId: string) => boolean;
  addToFavorites: (productId: string) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  loading: boolean;
  fetchFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const fetchFavorites = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      console.log('Fetching favorites for user');
      const response = await api.get('/auth/favorites');
      console.log('Favorites response:', response.data);
      setFavorites(response.data.favorites.map((product: any) => product._id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    if (!token) {
      alert('Please login first to add favorites');
      return;
    }

    try {
      setLoading(true);
      await api.post(`/auth/favorites/${productId}`);
      setFavorites(prev => [...prev, productId]);
    } catch (error: any) {
      console.error('Error adding to favorites:', error);
      alert(error.response?.data?.message || 'Error adding to favorites');
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!token) return;

    try {
      setLoading(true);
      await api.delete(`/auth/favorites/${productId}`);
      setFavorites(prev => prev.filter(id => id !== productId));
    } catch (error: any) {
      console.error('Error removing from favorites:', error);
      alert(error.response?.data?.message || 'Error removing from favorites');
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  const value: FavoritesContextType = {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    loading,
    fetchFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
