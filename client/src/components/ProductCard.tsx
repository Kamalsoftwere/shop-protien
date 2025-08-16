import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ProductCardProps {
  _id: string;
  image: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: string;
  originalPrice?: string;
}

const ProductCard = ({
  _id,
  image,
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart, loading } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites, loading: favoritesLoading } = useFavorites();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product page
    addToCart(_id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product page
    if (isFavorite(_id)) {
      removeFromFavorites(_id);
    } else {
      addToFavorites(_id);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-accent text-accent"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card
      onClick={() => navigate(`/product/${_id}`)}
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl bg-white border rounded-xl overflow-hidden relative"
    >
      {/* Favorite Button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={handleFavoriteClick}
        disabled={favoritesLoading}
        className={`absolute top-2 right-2 z-10 bg-white/80 hover:bg-white ${
          isFavorite(_id) ? 'text-red-500' : 'text-gray-600'
        }`}
      >
        <Heart 
          className={`w-4 h-4 ${
            isFavorite(_id) ? 'fill-red-500' : ''
          }`} 
        />
      </Button>

      <img
        src={image}
        alt={name}
        className="w-full h-52 object-cover group-hover:scale-105 transition-transform"
      />
      <CardContent className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground min-h-[48px]">
          {name}
        </h3>

        <div className="flex items-center gap-1">{renderStars(rating)}</div>

        <p className="text-xs text-muted-foreground">{reviewCount} reviews</p>

        {/* السعر */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-primary">{price}</span>
          </div>

          <Button 
            size="icon" 
            variant="outline"
            onClick={handleAddToCart}
            disabled={loading}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;