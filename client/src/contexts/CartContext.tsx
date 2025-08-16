import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: string;
    image: string;
    description: string;
  };
  quantity: number;
  price: string;
}

interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  total: number;
  isActive: boolean;
}

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // إعداد axios مع token
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const fetchCart = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await api.get('/cart');
      const cartWithImages = {
        ...response.data.cart,
        items: response.data.cart.items.map((item: any) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image.startsWith('/') ? `http://localhost:5000${item.product.image}` : item.product.image
          }
        }))
      };
      setCart(cartWithImages);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/cart/add', {
        productId,
        quantity,
      });
      const cartWithImages = {
        ...response.data.cart,
        items: response.data.cart.items.map((item: any) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image.startsWith('/') ? `http://localhost:5000${item.product.image}` : item.product.image
          }
        }))
      };
      setCart(cartWithImages);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.message || 'Error adding product to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await api.put(`/cart/update/${itemId}`, {
        quantity,
      });
      const cartWithImages = {
        ...response.data.cart,
        items: response.data.cart.items.map((item: any) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image.startsWith('/') ? `http://localhost:5000${item.product.image}` : item.product.image
          }
        }))
      };
      setCart(cartWithImages);
    } catch (error: any) {
      console.error('Error updating cart item:', error);
      alert(error.response?.data?.message || 'Error updating quantity');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await api.delete(`/cart/remove/${itemId}`);
      const cartWithImages = {
        ...response.data.cart,
        items: response.data.cart.items.map((item: any) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image.startsWith('/') ? `http://localhost:5000${item.product.image}` : item.product.image
          }
        }))
      };
      setCart(cartWithImages);
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      alert(error.response?.data?.message || 'Error removing product');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!token) return;

    try {
      setLoading(true);
      await api.delete('/cart/clear');
      setCart(null);
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      alert(error.response?.data?.message || 'Error clearing cart');
    } finally {
      setLoading(false);
    }
  };

  // حساب عدد العناصر في السلة
  const cartCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // جلب السلة عند تحميل الصفحة
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const value: CartContextType = {
    cart,
    cartCount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
