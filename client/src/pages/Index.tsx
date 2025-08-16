import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryCards from "@/components/CategoryCards";
import BestSellers from "@/components/BestSellers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <CategoryCards />
      <div id="products-section">
        <BestSellers />
      </div>
    </div>
  );
};

export default Index;
