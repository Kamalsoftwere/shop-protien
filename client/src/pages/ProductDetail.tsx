// ProductDetail.jsx

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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import product images
import proteinClear from "@/assets/protein-clear.jpg";
import creatineImpact from "@/assets/creatine-impact.jpg";
import wheyIsolate from "@/assets/whey-isolate.jpg";
import dietWhey from "@/assets/diet-whey.jpg";
import veganProtein from "@/assets/vegan-protein.jpg";
import veganBcaa from "@/assets/vegan-bcaa.jpg";
import creatinePowder from "@/assets/creatine-powder.jpg";
import creatineCapsules from "@/assets/creatine-capsules.jpg";

// ✅ Import the muscle icon correctly
import muscleIcon from "@/assets/muscle-icon.png";

// Define Product type
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  details?: string;
  nutrition?: string;
  category: string;
}

// Static product data
const staticProducts: { [key: string]: Product } = {
  'clear-whey-protein': {
    _id: 'clear-whey-protein',
    name: 'Clear Whey Protein Powder',
    description: 'Premium clear whey protein with refreshing taste. Perfect for those who want a light, refreshing protein option that doesn\'t feel heavy.',
    price: 174.22,
    image: proteinClear,
    rating: 4.5,
    details: 'Clear Whey Protein offers a unique alternative to traditional protein shakes. With its light, refreshing taste and clear formula, it\'s perfect for post-workout hydration and muscle recovery. No artificial colors or heavy texture.',
    nutrition: 'Per serving (25g): Protein 20g, Carbohydrates 5g, Fat 0g, Calories 100',
    category: 'protein'
  },
  'impact-creatine': {
    _id: 'impact-creatine',
    name: 'Impact Creatine',
    description: 'Pure creatine monohydrate for strength and power. The most researched form of creatine for athletic performance.',
    price: 32.85,
    image: creatineImpact,
    rating: 4.5,
    details: 'Impact Creatine is 100% pure creatine monohydrate with no fillers or additives. It\'s the gold standard for increasing strength, power, and muscle mass. No loading phase required.',
    nutrition: 'Per serving (5g): Creatine Monohydrate 5g, Calories 20',
    category: 'creatine'
  },
  'whey-isolate': {
    _id: 'whey-isolate',
    name: 'Impact Whey Isolate Powder',
    description: 'Premium whey protein isolate for muscle building and recovery. This high-quality supplement provides 25g of protein per serving with minimal carbs and fat.',
    price: 153.00,
    image: wheyIsolate,
    rating: 4.5,
    details: 'Impact Whey Isolate is made from the highest quality whey protein available. It contains all essential amino acids and is quickly absorbed by your muscles for optimal recovery. Perfect for lean muscle building.',
    nutrition: 'Per serving (30g): Protein 25g, Carbohydrates 3g, Fat 1g, Calories 120',
    category: 'protein'
  },
  'diet-whey': {
    _id: 'diet-whey',
    name: 'Impact Diet Whey',
    description: 'Low-calorie whey protein for weight management. Ideal for those looking to build lean muscle while managing their weight.',
    price: 187.68,
    image: dietWhey,
    rating: 4.5,
    details: 'Impact Diet Whey is specially formulated for weight management. It provides high-quality protein with reduced calories and added fat-burning ingredients. Perfect for cutting phases.',
    nutrition: 'Per serving (28g): Protein 22g, Carbohydrates 2g, Fat 1g, Calories 105',
    category: 'protein'
  },
  'creatine-monohydrate': {
    _id: 'creatine-monohydrate',
    name: 'Creatine Monohydrate',
    description: 'Pure creatine monohydrate for strength and power. The most researched form of creatine for athletic performance.',
    price: 29.99,
    image: creatinePowder,
    rating: 4.9,
    details: 'Our Creatine Monohydrate is 100% pure with no fillers or additives. It\'s the gold standard for increasing strength, power, and muscle mass.',
    nutrition: 'Per serving (5g): Creatine Monohydrate 5g, Calories 20',
    category: 'creatine'
  },
  'creatine-capsules': {
    _id: 'creatine-capsules',
    name: 'Creatine Capsules',
    description: 'Convenient creatine capsules for easy consumption. Perfect for those who prefer capsules over powder.',
    price: 34.99,
    image: creatineCapsules,
    rating: 4.5,
    details: 'Creatine Capsules offer the same benefits as powder in a convenient capsule form. No mixing required - just take with water.',
    nutrition: 'Per serving (3 capsules): Creatine Monohydrate 2.5g',
    category: 'creatine'
  },
  'vegan-protein': {
    _id: 'vegan-protein',
    name: 'Vegan Protein Blend',
    description: 'Complete plant-based protein for vegans. Made from pea and rice protein for a complete amino acid profile.',
    price: 54.99,
    image: veganProtein,
    rating: 4.6,
    details: 'Our Vegan Protein Blend combines pea and rice proteins to provide a complete amino acid profile. It\'s easily digestible and perfect for plant-based athletes.',
    nutrition: 'Per serving (30g): Protein 22g, Carbohydrates 4g, Fat 2g, Calories 115',
    category: 'vegan'
  },
  'vegan-bcaa': {
    _id: 'vegan-bcaa',
    name: 'Vegan BCAA',
    description: 'Plant-based branched-chain amino acids for muscle recovery and growth.',
    price: 39.99,
    image: veganBcaa,
    rating: 4.4,
    details: 'Vegan BCAA provides essential amino acids from plant sources. Perfect for muscle recovery and preventing muscle breakdown during training.',
    nutrition: 'Per serving (10g): BCAA 5g (Leucine 2.5g, Isoleucine 1.25g, Valine 1.25g)',
    category: 'vegan'
  }
};

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('No product ID provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Try to fetch from API first
        try {
          const response = await axios.get(`http://localhost:5000/api/products/${id}`);
          setProduct(response.data);
        } catch (apiError) {
          console.log('API not available, using static data');
          // Fallback to static data
          const staticProduct = staticProducts[id];
          if (staticProduct) {
            setProduct(staticProduct);
          } else {
            setError('Product not found');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to static data
        const staticProduct = staticProducts[id];
        if (staticProduct) {
          setProduct(staticProduct);
        } else {
          setError('Product not found');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!product) return;
    
    if (isFavorite(product._id)) {
      await removeFromFavorites(product._id);
    } else {
      await addToFavorites(product._id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src={muscleIcon} 
                alt="Muscle Icon" 
                className="w-12 h-12"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <Card>
            <CardContent className="p-4 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md max-h-96 object-contain"
              />
            </CardContent>
          </Card>

          {/* Product Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <img
                    src={muscleIcon}
                    alt="Muscle Icon"
                    className="w-8 h-8 animate-pulse"
                  />
                  {product.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-2xl font-bold mb-4">${product.price}</p>

                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{product.rating} / 5</span>
                  </div>
                )}

                <div className="flex gap-4 mb-6">
                  <Button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 flex-1"
                    onClick={() => addToCart(product._id)}
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleToggleFavorite}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite(product._id)
                          ? "text-red-500 fill-red-500"
                          : ""
                      }`}
                    />
                    {isFavorite(product._id) ? 'Favorited' : 'Favorite'}
                  </Button>
                </div>

                {/* Payment & Security Info */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Free Shipping $50+</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-600">Multiple Payment Options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Quality Guaranteed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-10">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Product Details</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.details || "Product details will be available soon."}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Benefits:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>High-quality ingredients</li>
                      <li>Third-party tested for purity</li>
                      <li>No artificial fillers</li>
                      <li>Suitable for athletes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Nutrition Information</h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="font-medium text-blue-900">
                      {product.nutrition || "Nutritional information will be available soon."}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2"><strong>Recommended Use:</strong> Take 1 serving daily as directed</p>
                    <p><strong>Storage:</strong> Store in a cool, dry place</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Shipping & Returns</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Free Shipping</h4>
                        <p className="text-sm text-gray-600">On orders over $50. Standard delivery 3-5 business days.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">30-Day Return Policy</h4>
                        <p className="text-sm text-gray-600">Not satisfied? Return within 30 days for a full refund.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Quality Guarantee</h4>
                        <p className="text-sm text-gray-600">All products are third-party tested for quality and purity.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;