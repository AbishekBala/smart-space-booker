import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building2, Award, Heart, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const About = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">About GigSpace</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Premium Workspace Solutions in Mangaluru
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            GigSpace provides premium workspace solutions including private office spaces, meeting rooms, 
            and coworking areas designed for modern businesses and professionals.
          </p>
        </div>

        {/* About GigSpace Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">What is GigSpace?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  GigSpace is a premium workspace provider located in the heart of Mangaluru, offering flexible 
                  office solutions for businesses and professionals. We specialize in creating productive environments 
                  that adapt to your specific needs.
                </p>
                <p>
                  Located at Shalimar Complex, Kankanady, our modern facility provides three distinct workspace 
                  solutions: private office spaces, professional meeting rooms, and collaborative coworking areas.
                </p>
                <p>
                  Whether you're a startup, freelancer, or established business, GigSpace provides the professional 
                  environment and amenities you need to succeed.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/coworking-space.jpg" 
                alt="Modern GigSpace workspace with professionals collaborating"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Our Workspace Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Workspace Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardContent className="pt-8">
                <div className="text-center">
                  <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Private Office Spaces</h3>
                  <p className="text-muted-foreground">
                    Fully furnished private offices perfect for teams and businesses needing dedicated workspace with 
                    high-speed internet, security, and professional amenities.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="pt-8">
                <div className="text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Meeting Rooms</h3>
                  <p className="text-muted-foreground">
                    Professional meeting spaces equipped with presentation technology, whiteboards, and comfortable 
                    seating for productive business discussions.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="pt-8">
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Coworking Areas</h3>
                  <p className="text-muted-foreground">
                    Open collaborative spaces ideal for freelancers, remote workers, and small teams seeking 
                    a professional environment with networking opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose GigSpace */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Why Choose GigSpace?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="h-full">
              <CardContent className="pt-6 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Strategic Location</h3>
                <p className="text-sm text-muted-foreground">
                  Centrally located in Kankanady with easy access to major business districts and transportation hubs.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="pt-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  High-quality furnishings, modern technology, and professional-grade amenities for optimal productivity.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="pt-6 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Community Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Building a vibrant community of professionals through networking events and collaborative opportunities.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent className="pt-6 text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Flexible Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Adaptable workspace options that grow with your business needs, from day passes to long-term leases.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <div className="bg-secondary/50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At GigSpace, we're committed to empowering businesses and professionals by providing exceptional 
              workspace solutions that foster creativity, collaboration, and success. We believe that the right 
              environment is crucial for achieving your goals.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the growing community of professionals who have chosen GigSpace as their workspace partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/spaces">Explore Our Spaces</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
