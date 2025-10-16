import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Apple, Package, TrendingUp } from "lucide-react";

const slides = [
  {
    icon: Apple,
    title: "Personalized Meal Plans",
    description: "Get nutrition tailored to your goals - weight loss, muscle gain, or healthy living",
  },
  {
    icon: Package,
    title: "Daily 9-Box Delivery",
    description: "Fresh fruits, veggies, nuts, grains, and proteins delivered in perfect portions",
  },
  {
    icon: TrendingUp,
    title: "Track Nutrition Easily",
    description: "Monitor calories, macros, and progress with our intuitive dashboard",
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  const { icon: Icon, title, description } = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <Icon className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          {title}
        </h2>
        <p className="text-muted-foreground text-center max-w-md mb-12">
          {description}
        </p>
        
        <div className="flex gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-8 flex gap-4">
        <Button variant="ghost" onClick={handleSkip} className="flex-1">
          Skip
        </Button>
        <Button variant="hero" onClick={handleNext} className="flex-1">
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
