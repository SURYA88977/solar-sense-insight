import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };
  return <div className="min-h-screen flex items-center justify-center p-4" style={{
    background: 'linear-gradient(to bottom right, #4B352A, #CA7842, #B2CD9C)'
  }}>
      <div className="absolute inset-0 bg-black/20 mx-0 rounded-xl"></div>
      
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-[#F0F2BD]/95 border-[#B2CD9C]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div style={{
            background: 'linear-gradient(to right, #CA7842, #B2CD9C)'
          }} className="p-3 rounded-tr-full rounded-tl-lg ">
              <img alt="Solar Sense Logo" src="/lovable-uploads/f0583145-c288-4030-ae64-3dad80a5afcb.png" className="h-8 w-8 rounded-tl-lg " />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#4B352A]">Welcome to SolarSense</CardTitle>
          <p className="text-[#b65b2c]/70 text-base font-medium">Track Every Ray With Solar Sense</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#4B352A]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4B352A]/60" />
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 border-[#B2CD9C] focus:border-[#CA7842] focus:ring-[#CA7842]" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#4B352A]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4B352A]/60" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 border-[#B2CD9C] focus:border-[#CA7842] focus:ring-[#CA7842]" required />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4 text-[#4B352A]/60" /> : <Eye className="h-4 w-4 text-[#4B352A]/60" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full text-white hover:opacity-90" style={{
            background: 'linear-gradient(to right, #CA7842, #B2CD9C)'
          }}>
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[#4B352A]/70">
              Demo credentials: any email and password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Login;