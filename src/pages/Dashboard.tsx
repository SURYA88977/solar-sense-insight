
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
        <h1 className="text-3xl font-bold text-gray-800">Solar Dashboard</h1>
        <div className="text-sm text-gray-600">
          Last updated: {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Current Solar</p>
                <p className="text-2xl font-bold">{currentSolar} kW</p>
              </div>
              <Sun className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Current Usage</p>
                <p className="text-2xl font-bold">{currentUsage} kW</p>
              </div>
              <Zap className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Battery Level</p>
                <p className="text-2xl font-bold">{batteryLevel}%</p>
              </div>
              <Battery className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100">Net Production</p>
                <p className="text-2xl font-bold">+{(currentSolar - currentUsage).toFixed(1)} kW</p>
              </div>
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solar Generation Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Solar Generation vs Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={solarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="solar" stroke="#10b981" strokeWidth={3} name="Solar Generation (kW)" />
                <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} name="Energy Usage (kW)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
                  <p className="text-sm text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Energy Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={solarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="solar" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="usage" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
