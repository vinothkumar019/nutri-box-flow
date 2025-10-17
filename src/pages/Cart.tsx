import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Today's NutriBox", price: 499.0, quantity: 1 },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Utility for INR currency format
  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Shopping Cart</h1>
        </div>
      </header>

      <div className="container mx-auto p-6 pb-32 animate-fade-in">
        {cartItems.length === 0 ? (
          <Card className="p-12 text-center shadow-soft">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button variant="hero" onClick={() => navigate("/dashboard")}>
              Start Shopping
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6 shadow-soft">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1">{item.name}</h3>
                    <p className="text-muted-foreground">{formatINR(item.price)} each</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="font-bold text-lg text-foreground">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-soft">
          <div className="container mx-auto space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (10%)</span>
                <span>{formatINR(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
            <Button variant="hero" className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
