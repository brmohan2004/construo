import { ArrowRight, Building2, BarChart3, Users, Shield, Zap, CheckCircle, Play, X, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero3D from "@/components/Hero3D";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TrialRequestForm from "@/components/TrialRequestForm";
import { motion } from "framer-motion";

// Add type definition for Screen Orientation API
declare global {
  interface ScreenOrientation {
    lock(orientation: 'landscape' | 'portrait' | 'natural' | 'any'): Promise<void>;
    unlock(): void;
  }
}

const VideoDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      // Request fullscreen and landscape orientation when video opens
      try {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {
            // Handle case where orientation lock is not supported
            console.log('Orientation lock not supported');
          });
        }
      } catch (error) {
        console.log('Orientation API not supported');
      }
    } else {
      // Unlock orientation when video closes
      try {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } catch (error) {
        console.log('Orientation API not supported');
      }
    }

    // Cleanup function to unlock orientation when component unmounts
    return () => {
      try {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } catch (error) {
        console.log('Orientation API not supported');
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] p-0 bg-black">
        <div className="relative aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/fwkqWyGwI78?autoplay=1&playsinline=1"
            title="Platform Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function handleBuilderRedirect() {
  const userAgent = window.navigator.userAgent || window.navigator.vendor;
  if (/android/i.test(userAgent)) {
    window.open('https://play.google.com/store', '_blank');
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    window.open('https://apps.apple.com/', '_blank');
  } else if (/Windows NT/.test(userAgent)) {
    window.open('https://apps.microsoft.com/', '_blank'); // Microsoft Store
  } else if (/Macintosh/.test(userAgent)) {
    window.open('https://apps.apple.com/us/genre/mac/id39', '_blank'); // Mac App Store
  } else {
    window.open('https://play.google.com/store', '_blank');
  }
}

const Index = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isTrialFormOpen, setIsTrialFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const features = [{
    icon: Building2,
    title: "Project Planning",
    description: "Advanced project planning tools with Gantt charts, milestones, and resource allocation."
  }, {
    icon: BarChart3,
    title: "Budget Tracking",
    description: "Real-time budget monitoring with cost forecasting and expense categorization."
  }, {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools for architects, contractors, and project managers."
  }, {
    icon: Shield,
    title: "Compliance Management",
    description: "Built-in compliance tracking for safety regulations and building codes."
  }, {
    icon: Zap,
    title: "Automation",
    description: "Automated workflows for approvals, notifications, and progress updates."
  }];
  const testimonials = [{
    name: "Rajesh Kumar",
    role: "Project Manager",
    company: "Mumbai Construction Ltd.",
    content: "Construo has transformed how we manage our projects. We've reduced delays by 40% and improved our profit margins significantly.",
    avatar: "/placeholder.svg"
  }, {
    name: "Priya Sharma",
    role: "Architect",
    company: "Design Studio Pro",
    content: "The collaboration features are incredible. Our entire team stays in sync, and clients love the transparency.",
    avatar: "/placeholder.svg"
  }, {
    name: "Amit Patel",
    role: "Contractor",
    company: "Patel Builders",
    content: "Budget tracking and resource management have never been this easy. Highly recommended for any construction business.",
    avatar: "/placeholder.svg"
  }];
  const stats = [{
    number: "500+",
    label: "Projects Completed"
  }, {
    number: "₹100+ Cr",
    label: "Value Managed"
  }, {
    number: "98%",
    label: "Customer Satisfaction"
  }, {
    number: "50+",
    label: "Cities Covered"
  }];
  return <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Bolt Badge Fixed Top Right */}
      <img
        src="/bolt-badge.png"
        alt="Powered by Bolt"
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          width: "80px",
          height: "80px",
          zIndex: 100,
          borderRadius: "50%",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
        }}
      />
      
      {/* Video Dialog */}
      <VideoDialog isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 3D Background Animation */}
        <div className="absolute inset-0 opacity-60">
          <Hero3D />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-orange-50/80" />
        
        {/* Hero Content */}
        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 animate-fade-in">
            🚀 Now supporting Indian construction standards
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
            Build Smarter,
            <br />
            Deliver Faster
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            The complete construction project management platform that helps teams 
            plan, track, and deliver projects on time and within budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isLoggedIn ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
                onClick={() => setIsTrialFormOpen(true)}
              >
                Get Access Code
              </Button>
            ) : (
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
                >
                  Get Access Code
                </Button>
              </Link>
            )}
            <Button
              size="lg"
              variant="outline"
              className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 border-blue-600"
              onClick={() => setIsVideoOpen(true)}
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>)}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-24 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed specifically for the construction industry, 
              helping you manage every aspect of your projects efficiently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </motion.section>

      {/* Social Proof Section */}
      <motion.section
        className="py-24 px-4 bg-muted/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-muted-foreground">
              See what construction professionals are saying about Construo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 px-4 bg-gradient-to-r from-blue-600 to-orange-500 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Construction Projects?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join thousands of construction professionals who have streamlined their 
            project management with Construo. Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white hover:bg-white text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200 text-slate-950">
                View Pricing
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full animate-pulse" style={{
          animationDelay: '0.5s'
        }}></div>
        </div>
      </motion.section>

      {/* Trial Request Form */}
      <TrialRequestForm
        isOpen={isTrialFormOpen}
        onClose={() => setIsTrialFormOpen(false)}
      />

      <Footer />
      {/* Floating Builder Button */}
      <Button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2 px-6 py-3 text-lg rounded-full"
        onClick={handleBuilderRedirect}
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
      >
        <Building className="w-6 h-6 mr-2" />
        Became a Builder
      </Button>
    </div>;
};
export default Index;