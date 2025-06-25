import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Building } from "lucide-react";
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

const Blog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Sustainable Construction",
      date: "October 26, 2023",
      author: "Construo Team",
      excerpt: "Explore innovative practices and materials shaping environmentally-friendly building.",
      image: "/blog-sustainable.jpg",
      link: "/blog/sustainable-construction"
    },
    {
      id: 2,
      title: "5 Essential Project Management Tools for Contractors",
      date: "October 20, 2023",
      author: "Construo Team",
      excerpt: "Discover the top tools that can streamline your construction projects from start to finish.",
      image: "/blog-tools.jpg",
      link: "/blog/project-management-tools"
    },
    {
      id: 3,
      title: "Navigating Construction Regulations: A Comprehensive Guide",
      date: "October 15, 2023",
      author: "Construo Team",
      excerpt: "Understand the complex world of building codes and permits to ensure compliance.",
      image: "/blog-regulations.jpg",
      link: "/blog/construction-regulations"
    },
    {
      id: 4,
      title: "Maximizing Efficiency on the Job Site",
      date: "October 10, 2023",
      author: "Construo Team",
      excerpt: "Tips and strategies to optimize workflows and boost productivity in your projects.",
      image: "/blog-efficiency.jpg",
      link: "/blog/job-site-efficiency"
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
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-6">
            Our Latest Insights
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Stay updated with the latest trends, tips, and news in the construction industry.
          </p>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <motion.section
        className="pb-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <Link to={post.link}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {post.date} &bull; {post.author}
                  </p>
                  <h3 className="text-xl font-bold mb-3">
                    <Link to={post.link} className="hover:text-blue-600 transition-colors duration-200">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <Link to={post.link} className="text-blue-600 hover:underline flex items-center gap-1">
                    Read More 
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section (Optional) */}
      {!isLoggedIn && (
        <motion.section
          className="py-16 px-4 bg-gradient-to-r from-blue-600 to-orange-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Success?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join Construo and streamline your construction projects with our powerful management tools.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Access Code
              </Button>
            </Link>
          </div>
        </motion.section>
      )}

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

export default Blog; 