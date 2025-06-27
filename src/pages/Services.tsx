import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X, CheckCircle2, Play, ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Interior Design",
    icon: "🛋",
    description: "Design planning, 2D/3D layouts",
    image: "/images/services/interior-design.jpg"
  },
  {
    id: 2,
    name: "Civil Construction",
    icon: "🧱",
    description: "Complete build and site execution",
    image: "/images/services/construction.jpg"
  },
  {
    id: 3,
    name: "Electrical Work",
    icon: "💡",
    description: "Wiring, lighting, automation",
    image: "/images/services/electrical.jpg"
  },
  {
    id: 4,
    name: "Plumbing",
    icon: "🚿",
    description: "Bathroom, kitchen, drainage",
    image: "/images/services/plumbing.jpg"
  },
  {
    id: 5,
    name: "Renovation & Remodeling",
    icon: "🧰",
    description: "Interior revamp, extension plans",
    image: "/images/services/renovation.jpg"
  },
  {
    id: 6,
    name: "Site Planning & Layout",
    icon: "📐",
    description: "Land surveying, layout planning",
    image: "/images/services/planning.jpg"
  },
  {
    id: 7,
    name: "Landscaping",
    icon: "🌿",
    description: "Outdoor aesthetics, garden setup",
    image: "/images/services/landscaping.jpg"
  },
  {
    id: 8,
    name: "Post-Construction Cleanup",
    icon: "🧹",
    description: "Cleaning and finishing services",
    image: "/images/services/cleanup.jpg"
  }
];

const SuccessIllustration = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
  >
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
      <p className="text-muted-foreground">{message}</p>
    </motion.div>
  </motion.div>
);

const VideoDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[800px] p-0 bg-black">
      <div className="relative aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/IjlYXtI2-GU?autoplay=1"
          title="Services Overview"
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

const Services = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [showServiceSuccess, setShowServiceSuccess] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // Form refs
  const serviceFormRef = useRef<HTMLFormElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  const scrollToForm = () => {
    const formSection = document.getElementById('request-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowServiceSuccess(true);
    
    // Clear the form
    if (serviceFormRef.current) {
      serviceFormRef.current.reset();
    }
    
    setTimeout(() => {
      setShowServiceSuccess(false);
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactSuccess(true);
    setIsContactFormOpen(false);
    
    // Clear the form
    if (contactFormRef.current) {
      contactFormRef.current.reset();
    }
    
    setTimeout(() => {
      setShowContactSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Go to Home Button */}
      <Link to="/" className="fixed top-6 left-6 z-50">
        <Button className="flex items-center gap-2 bg-white/80 text-black backdrop-blur-md shadow-lg border border-white/60 hover:bg-white">
          <ArrowLeft className="w-5 h-5" />
          Go to Home
        </Button>
      </Link>

      <AnimatePresence>
        {showServiceSuccess && (
          <SuccessIllustration message="Thank you for registering our service. Our team will contact you soon within 24-48 hours." />
        )}
        {showContactSuccess && (
          <SuccessIllustration message="Thank you for requesting our team. We will contact you within 24-48 hours." />
        )}
      </AnimatePresence>

      {/* Video Dialog */}
      <VideoDialog isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-primary/20 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            End-to-End Construction Support, From Planning to Execution
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 text-muted-foreground"
          >
            Explore our curated services like Interior Design, Construction, Electrical Work, and more.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" onClick={scrollToForm}>Request a Quote</Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setIsVideoOpen(true)}
              className="group relative overflow-hidden"
            >
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Explore Services
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-2">{service.icon}</div>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="request-form" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Request a Service</h2>
            <form ref={serviceFormRef} className="space-y-6" onSubmit={handleServiceSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input required placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input required type="tel" placeholder="Enter your mobile number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email ID</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location / Site Address</label>
                  <Input required placeholder="Enter site address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Start Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Build-up Area (sq.ft)</label>
                  <Input required type="number" placeholder="Enter area" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of BHK / Rooms</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Room' : 'Rooms'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Requirements Description</label>
                <Textarea
                  placeholder="Describe your requirements in detail"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Files (Optional)</label>
                <Input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" />
              </div>
              <div className="flex justify-center gap-4">
                <Button size="lg" type="submit">
                  Submit Request
                </Button>
                <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline">
                      Contact Our Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Contact Our Team</DialogTitle>
                    </DialogHeader>
                    <form ref={contactFormRef} className="space-y-4 py-4" onSubmit={handleContactSubmit}>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input required placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mobile Number</label>
                        <Input required type="tel" placeholder="Enter your mobile number" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email ID</label>
                        <Input type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Textarea
                          placeholder="Enter your address"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsContactFormOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          Submit
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;