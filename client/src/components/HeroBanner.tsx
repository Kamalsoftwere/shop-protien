
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-banner.jpg";
import muscleIcon from "@/assets/muscle-icon.png";   

const HeroBanner = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <div className="flex justify-center mb-4">
          <img
            src={muscleIcon}
            alt="Muscle Icon"
            className="w-16 h-16 md:w-20 md:h-20 animate-pulse relative z-20 opacity-100"
            loading="eager"
            
            style={{ 
              display: 'block',
              position: 'relative',
              zIndex: 20,
              opacity: 1
            }}
          />
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          NEW YEAR <span className="text-accent">DROP</span>
        </h2>

        <p className="text-lg md:text-xl mb-6 opacity-90">
          Transform your fitness journey with premium supplements
        </p>

        <Button
          size="lg"
          className="bg-accent hover:bg-accent-hover text-accent-foreground px-8 py-3 text-lg font-semibold shadow-lg"
          onClick={scrollToProducts}
        >
          SHOP NOW
        </Button>
      </div>
    </section>
  );
};

export default HeroBanner;