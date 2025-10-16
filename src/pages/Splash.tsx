import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center animate-fade-in">
      <div className="animate-scale-in">
        <img src={logo} alt="NutriBox Logo" className="w-32 h-32 mb-8" />
      </div>
      <h1 className="text-5xl font-bold text-primary mb-4 animate-fade-in">
        NutriBox
      </h1>
      <p className="text-lg text-muted-foreground animate-fade-in">
        Your Daily Dose of Balanced Nutrition
      </p>
    </div>
  );
};

export default Splash;
