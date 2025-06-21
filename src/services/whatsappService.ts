
export interface WhatsAppMessage {
  to: string;
  type: 'text';
  text: {
    body: string;
  };
}

export interface EmergencyAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
  source: 'solar_panel' | 'battery' | 'inverter' | 'grid';
  severity: 'high' | 'medium' | 'low';
}

export class WhatsAppService {
  private apiKey: string | null = null;
  private phoneNumberId: string | null = null;
  private baseUrl = 'https://graph.facebook.com/v18.0';

  constructor() {
    // Get API credentials from localStorage for now
    this.apiKey = localStorage.getItem('whatsapp_api_key');
    this.phoneNumberId = localStorage.getItem('whatsapp_phone_number_id');
  }

  setCredentials(apiKey: string, phoneNumberId: string) {
    this.apiKey = apiKey;
    this.phoneNumberId = phoneNumberId;
    localStorage.setItem('whatsapp_api_key', apiKey);
    localStorage.setItem('whatsapp_phone_number_id', phoneNumberId);
  }

  async sendEmergencyAlert(alert: EmergencyAlert, recipientNumber: string): Promise<boolean> {
    if (!this.apiKey || !this.phoneNumberId) {
      console.error('WhatsApp API credentials not configured');
      return false;
    }

    const message: WhatsAppMessage = {
      to: recipientNumber,
      type: 'text',
      text: {
        body: `🚨 *SolarSense Emergency Alert*\n\n*Type:* ${alert.type.toUpperCase()}\n*Source:* ${alert.source}\n*Message:* ${alert.message}\n*Time:* ${alert.time}\n\nPlease check your SolarSense dashboard for more details.`
      }
    };

    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        console.log('WhatsApp alert sent successfully');
        return true;
      } else {
        console.error('Failed to send WhatsApp alert:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error sending WhatsApp alert:', error);
      return false;
    }
  }

  // Simulate receiving emergency alerts from solar panel systems
  simulateEmergencyAlerts(): EmergencyAlert[] {
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
  }
}

export const whatsappService = new WhatsAppService();
