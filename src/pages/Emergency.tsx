
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Bell, Power, Battery, Sun } from 'lucide-react';

const Emergency = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [systemStatus, setSystemStatus] = useState('normal');

  const simulateEmergency = () => {
    setEmergencyActive(true);
    setSystemStatus('emergency');
    
    // Reset after 10 seconds for demo
    setTimeout(() => {
      setEmergencyActive(false);
      setSystemStatus('normal');
    }, 10000);
  };

  const currentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Panel 3 efficiency below optimal threshold',
      time: '2 minutes ago',
      critical: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance due in 7 days',
      time: '1 hour ago',
      critical: false
    }
  ];

  const emergencyProcedures = [
    {
      scenario: 'Power Grid Outage',
      status: emergencyActive ? 'Active' : 'Standby',
      actions: [
        'Switch to battery backup mode',
        'Prioritize critical loads',
        'Monitor battery levels',
        'Reduce non-essential consumption'
      ]
    },
    {
      scenario: 'System Malfunction',
      status: 'Standby',
      actions: [
        'Isolate affected components',
        'Alert monitoring service',
        'Switch to backup systems',
        'Schedule technician visit'
      ]
    },
    {
      scenario: 'Severe Weather',
      status: 'Standby',
      actions: [
        'Secure loose components',
        'Monitor system performance',
        'Prepare for power interruptions',
        'Check drainage systems'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Emergency Management</h1>
        <p className="text-lg text-gray-600">System alerts and emergency procedures</p>
      </div>

      {/* Emergency Status */}
      <Card className={`${emergencyActive ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'} transition-all duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {emergencyActive ? (
                <AlertTriangle className="h-12 w-12 text-red-500 animate-pulse" />
              ) : (
                <CheckCircle className="h-12 w-12 text-green-500" />
              )}
              <div>
                <h2 className={`text-2xl font-bold ${emergencyActive ? 'text-red-700' : 'text-green-700'}`}>
                  {emergencyActive ? 'EMERGENCY ACTIVE' : 'SYSTEM NORMAL'}
                </h2>
                <p className={`${emergencyActive ? 'text-red-600' : 'text-green-600'}`}>
                  {emergencyActive 
                    ? 'Emergency procedures activated - Switching to backup power'
                    : 'All systems operating normally'
                  }
                </p>
              </div>
            </div>
            
            <Button 
              onClick={simulateEmergency}
              variant={emergencyActive ? 'destructive' : 'outline'}
              disabled={emergencyActive}
              className="px-6 py-3"
            >
              {emergencyActive ? 'Emergency Active...' : 'Simulate Emergency'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={emergencyActive ? 'border-yellow-500' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Solar Generation</p>
                <p className={`text-2xl font-bold ${emergencyActive ? 'text-yellow-600' : 'text-green-600'}`}>
                  {emergencyActive ? 'Limited' : 'Normal'}
                </p>
              </div>
              <Sun className={`h-8 w-8 ${emergencyActive ? 'text-yellow-500' : 'text-green-500'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className={emergencyActive ? 'border-orange-500' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Battery Backup</p>
                <p className={`text-2xl font-bold ${emergencyActive ? 'text-orange-600' : 'text-blue-600'}`}>
                  {emergencyActive ? 'Active' : 'Standby'}
                </p>
              </div>
              <Battery className={`h-8 w-8 ${emergencyActive ? 'text-orange-500' : 'text-blue-500'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className={emergencyActive ? 'border-red-500' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Grid Connection</p>
                <p className={`text-2xl font-bold ${emergencyActive ? 'text-red-600' : 'text-green-600'}`}>
                  {emergencyActive ? 'Disconnected' : 'Connected'}
                </p>
              </div>
              <Power className={`h-8 w-8 ${emergencyActive ? 'text-red-500' : 'text-green-500'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Current Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyActive && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-800">CRITICAL ALERT</span>
                  <Badge variant="destructive">Emergency</Badge>
                </div>
                <p className="text-red-700 mt-2">
                  Grid outage detected. System switched to battery backup mode. Monitor power consumption.
                </p>
                <p className="text-sm text-red-600 mt-1">Just now</p>
              </div>
            )}
            
            {currentAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-yellow-800">SYSTEM ALERT</span>
                  <Badge variant="outline">{alert.type}</Badge>
                </div>
                <p className="text-yellow-700 mt-2">{alert.message}</p>
                <p className="text-sm text-yellow-600 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Procedures */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Procedures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyProcedures.map((procedure, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{procedure.scenario}</h3>
                  <Badge className={procedure.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                    {procedure.status}
                  </Badge>
                </div>
                
                <ul className="space-y-2">
                  {procedure.actions.map((action, actionIndex) => (
                    <li key={actionIndex} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">24/7 Technical Support</h4>
              <p className="text-blue-700">1-800-SOLAR-911</p>
              <p className="text-sm text-blue-600">Available for critical system issues</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Local Service Team</h4>
              <p className="text-green-700">(555) 123-4567</p>
              <p className="text-sm text-green-600">Emergency repairs and maintenance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Emergency;
