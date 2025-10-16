import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Award, Target } from "lucide-react";

const weeklyData = [
  { day: "Mon", calories: 1850 },
  { day: "Tue", calories: 1920 },
  { day: "Wed", calories: 1780 },
  { day: "Thu", calories: 1890 },
  { day: "Fri", calories: 1950 },
  { day: "Sat", calories: 1820 },
  { day: "Sun", calories: 1900 },
];

const tips = [
  "Stay hydrated - drink at least 8 glasses of water daily",
  "Include protein in every meal for sustained energy",
  "Eat colorful vegetables to get diverse nutrients",
  "Don't skip breakfast - it jumpstarts your metabolism",
];

const Progress = () => {
  const navigate = useNavigate();
  const avgCalories = Math.round(
    weeklyData.reduce((sum, day) => sum + day.calories, 0) / weeklyData.length
  );
  const maxCalories = Math.max(...weeklyData.map(d => d.calories));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Progress Tracking</h1>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6 animate-fade-in">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Calories</p>
                <p className="text-2xl font-bold text-foreground">{avgCalories}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Streak Days</p>
                <p className="text-2xl font-bold text-foreground">7</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goal Progress</p>
                <p className="text-2xl font-bold text-foreground">85%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Chart */}
        <Card className="p-6 shadow-card">
          <h3 className="font-bold text-lg text-foreground mb-6">
            Weekly Calorie Intake
          </h3>
          <div className="flex items-end justify-between gap-2 h-64">
            {weeklyData.map((day, index) => {
              const height = (day.calories / maxCalories) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-lg overflow-hidden flex items-end h-full">
                    <div
                      className="w-full bg-gradient-primary rounded-t-lg transition-all hover:opacity-80 flex items-end justify-center pb-2"
                      style={{ height: `${height}%` }}
                    >
                      <span className="text-xs font-semibold text-white">
                        {day.calories}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Motivational Tips */}
        <Card className="p-6 shadow-soft">
          <h3 className="font-bold text-lg text-foreground mb-4">
            💡 Daily Tips
          </h3>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Achievements */}
        <Card className="p-6 shadow-soft bg-gradient-primary text-white">
          <h3 className="font-bold text-lg mb-4">🏆 Achievements</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <p className="text-sm">7 Day Streak</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-sm">First Week</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💪</div>
              <p className="text-sm">Goal Setter</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
