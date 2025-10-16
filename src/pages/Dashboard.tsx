import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, User, TrendingUp, Package } from "lucide-react";
import heroImage from "@/assets/hero-nutribox.jpg";

const mockBoxItems = [
  { name: "Apple", calories: 95, category: "Fruit" },
  { name: "Almonds", calories: 164, category: "Nuts" },
  { name: "Carrot", calories: 25, category: "Vegetable" },
  { name: "Brown Rice", calories: 216, category: "Grain" },
  { name: "Chicken Breast", calories: 165, category: "Protein" },
  { name: "Banana", calories: 105, category: "Fruit" },
  { name: "Broccoli", calories: 55, category: "Vegetable" },
  { name: "Greek Yogurt", calories: 100, category: "Protein" },
  { name: "Blueberries", calories: 84, category: "Fruit" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const totalCalories = mockBoxItems.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">NutriBox</h1>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/cart")}>
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Good Morning! 👋
          </h2>
          <p className="text-muted-foreground">
            Ready to fuel your day with nutrition?
          </p>
        </div>

        {/* Today's NutriBox Preview */}
        <Card className="overflow-hidden shadow-card">
          <div className="h-48 bg-gradient-primary relative">
            <img 
              src={heroImage} 
              alt="Today's NutriBox" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-1">Today's NutriBox</h3>
                <p className="text-white/90">9 fresh compartments of goodness</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {mockBoxItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-muted rounded-lg p-4 text-center hover:shadow-soft transition-all hover:scale-105"
                >
                  <p className="font-semibold text-sm text-foreground mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.calories} cal</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button 
                variant="hero" 
                className="flex-1"
                onClick={() => navigate("/nutribox")}
              >
                <Package className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button 
                variant="accent" 
                className="flex-1"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>

        {/* Daily Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Calories</p>
                <p className="text-2xl font-bold text-foreground">{totalCalories}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Items Today</p>
                <p className="text-2xl font-bold text-foreground">9</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Streak Days</p>
                <p className="text-2xl font-bold text-foreground">7</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-6 justify-start"
            onClick={() => navigate("/subscription")}
          >
            <div className="text-left">
              <p className="font-semibold mb-1">Weekly Subscription</p>
              <p className="text-sm text-muted-foreground">Save 20% on weekly plans</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-6 justify-start"
            onClick={() => navigate("/progress")}
          >
            <div className="text-left">
              <p className="font-semibold mb-1">Track Progress</p>
              <p className="text-sm text-muted-foreground">View your nutrition journey</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
