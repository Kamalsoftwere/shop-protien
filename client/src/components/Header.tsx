import { User, ShoppingCart, Search, X, LogOut, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";


interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const Header = () => {
  const { searchQuery, setSearchQuery, isSearching, setIsSearching } = useSearch();
  const { cartCount } = useCart();
  const { favorites } = useFavorites();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          // Verify token with server
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token is invalid, clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          // Network error or invalid token, clear localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        // No token or user data, ensure user is null
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleSearch = () => {
    setSearchQuery(inputValue);
    setIsSearching(inputValue.trim().length > 0);
  };

  const handleClearSearch = () => {
    setInputValue('');
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        Free shipping on orders over $50 | Premium supplements for your health journey
      </div>

      {/* Main Nav */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-hero rounded-md flex items-center justify-center relative">
            <img 
              src="favicon.png" 
              alt="Muscle Icon" 
              className="w-6 h-6 absolute inset-0 m-auto"
            />
          </div>
          <span className="text-xl font-semibold text-foreground">KAMAL DALLASHEH</span>
        </div>

        {/* Search */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full pr-20"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              {inputValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearch}
                className="h-8 w-8 p-0 hover:bg-muted"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="flex gap-4 text-muted-foreground">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary">
                {user.firstName}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="p-1 h-auto"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <User className="w-6 h-6 cursor-pointer hover:text-primary" />
            </Link>
          )}
          <Link to="/favorites" className="relative">
            <Heart className="w-6 h-6 cursor-pointer hover:text-primary" />
            {favorites.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {favorites.length > 99 ? '99+' : favorites.length}
              </Badge>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-primary" />
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {cartCount > 99 ? '99+' : cartCount}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;