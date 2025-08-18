import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, CreditCard, Shield, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import ShareProduct from "@/components/ShareProduct";
import { useState, useEffect } from "react";
import axios from "axios";

// Import product images
import proteinClear from "@/assets/protein-clear.jpg";
import creatineImpact from "@/assets/creatine-impact.jpg";
import wheyIsolate from "@/assets/whey-isolate.jpg";
import dietWhey from "@/assets/diet-whey.jpg";

const productData = {
  "clear-whey-protein": {
    id: "clear-whey-protein",
    name: "Clear Whey Protein Powder",
    image: proteinClear,
    rating: 4.5,
    reviewCount: 6089,
    price: "174.22 ₪",
    originalPrice: "199.99 ₪",
    description:
      "Our Clear Whey Protein is a premium, refreshing protein drink that provides 20g of high-quality protein per serving. Unlike traditional protein shakes, this clear formula mixes easily with water to create a light, refreshing drink.",
    features: [
      "20g of high-quality whey protein per serving",
      "Light and refreshing - not thick or milky",
      "Available in delicious fruity flavors",
      "Fast absorption for optimal muscle recovery",
      "Low in sugar and fat",
    ],
    nutritionFacts: {
      servingSize: "25g",
      calories: "90",
      protein: "20g",
      carbohydrates: "1g",
      fat: "0.1g",
      sugar: "0.5g",
    },
    ingredients:
      "Whey Protein Isolate (Milk), Natural Flavoring, Citric Acid, Sucralose, Natural Colors",
  },
  "impact-creatine": {
    id: "impact-creatine",
    name: "Impact Creatine",
    image: creatineImpact,
    rating: 4.5,
    reviewCount: 4312,
    price: "32.85 ₪",
    originalPrice: "",
    description:
      "Pure Creatine Monohydrate to help increase physical performance in successive bursts of short-term, high intensity exercise.",
    features: [
      "3g of pure creatine monohydrate per serving",
      "Supports explosive power and strength",
      "Enhances muscle energy production",
      "Unflavored - mixes easily with any drink",
      "Pharmaceutical grade quality",
    ],
    nutritionFacts: {
      servingSize: "3g",
      calories: "0",
      protein: "0g",
      carbohydrates: "0g",
      fat: "0g",
      creatine: "3g",
    },
    ingredients: "100% Creatine Monohydrate",
  },
  "whey-isolate": {
    id: "whey-isolate",
    name: "Impact Whey Isolate Powder",
    image: wheyIsolate,
    rating: 4.5,
    reviewCount: 3971,
    price: "153.00 ₪",
    originalPrice: "",
    description:
      "Our premium Whey Protein Isolate provides 25g of high-quality protein with minimal lactose, making it perfect for those with dairy sensitivities.",
    features: [
      "25g of premium whey protein isolate per serving",
      "90% protein content - highest quality",
      "Low in lactose, fat, and carbs",
      "Fast-absorbing for post-workout recovery",
      "Available in multiple delicious flavors",
    ],
    nutritionFacts: {
      servingSize: "30g",
      calories: "110",
      protein: "25g",
      carbohydrates: "1g",
      fat: "0.5g",
      sugar: "0.5g",
    },
    ingredients:
      "Whey Protein Isolate (Milk), Natural and Artificial Flavoring, Lecithin, Sucralose",
  },
  "diet-whey": {
    id: "diet-whey",
    name: "Impact Diet Whey",
    image: dietWhey,
    rating: 4.5,
    reviewCount: 2546,
    price: "187.68 ₪",
    originalPrice: "",
    description:
      "Our Diet Whey blend combines high-quality protein with added ingredients to support your weight management goals.",
    features: [
      "22g of protein per serving",
      "Added L-Carnitine and Green Tea Extract",
      "Lower calorie formula",
      "Supports lean muscle maintenance",
      "Great taste with added nutritional benefits",
    ],
    nutritionFacts: {
      servingSize: "35g",
      calories: "95",
      protein: "22g",
      carbohydrates: "2g",
      fat: "1g",
      sugar: "1g",
    },
    ingredients:
      "Whey Protein Concentrate (Milk), L-Carnitine, Green Tea Extract, Natural Flavoring, Sucralose",
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, loading } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites, loading: favoritesLoading } = useFavorites();
  const [product, setProduct] = useState<any>(null);
  const [productLoading, setProductLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setProductLoading(true);
        console.log('Fetching product with ID:', id);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const serverProduct = response.data.product;
        console.log('Server product:', serverProduct);
        
        // Use server image directly
        const productWithImage = {
          ...serverProduct,
          image: serverProduct.image.startsWith('/') ? `http://localhost:5000${serverProduct.image}` : serverProduct.image
        };
        console.log('Product with image:', productWithImage);
        setProduct(productWithImage);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to local data
        const localProduct = productData[id as keyof typeof productData];
        if (localProduct) {
          setProduct(localProduct);
        }
      } finally {
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id || product.id);
    }
  };

  const handleFavoriteClick = () => {
    if (!product) return;
    
    const productId = product._id || product.id;
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "fill-accent text-accent"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 hover:bg-muted">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Card className="bg-white p-8 flex items-center justify-center min-h-[500px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain max-w-md"
              />
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="favicon.png" 
                  alt="Muscle Icon" 
                  className="w-8 h-8"
                />
                <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">{renderStars(product.rating)}</div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ⭐ Best Seller
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                {product.originalPrice?.trim() !== "" && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground"
                onClick={handleAddToCart}
                disabled={loading}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {loading ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleFavoriteClick}
                disabled={favoritesLoading}
                className={`${
                  isFavorite(product?._id || product?.id) 
                    ? 'text-red-500 border-red-500 hover:bg-red-50' 
                    : 'hover:bg-muted'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 ${
                    isFavorite(product?._id || product?.id) ? 'fill-red-500' : ''
                  }`} 
                />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleShareClick}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Payment Section */}
            <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CreditCard className="w-5 h-5" />
                  Secure Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground h-14 text-lg font-semibold"
                    onClick={() => alert('Redirecting to secure payment gateway...')}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Buy Now - {product.price}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full h-14 text-lg font-semibold border-primary/30 hover:bg-primary/5"
                    onClick={() => alert('Adding to cart for later purchase...')}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>SSL Encrypted • Secure Payment • Money Back Guarantee</span>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Free shipping on orders over 200₪</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Fast delivery within 2-3 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="features" className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-primary">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-primary">Nutrition Facts</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.nutritionFacts).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-border pb-2">
                          <span className="capitalize font-medium">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>
                          <span className="font-semibold">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ingredients" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-primary">Ingredients</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.ingredients}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-primary">Shipping & Returns</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-accent" />
                          Shipping Information
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Free shipping on orders over 200₪</li>
                          <li>• Standard delivery: 2-3 business days</li>
                          <li>• Express delivery: 1 business day (additional 15₪)</li>
                          <li>• Orders placed before 2 PM ship same day</li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-accent" />
                          Returns & Warranty
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• 30-day money-back guarantee</li>
                          <li>• Free returns for unused products</li>
                          <li>• Customer support available 24/7</li>
                          <li>• All products are authentic and certified</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Customer Reviews Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-primary mb-6">Customer Reviews</h2>
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">John D.</span>
                          <div className="flex">{renderStars(5)}</div>
                          <span className="text-sm text-muted-foreground">Verified Buyer</span>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          "Excellent quality! I've been using this for 3 months and noticed significant improvements in my muscle recovery. The taste is great and it mixes easily."
                        </p>
                        <span className="text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">SM</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">Sarah M.</span>
                          <div className="flex">{renderStars(4)}</div>
                          <span className="text-sm text-muted-foreground">Verified Buyer</span>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          "Great product! Fast shipping and the results are amazing. Will definitely order again."
                        </p>
                        <span className="text-sm text-muted-foreground">1 month ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && product && (
        <ShareProduct
          productName={product.name}
          productUrl={window.location.href}
          productImage={product.image}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;