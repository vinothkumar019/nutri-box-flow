import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "weekly",
    name: "Weekly Plan",
    price: 99.99,
    originalPrice: 111.93,
    savings: "Save 20%",
    period: "per week",
    features: [
      "7 NutriBoxes delivered daily",
      "Personalized nutrition tracking",
      "Priority customer support",
      "Flexible meal customization",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: 379.99,
    originalPrice: 447.72,
    savings: "Save 25%",
    period: "per month",
    features: [
      "30 NutriBoxes delivered daily",
      "Advanced nutrition analytics",
      "Dedicated nutritionist consultation",
      "Free meal customization",
      "Early access to new items",
    ],
    popular: true,
  },
];

const Subscription = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planName: string) => {
    toast.success(`Subscribed to ${planName}!`);
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
          <h1 className="text-xl font-bold text-primary">Subscription Plans</h1>
        </div>
      </header>

      <div className="container mx-auto p-6 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground">
            Save more with longer subscriptions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-8 shadow-card relative ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground line-through">
                    ${plan.originalPrice}
                  </p>
                  <p className="text-sm font-semibold text-secondary">
                    {plan.savings}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "default"}
                className="w-full"
                onClick={() => handleSubscribe(plan.name)}
              >
                Subscribe Now
              </Button>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-muted max-w-4xl mx-auto">
          <h3 className="font-bold text-lg text-foreground mb-2">
            All Plans Include:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li>• Fresh daily deliveries</li>
            <li>• Personalized meal plans</li>
            <li>• Nutrition tracking</li>
            <li>• Cancel anytime</li>
            <li>• Free delivery</li>
            <li>• 24/7 support</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
