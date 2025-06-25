import { useState, useEffect } from "react";
import { Check, Star, Zap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import TrialRequestForm from "@/components/TrialRequestForm";
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

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isTrialFormOpen, setIsTrialFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const plans = [
    {
      name: "Basic",
      icon: Building,
      description: "Perfect for small construction teams",
      monthlyPrice: 199,
      yearlyPrice: 1999,
      features: [
        "Up to 5 projects",
        "Basic project planning",
        "Budget tracking",
        "Team collaboration (5 users)",
        "Mobile app access",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro", 
      icon: Zap,
      description: "For growing construction businesses",
      monthlyPrice: 299,
      yearlyPrice: 2999,
      features: [
        "Up to 25 projects",
        "Advanced project planning",
        "Real-time budget tracking",
        "Team collaboration (25 users)",
        "Mobile app access",
        "Priority support",
        "Custom reports",
        "Integration with accounting tools",
        "Progress tracking with photos"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      icon: Star,
      description: "For large construction enterprises",
      monthlyPrice: 1999,
      yearlyPrice: 19990,
      features: [
        "Unlimited projects",
        "Enterprise project planning", 
        "Advanced analytics & reporting",
        "Unlimited users",
        "Mobile app access",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced security features",
        "White-label options",
        "API access",
        "Custom training sessions"
      ],
      popular: false
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

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
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your construction business. Upgrade or downgrade at any time.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>
      </motion.section>

      {/* Pricing Cards */}
      <motion.section
        className="pb-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold">
                      {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                    </div>
                    <div className="text-muted-foreground">
                      per {isYearly ? 'year' : 'month'}
                    </div>
                    {isYearly && (
                      <div className="text-sm text-green-600 mt-1">
                        Save {formatPrice(plan.monthlyPrice * 12 - plan.yearlyPrice)} annually
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/')}
                  >
                    Get Access Code
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Custom Plan Section */}
      <motion.section
        className="py-16 px-4 bg-muted/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Large enterprise or have specific requirements? We'll create a custom plan that fits your needs perfectly.
          </p>
          {isLoggedIn ? (
            <Button size="lg" variant="outline" onClick={() => setIsTrialFormOpen(true)}>
              Get Access Code
            </Button>
          ) : (
            <Button size="lg" variant="outline" onClick={() => navigate('/register')}>
              Get Access Code
            </Button>
          )}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial available?",
                answer: "We offer a 14-day free trial for all plans. No credit card required to get started."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, UPI, and net banking through our secure payment partner Razorpay."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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

      {/* Trial Request Form */}
      <TrialRequestForm
        isOpen={isTrialFormOpen}
        onClose={() => setIsTrialFormOpen(false)}
      />
    </div>
  );
};

export default Pricing;
