import ProductCard from "./ProductCard";
import { useSearch } from "@/contexts/SearchContext";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import proteinClear from "@/assets/protein-clear.jpg";
import creatineImpact from "@/assets/creatine-impact.jpg";
import wheyIsolate from "@/assets/whey-isolate.jpg";
import dietWhey from "@/assets/diet-whey.jpg";

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

const BestSellers = () => {
  const { searchQuery, isSearching, setIsSearching } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching all products for BestSellers');
        const response = await axios.get('http://localhost:5000/api/products');
        const serverProducts = response.data.products;
        console.log('Server products:', serverProducts);
        
        // Use server images directly
        const productsWithImages = serverProducts.map((product: any) => ({
          ...product,
          image: product.image.startsWith('/') ? `http://localhost:5000${product.image}` : product.image
        }));
        
        console.log('Products with images:', productsWithImages);
        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to local data if server fails
        const fallbackProducts: Product[] = [
          {
            _id: "clear-whey-protein",
            name: "Clear Whey Protein Powder",
            image: proteinClear,
            rating: 4.5,
            reviewCount: 6089,
            price: "174.22 ₪",
            originalPrice: "199.99 ₪",
            description: "Premium clear whey protein",
            category: "protein",
            features: [],
            nutritionFacts: {},
            ingredients: "",
            inStock: true,
            featured: true,
          },
          {
            _id: "impact-creatine",
            name: "Impact Creatine",
            image: creatineImpact,
            rating: 4.5,
            reviewCount: 4312,
            price: "32.85 ₪",
            originalPrice: "",
            description: "Pure creatine monohydrate",
            category: "creatine",
            features: [],
            nutritionFacts: {},
            ingredients: "",
            inStock: true,
            featured: true,
          },
          {
            _id: "whey-isolate",
            name: "Impact Whey Isolate Powder",
            image: wheyIsolate,
            rating: 4.5,
            reviewCount: 3971,
            price: "153.00 ₪",
            originalPrice: "",
            description: "Premium whey isolate",
            category: "protein",
            features: [],
            nutritionFacts: {},
            ingredients: "",
            inStock: true,
            featured: true,
          },
          {
            _id: "diet-whey",
            name: "Impact Diet Whey",
            image: dietWhey,
            rating: 4.5,
            reviewCount: 2546,
            price: "187.68 ₪",
            originalPrice: "",
            description: "Diet whey protein",
            category: "protein",
            features: [],
            nutritionFacts: {},
            ingredients: "",
            inStock: true,
            featured: true,
          },
        ];
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => {
    setIsSearching(false);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {isSearching ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Search Results for "{searchQuery}"
              </h2>
              <Button
                variant="outline"
                onClick={handleClearSearch}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Search
              </Button>
            </div>
            {filteredProducts.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <img 
                    src="/muscle-icon.png" 
                    alt="Muscle Icon" 
                    className="w-16 h-16"
                  />
                  <Search className="w-16 h-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try searching with different keywords
                </p>
                <Button onClick={handleClearSearch}>
                  View All Products
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 mb-10">
              <img 
                src="/muscle-icon.png" 
                alt="Muscle Icon" 
                className="w-10 h-10"
              />
              <h2 className="text-3xl font-bold text-foreground">
                Best Sellers
              </h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BestSellers;