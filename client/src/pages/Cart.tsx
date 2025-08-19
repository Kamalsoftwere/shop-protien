import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  CreditCard,
  Truck,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import muscleIcon from '@/assets/muscle-icon.png';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingItems(prev => new Set(prev).add(itemId));
    await updateCartItem(itemId, newQuantity);
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleRemoveItem = async (itemId: string) => {
    if (confirm('Are you sure you want to remove this item from cart?')) {
      await removeFromCart(itemId);
    }
  };

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    // Here you can add payment logic
    alert('Payment system will be added soon');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center min-h-[400px] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src={muscleIcon} 
              alt="Muscle Icon" 
              className="w-16 h-16"
            />
            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">You haven't added any products to your cart yet</p>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary-hover">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
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
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          </div>
        <Badge variant="secondary" className="ml-2">
          {cart.items.length} items
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* قائمة المنتجات */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* صورة المنتج */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* تفاصيل المنتج */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {item.price}
                      </span>
                      
                      {/* التحكم في الكمية */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          disabled={updatingItems.has(item._id) || item.quantity <= 1}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          disabled={updatingItems.has(item._id)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* زر الحذف */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* زر تفريغ السلة */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleClearCart}
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* ملخص الطلب */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* تفاصيل الأسعار */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${cart.total.toFixed(2)}</span>
                </div>
              </div>

              {/* زر الدفع */}
              <Button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground h-12 text-lg font-semibold"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Checkout
              </Button>

              {/* معلومات إضافية */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Secure and encrypted payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4" />
                  <span>Money back guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* كوبون الخصم */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discount Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                                  <input
                    type="text"
                    placeholder="Enter discount code"
                    className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
