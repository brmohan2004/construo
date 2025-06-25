import { Building2, Users, Trophy, Target, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

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

const About = () => {
  const achievements = [
    { icon: Users, number: "500+", label: "Happy Clients" },
    { icon: Building2, number: "1000+", label: "Projects Completed" },
    { icon: Trophy, number: "₹100+ Cr", label: "Value Managed" },
    { icon: Target, number: "98%", label: "Success Rate" },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      bio: "20+ years in construction management"
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      image: "/placeholder.svg", 
      bio: "Tech leader with expertise in SaaS platforms"
    },
    {
      name: "Amit Patel",
      role: "Head of Operations",
      image: "/placeholder.svg",
      bio: "Construction industry veteran"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section
        className="pt-24 pb-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-6">
            Building the Future of Construction
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Construo, we're revolutionizing how construction projects are planned, managed, and executed. 
            Our mission is to make construction management accessible, efficient, and profitable for everyone.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize construction project management by providing cutting-edge tools that 
                enable builders, contractors, and project managers to deliver exceptional results 
                on time and within budget.
              </p>
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                A world where every construction project runs smoothly, efficiently, and 
                sustainably through the power of intelligent technology and seamless collaboration.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center">
                <Building2 className="w-32 h-32 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section
        className="py-16 px-4 bg-muted/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <achievement.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                  <div className="text-muted-foreground">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

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
    </div>
  );
};

export default About;
