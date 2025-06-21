
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Activity } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { day: 'Mon', generated: 28, consumed: 22, efficiency: 87 },
    { day: 'Tue', generated: 32, consumed: 25, efficiency: 92 },
    { day: 'Wed', generated: 29, consumed: 24, efficiency: 89 },
    { day: 'Thu', generated: 35, consumed: 27, efficiency: 94 },
    { day: 'Fri', generated: 31, consumed: 23, efficiency: 90 },
    { day: 'Sat', generated: 27, consumed: 26, efficiency: 85 },
    { day: 'Sun', generated: 30, consumed: 25, efficiency: 88 },
  ];

  const monthlyData = [
    { month: 'Jan', generated: 680, consumed: 590, efficiency: 87 },
    { month: 'Feb', generated: 720, consumed: 620, efficiency: 89 },
    { month: 'Mar', generated: 890, consumed: 650, efficiency: 92 },
    { month: 'Apr', generated: 950, consumed: 680, efficiency: 94 },
    { month: 'May', generated: 1020, consumed: 720, efficiency: 96 },
    { month: 'Jun', generated: 1080, consumed: 740, efficiency: 97 },
  ];

  const usageBreakdown = [
    { name: 'HVAC', value: 35, color: '#ef4444' },
    { name: 'Water Heating', value: 18, color: '#f97316' },
    { name: 'Lighting', value: 12, color: '#eab308' },
    { name: 'Appliances', value: 20, color: '#22c55e' },
    { name: 'EV Charging', value: 15, color: '#3b82f6' },
  ];

  const data = timeRange === 'week' ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Energy Analytics</h1>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeRange('week')}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeRange('month')}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Month
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Avg Efficiency</p>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-green-200">+5% vs last period</p>
              </div>
              <TrendingUp className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Peak Generation</p>
                <p className="text-2xl font-bold">5.8 kW</p>
                <p className="text-sm text-blue-200">Yesterday 12:45 PM</p>
              </div>
              <Activity className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Self Consumption</p>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-purple-200">22% fed to grid</p>
              </div>
              <Calendar className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Production vs Consumption */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Production vs Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === 'week' ? 'day' : 'month'} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="generated" fill="#10b981" name="Generated (kWh)" />
                <Bar dataKey="consumed" fill="#3b82f6" name="Consumed (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Efficiency Trend */}
        <Card>
          <CardHeader>
            <CardTitle>System Efficiency Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === 'week' ? 'day' : 'month'} />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={3} name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Usage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Usage Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usageBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {usageBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900">Peak Usage Pattern</h4>
                <p className="text-sm text-blue-700">Your energy consumption peaks between 6-8 PM. Consider shifting non-essential loads to 12-3 PM when solar generation is highest.</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900">Efficiency Opportunity</h4>
                <p className="text-sm text-green-700">Your system efficiency improved by 5% this month. Weather conditions were optimal on Thursday - similar patterns expected next week.</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-900">Maintenance Alert</h4>
                <p className="text-sm text-yellow-700">Panel 3 showing 3% lower efficiency. Schedule cleaning to maintain optimal performance.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
