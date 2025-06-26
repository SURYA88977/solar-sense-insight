
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { whatsappService } from '@/services/whatsappService';
import { toast } from 'sonner';

interface WhatsAppConfigProps {
  onConfigured: () => void;
}

const WhatsAppConfig = ({ onConfigured }: WhatsAppConfigProps) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('whatsapp_api_key') || '');
  const [phoneNumberId, setPhoneNumberId] = useState(localStorage.getItem('whatsapp_phone_number_id') || '');
  const [recipientNumber, setRecipientNumber] = useState(localStorage.getItem('whatsapp_recipient') || '');

  const handleSave = () => {
    if (!apiKey || !phoneNumberId || !recipientNumber) {
      toast.error('Please fill in all fields');
      return;
    }

    whatsappService.setCredentials(apiKey, phoneNumberId);
    localStorage.setItem('whatsapp_recipient', recipientNumber);
    
    toast.success('WhatsApp configuration saved successfully');
    onConfigured();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>WhatsApp Alert Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="apiKey">WhatsApp Business API Access Token</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your WhatsApp Business API token"
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumberId">Phone Number ID</Label>
          <Input
            id="phoneNumberId"
            value={phoneNumberId}
            onChange={(e) => setPhoneNumberId(e.target.value)}
            placeholder="Enter your WhatsApp Business phone number ID"
          />
        </div>
        
        <div>
          <Label htmlFor="recipientNumber">Recipient Phone Number</Label>
          <Input
            id="recipientNumber"
            value={recipientNumber}
            onChange={(e) => setRecipientNumber(e.target.value)}
            placeholder="Enter recipient number (e.g., +1234567890)"
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Save Configuration
        </Button>
        
        <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-lg">
          <p><strong>Note:</strong> To get WhatsApp Business API credentials:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Create a Meta for Developers account</li>
            <li>Set up WhatsApp Business API</li>
            <li>Get your Access Token and Phone Number ID</li>
            <li>Add webhook endpoints for receiving alerts</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppConfig;
