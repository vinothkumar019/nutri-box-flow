import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";

const boxItems = [
  { id: 1, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, category: "Fruit", emoji: "🍎" },
  { id: 2, name: "Almonds", calories: 164, protein: 6, carbs: 6, fat: 14, category: "Nuts", emoji: "🌰" },
  { id: 3, name: "Carrot", calories: 25, protein: 0.6, carbs: 6, fat: 0.1, category: "Vegetable", emoji: "🥕" },
  { id: 4, name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.8, category: "Grain", emoji: "🍚" },
  { id: 5, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, category: "Protein", emoji: "🍗" },
  { id: 6, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: "Fruit", emoji: "🍌" },
  { id: 7, name: "Broccoli", calories: 55, protein: 3.7, carbs: 11, fat: 0.6, category: "Vegetable", emoji: "🥦" },
  { id: 8, name: "Greek Yogurt", calories: 100, protein: 10, carbs: 3.6, fat: 4.5, category: "Protein", emoji: "🥛" },
  { id: 9, name: "Blueberries", calories: 84, protein: 1.1, carbs: 21, fat: 0.5, category: "Fruit", emoji: "🫐" },
];

const NutriBoxDetails = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>(boxItems.map(item => item.id));

  const toggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    toast.success("Added to cart!");
    navigate("/cart");
  };

  const totals = boxItems
    .filter(item => selectedItems.includes(item.id))
    .reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Today's NutriBox</h1>
        </div>
      </header>

      <div className="container mx-auto p-6 pb-32 animate-fade-in">
        {/* Nutrition Summary */}
        <Card className="p-6 mb-6 bg-gradient-primary text-white shadow-card">
          <h2 className="text-xl font-bold mb-4">Nutrition Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-white/80 text-sm">Calories</p>
              <p className="text-2xl font-bold">{Math.round(totals.calories)}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Protein</p>
              <p className="text-2xl font-bold">{Math.round(totals.protein)}g</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Carbs</p>
              <p className="text-2xl font-bold">{Math.round(totals.carbs)}g</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Fat</p>
              <p className="text-2xl font-bold">{Math.round(totals.fat)}g</p>
            </div>
          </div>
        </Card>

        {/* Box Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boxItems.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <Card
                key={item.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-soft ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{item.emoji}</span>
                  {isSelected && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.category}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Calories:</span>
                    <span className="font-semibold">{item.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein:</span>
                    <span className="font-semibold">{item.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbs:</span>
                    <span className="font-semibold">{item.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fat:</span>
                    <span className="font-semibold">{item.fat}g</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-soft">
        <div className="container mx-auto flex gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Selected Items</p>
            <p className="text-xl font-bold text-foreground">{selectedItems.length} / 9</p>
          </div>
          <Button 
            variant="hero" 
            className="flex-1"
            onClick={handleAddToCart}
            disabled={selectedItems.length === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NutriBoxDetails;
