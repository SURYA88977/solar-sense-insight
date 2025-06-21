
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sun, BarChart3, Leaf, AlertTriangle, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-teal-600 to-teal-800 text-white transform transition-transform duration-300 ease-in-out z-40 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Sun className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl font-bold">SolarSense</h1>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white'
                      : 'text-teal-100 hover:bg-white/10 hover:text-white'
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
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="md:ml-64 min-h-screen">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
