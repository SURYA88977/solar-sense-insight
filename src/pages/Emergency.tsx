
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Bell, Power, Battery, Sun } from 'lucide-react';
import { toast } from 'sonner';

interface EmergencyAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
  source: 'solar_panel' | 'battery' | 'inverter' | 'grid';
  severity: 'high' | 'medium' | 'low';
}

const Emergency = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [systemStatus, setSystemStatus] = useState('normal');
  const [currentAlerts, setCurrentAlerts] = useState<EmergencyAlert[]>([]);

  useEffect(() => {
    // Load simulated emergency alerts from solar panels
    const alerts = simulateEmergencyAlerts();
    setCurrentAlerts(alerts);

    // Simulate receiving new alerts every 30 seconds
    const alertInterval = setInterval(() => {
      const newAlert: EmergencyAlert = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? 'critical' : 'warning',
        message: `Solar panel system alert: ${Math.random() > 0.5 ? 'Low battery level detected' : 'Panel efficiency below threshold'}`,
        time: 'Just now',
        source: Math.random() > 0.5 ? 'battery' : 'solar_panel',
        severity: Math.random() > 0.5 ? 'high' : 'medium'
      };

      setCurrentAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      
      if (newAlert.type === 'critical') {
        toast.success('Emergency alert generated (Frontend only)');
      }
    }, 30000);

    return () => clearInterval(alertInterval);
  }, []);

  const simulateEmergencyAlerts = (): EmergencyAlert[] => {
    const alerts: EmergencyAlert[] = [
      {
        id: '1',
        type: 'critical',
        message: 'Battery level critically low (5%). Immediate attention required.',
        time: 'Just now',
        source: 'battery',
        severity: 'high'
      },
      {
        id: '2',
        type: 'warning',
        message: 'Panel 3 efficiency dropped to 65%. Possible obstruction detected.',
        time: '3 minutes ago',
        source: 'solar_panel',
        severity: 'medium'
      },
      {
        id: '3',
        type: 'critical',
        message: 'Inverter temperature exceeding safe limits (85°C).',
        time: '5 minutes ago',
        source: 'inverter',
        severity: 'high'
      },
      {
        id: '4',
        type: 'warning',
        message: 'Grid voltage fluctuation detected. Monitor closely.',
        time: '10 minutes ago',
        source: 'grid',
        severity: 'medium'
      }
    ];

    return alerts;
  };

  const simulateEmergency = () => {
    setEmergencyActive(true);
    setSystemStatus('emergency');
    
    // Add emergency alert
    const emergencyAlert: EmergencyAlert = {
      id: 'emergency-' + Date.now(),
      type: 'critical',
      message: 'Grid outage detected. System switched to battery backup mode. Monitor power consumption.',
      time: 'Just now',
      source: 'grid',
      severity: 'high'
    };

    setCurrentAlerts(prev => [emergencyAlert, ...prev]);
    toast.success('Emergency simulation activated (Frontend only)');
    
    // Reset after 10 seconds for demo
    setTimeout(() => {
      setEmergencyActive(false);
      setSystemStatus('normal');
    }, 10000);
  };

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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  const getAlertBackground = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-100 border-red-300';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Emergency Management</h1>
        <p className="text-lg text-gray-600">System alerts and emergency procedures (Frontend Demo)</p>
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
            Current Alerts from Solar Panel System
            <Badge className="bg-blue-100 text-blue-800 ml-2">
              Frontend Demo
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 ${getAlertBackground(alert.type)} border rounded-lg ${alert.type === 'critical' ? 'animate-pulse' : ''}`}>
                <div className="flex items-center gap-2">
                  {getAlertIcon(alert.type)}
                  <span className="font-semibold text-gray-800">
                    {alert.source.toUpperCase()} ALERT
                  </span>
                  {getAlertBadge(alert.type)}
                  <Badge variant="outline" className="ml-auto">
                    {alert.source}
                  </Badge>
                </div>
                <p className="text-gray-700 mt-2">{alert.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">{alert.time}</p>
                  <Badge className="bg-gray-100 text-gray-800">
                    Simulated Alert
                  </Badge>
                </div>
              </div>
            ))}
            
            {currentAlerts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                <p>No active alerts. All systems operating normally.</p>
              </div>
            )}
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
