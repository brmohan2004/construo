import { useState } from "react";
import { Menu, X, Building2, User, LogOut, Wrench, CheckCircle, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // This would typically come from your auth context/state
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Close the profile dialog
    setIsProfileOpen(false);
    
    // Clear user data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    
    // Navigate to home page
    navigate('/');
    // Force a full page reload to reflect logout state changes
    window.location.reload();
  };

  const ProfileDialog = () => (
    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {userData.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{userData.name || 'User'}</h3>
              <p className="text-sm text-muted-foreground">{userData.email || 'user@example.com'}</p>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Construction Management Tools</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <Wrench className="w-6 h-6 mb-2 text-blue-600" />
                <h5 className="font-medium">Project Tools</h5>
                <p className="text-sm text-muted-foreground">Manage your projects</p>
              </div>
              <div className="p-4 border rounded-lg">
                <CheckCircle className="w-6 h-6 mb-2 text-green-600" />
                <h5 className="font-medium">Approval Status</h5>
                <p className="text-sm text-muted-foreground">Track approvals</p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Applied Services</h4>
            <div className="space-y-2">
              {userData.services?.map((service: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                  <ClipboardList className="w-4 h-4 text-blue-600" />
                  <span>{service}</span>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">No services applied yet</p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/30 shadow-lg"
         style={{
           background: 'rgba(255, 255, 255, 0.25)',
           backdropFilter: 'blur(18px)',
           WebkitBackdropFilter: 'blur(18px)',
           boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
           border: '1px solid rgba(255, 255, 255, 0.18)',
         }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Construo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive(item.href) 
                    ? "text-blue-600" 
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {userData.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive(item.href) 
                      ? "text-blue-600" 
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Dialog */}
      <ProfileDialog />
    </nav>
  );
};

export default Navbar;
