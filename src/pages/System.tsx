
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sun, Battery, Zap, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

const System = () => {
  const systemComponents = [
    {
      name: 'Solar Panels',
      icon: Sun,
      status: 'Optimal',
      efficiency: 94,
      description: 'Converting sunlight to electricity',
      details: '24 panels, 400W each, 9.6kW total capacity',
      color: 'text-yellow-500'
    },
    {
      name: 'Inverter',
      icon: Zap,
      status: 'Good',
      efficiency: 97,
      description: 'Converting DC to AC power',
      details: 'SolarEdge HD-Wave 10kW, 99% peak efficiency',
      color: 'text-blue-500'
    },
    {
      name: 'Battery Storage',
      icon: Battery,
      status: 'Charging',
      efficiency: 78,
      description: 'Storing excess solar energy',
      details: 'Tesla Powerwall 2, 13.5kWh capacity',
      color: 'text-green-500'
    },
    {
      name: 'Charge Controllers',
      icon: Settings,
      status: 'Optimal',
      efficiency: 99,
      description: 'Preventing battery damage',
      details: 'MPPT controllers with smart monitoring',
      color: 'text-purple-500'
    }
  ];

  const panelDetails = [
    { id: 'Panel 1-6', voltage: '240V', current: '8.2A', power: '1.97kW', status: 'optimal' },
    { id: 'Panel 7-12', voltage: '238V', current: '8.1A', power: '1.93kW', status: 'optimal' },
    { id: 'Panel 13-18', voltage: '235V', current: '7.9A', power: '1.86kW', status: 'good' },
    { id: 'Panel 19-24', voltage: '242V', current: '8.3A', power: '2.01kW', status: 'optimal' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'charging':
        return <Battery className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'charging':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Overview</h1>
        <p className="text-lg text-gray-600">Monitor your solar energy system components</p>
      </div>

      {/* System Status Overview */}
      <Card className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">9.6 kW</div>
              <div className="text-teal-100">Total Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-teal-100">System Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-teal-100">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3.2 years</div>
              <div className="text-teal-100">System Age</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemComponents.map((component, index) => {
          const IconComponent = component.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconComponent className={`h-6 w-6 ${component.color}`} />
                  {component.name}
                  <Badge className={getStatusColor(component.status)}>
                    {getStatusIcon(component.status)}
                    {component.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{component.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency</span>
                      <span className="font-semibold">{component.efficiency}%</span>
                    </div>
                    <Progress value={component.efficiency} className="h-2" />
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{component.details}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Panel Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>Panel Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Panel Group</th>
                  <th className="text-left p-3">Voltage</th>
                  <th className="text-left p-3">Current</th>
                  <th className="text-left p-3">Power Output</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {panelDetails.map((panel, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{panel.id}</td>
                    <td className="p-3">{panel.voltage}</td>
                    <td className="p-3">{panel.current}</td>
                    <td className="p-3 font-semibold">{panel.power}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(panel.status)}>
                        {getStatusIcon(panel.status)}
                        {panel.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Wiring and Mounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wiring System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>DC Wiring</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  Secure
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span>AC Wiring</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  Secure
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Grounding</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  Proper
                </Badge>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  All electrical connections are secure and meet safety standards.
                  Last inspection: June 15, 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mounting System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Roof Mounting</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  Stable
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Panel Alignment</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  Optimal
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Weatherproofing</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  Excellent
                </Badge>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Mounting system is secure with proper drainage and ventilation.
                  Orientation: 180° (South), Tilt: 30°
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default System;
