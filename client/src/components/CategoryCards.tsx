import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import muscleIcon from "@/assets/muscle-icon.png";

const categories = [
  { name: "PROTEIN", color: "bg-primary", category: "protein" },
  { name: "CREATINE", color: "bg-primary", category: "creatine" },
  { name: "VEGAN", color: "bg-primary", category: "vegan" },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleCategoryClick(category.category)}
              className={`
                ${category.color}
                text-primary-foreground
                hover:bg-primary-hover
                h-20 sm:h-24 lg:h-28
                text-xs sm:text-sm font-semibold
                whitespace-pre-line
                border-0 shadow-md transition
                cursor-pointer
                relative
              `}
            >
              <img 
                src={muscleIcon} 
                alt="Muscle Icon" 
                className="absolute top-2 right-2 w-4 h-4 opacity-80"
              />
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;