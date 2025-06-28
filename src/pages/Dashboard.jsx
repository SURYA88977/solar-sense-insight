
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Sun, Zap, Battery, TrendingUp, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [solarData, setSolarData] = useState([
    { time: '06:00', solar: 0.2, usage: 2.1 },
    { time: '08:00', solar: 1.8, usage: 3.2 },
    { time: '10:00', solar: 3.5, usage: 2.8 },
    { time: '12:00', solar: 4.8, usage: 3.5 },
    { time: '14:00', solar: 4.2, usage: 4.1 },
    { time: '16:00', solar: 3.1, usage: 3.8 },
    { time: '18:00', solar: 1.2, usage: 4.5 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time data updates
      setSolarData(prev => prev.map(item => ({
        ...item,
        solar: Math.max(0, item.solar + (Math.random() - 0.5) * 0.2),
        usage: Math.max(0, item.usage + (Math.random() - 0.5) * 0.3),
      })));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentSolar = 4.2;
  const currentUsage = 3.1;
  const batteryLevel = 78;

  const suggestions = [
    "Optimal time to run dishwasher: 2 PM - 4 PM",
    "Consider charging EV now - excess solar available",
    "Peak generation expected at 12:30 PM",
    "Running pool pump recommended in 30 minutes"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-[#4B352A]">Solar Dashboard</h1>
          <Sun className="h-8 w-8 text-[#CA7842] animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div className="text-sm text-[#4B352A]/70">
          Last updated: {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-white" style={{ background: 'linear-gradient(to right, #CA7842, #B2CD9C)' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F0F2BD]">Current Solar</p>
                <p className="text-2xl font-bold">{currentSolar} kW</p>
              </div>
              <Sun className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-white" style={{ background: 'linear-gradient(to right, #4B352A, #CA7842)' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F0F2BD]">Current Usage</p>
                <p className="text-2xl font-bold">{currentUsage} kW</p>
              </div>
              <Zap className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-white" style={{ background: 'linear-gradient(to right, #B2CD9C, #F0F2BD)' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#4B352A]">Battery Level</p>
                <p className="text-2xl font-bold text-[#4B352A]">{batteryLevel}%</p>
              </div>
              <Battery className="h-8 w-8 text-[#4B352A]" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-white" style={{ background: 'linear-gradient(to right, #CA7842, #4B352A)' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F0F2BD]">Net Production</p>
                <p className="text-2xl font-bold">+{(currentSolar - currentUsage).toFixed(1)} kW</p>
              </div>
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solar Generation Chart */}
        <Card className="lg:col-span-2 bg-[#F0F2BD]/50 border-[#B2CD9C]">
          <CardHeader>
            <CardTitle className="text-[#4B352A]">Solar Generation vs Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={solarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#B2CD9C" />
                <XAxis dataKey="time" stroke="#4B352A" />
                <YAxis stroke="#4B352A" />
                <Tooltip />
                <Line type="monotone" dataKey="solar" stroke="#B2CD9C" strokeWidth={3} name="Solar Generation (kW)" />
                <Line type="monotone" dataKey="usage" stroke="#CA7842" strokeWidth={3} name="Energy Usage (kW)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-[#F0F2BD]/50 border-[#B2CD9C]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#4B352A]">
              <Lightbulb className="h-5 w-5 text-[#CA7842]" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-[#B2CD9C]/30 rounded-lg border border-[#B2CD9C]">
                  <p className="text-sm text-[#4B352A]">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Flow */}
      <Card className="bg-[#F0F2BD]/50 border-[#B2CD9C]">
        <CardHeader>
          <CardTitle className="text-[#4B352A]">Today's Energy Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={solarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#B2CD9C" />
              <XAxis dataKey="time" stroke="#4B352A" />
              <YAxis stroke="#4B352A" />
              <Tooltip />
              <Area type="monotone" dataKey="solar" stackId="1" stroke="#B2CD9C" fill="#B2CD9C" fillOpacity={0.6} />
              <Area type="monotone" dataKey="usage" stackId="2" stroke="#CA7842" fill="#CA7842" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
