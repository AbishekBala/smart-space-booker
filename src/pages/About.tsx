import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building2, Award, Heart, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">About Gigspace</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Premium Workspace Solutions by Giglabs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Giglabs provides premium office spaces for flexible usage through Gigspace - transforming how businesses 
            and professionals experience workspace solutions.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Introduction</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Gigspace by Giglabs offers premium office spaces designed for modern businesses seeking flexibility 
                  and professional environments. Our workspace solutions cater to companies of all sizes, from startups 
                  to established enterprises.
                </p>
                <p>
                  We understand that traditional office leases don't always fit the dynamic nature of today's business 
                  landscape. That's why we've created flexible workspace options that adapt to your changing needs.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/coworking-space.jpg" 
                alt="Modern coworking space with professionals collaborating"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Who We Are</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Giglabs is a forward-thinking company specializing in workspace solutions that bridge the gap between 
              traditional office spaces and the evolving needs of modern businesses. Through our Gigspace brand, we 
              deliver premium, flexible office environments that enhance productivity and foster growth.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-muted-foreground">
              <p>
                Founded with a vision to revolutionize the workspace industry, Giglabs recognized the growing demand 
                for flexible, premium office solutions. As businesses increasingly sought alternatives to long-term 
                leases and rigid office structures, we saw an opportunity to create something better.
              </p>
              <p>
                Starting from our flagship location in Mangaluru, we've built our reputation on providing exceptional 
                workspace experiences that combine the professionalism of traditional offices with the flexibility 
                that modern businesses require.
              </p>
              <p>
                Today, Gigspace stands as a testament to our commitment to innovation in workspace design and 
                customer service excellence.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-8">
                <div className="text-center">
                  <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Office Spaces</h3>
                  <p className="text-muted-foreground">
                    Premium private offices for businesses requiring dedicated workspace with professional amenities.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-8">
                <div className="text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Meeting Rooms</h3>
                  <p className="text-muted-foreground">
                    Professional meeting spaces equipped with modern technology for presentations and collaborations.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-8">
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Coworking</h3>
                  <p className="text-muted-foreground">
                    Flexible coworking environments that foster creativity and networking among professionals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Foundation</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-8">
                <div className="text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide flexible, premium workspace solutions that empower businesses to thrive and grow 
                    while maintaining the highest standards of professionalism and service.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-8">
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the leading provider of premium flexible workspace solutions, setting new standards 
                    for office environments that adapt to the future of work.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-8">
                <div className="text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                  <p className="text-muted-foreground">
                    Excellence in service, flexibility in solutions, integrity in relationships, and innovation 
                    in workspace design and technology.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Gigspace</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Premium Locations</h3>
              <p className="text-sm text-muted-foreground">Strategic business locations with excellent connectivity and amenities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Professional Community</h3>
              <p className="text-sm text-muted-foreground">Connect with like-minded professionals and growing businesses.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Solutions</h3>
              <p className="text-sm text-muted-foreground">Customizable workspace options that scale with your business needs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Service</h3>
              <p className="text-sm text-muted-foreground">Dedicated support and maintenance ensuring exceptional workspace experiences.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardContent className="pt-6 text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">1</div>
              <p className="text-muted-foreground">Premium Location</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">100+</div>
              <p className="text-muted-foreground">Happy Clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">1</div>
              <p className="text-muted-foreground">City</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">5★</div>
              <p className="text-muted-foreground">Customer Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Experience Premium Workspace?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join businesses that have discovered the Gigspace advantage. Flexible, professional, and designed for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/coworking">Explore Spaces</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
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