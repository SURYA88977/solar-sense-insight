
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sun, BarChart3, Leaf, AlertTriangle, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from './PageTransition';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Sun },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/impact', label: 'Impact', icon: Leaf },
    { path: '/system', label: 'System', icon: Settings },
    { path: '/emergency', label: 'Emergency', icon: AlertTriangle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #F0F2BD, #B2CD9C)' }}>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden border-[#4B352A] text-[#4B352A] hover:bg-[#F0F2BD]"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 text-white transform transition-transform duration-300 ease-in-out z-40 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} style={{ background: 'linear-gradient(to bottom, #4B352A, #CA7842)' }}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <img 
              src="/lovable-uploads/be013ad3-8a41-4049-9cab-75044766642e.png" 
              alt="Solar Panel" 
              className="h-8 w-8"
            />
            <h1 className="text-2xl font-bold text-[#F0F2BD]">SolarSense</h1>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    isActive(item.path)
                      ? 'bg-[#F0F2BD]/20 text-[#F0F2BD] scale-105'
                      : 'text-[#B2CD9C] hover:bg-[#F0F2BD]/10 hover:text-[#F0F2BD]'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="md:ml-64 min-h-screen">
        <main className="p-6">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Layout;
