
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  ClipboardList, 
  Phone, 
  User, 
  MenuIcon, 
  X,
  Stethoscope
} from 'lucide-react';
import { cn } from "@/lib/utils";

const navItems = [
  { 
    path: '/', 
    name: 'Dashboard', 
    icon: Activity 
  },
  { 
    path: '/questionnaire', 
    name: 'Questionnaire', 
    icon: ClipboardList 
  },
  { 
    path: '/consultation', 
    name: 'Consultation', 
    icon: Phone 
  },
  { 
    path: '/profile', 
    name: 'Profile', 
    icon: User 
  },
  { 
    path: '/doctor', 
    name: 'Doctor', 
    icon: Stethoscope 
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 px-4 transition-all duration-300 ease-in-out",
        scrolled ? "py-2 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50" 
                : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">NarcoSense</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center space-x-1 transition-all duration-200 hover-float",
                  isActive 
                    ? "text-primary bg-primary/10 font-medium" 
                    : "text-gray-600 hover:text-primary hover:bg-gray-100/80"
                )}
              >
                <IconComponent className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2 border border-gray-100">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md flex items-center space-x-3",
                    isActive 
                      ? "text-primary bg-primary/10 font-medium" 
                      : "text-gray-600 hover:text-primary hover:bg-gray-100"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
