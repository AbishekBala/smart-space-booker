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
          <Badge variant="secondary" className="mb-4">About GigLabs</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Premium Workspace Solutions in Mangaluru
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            GigLabs provides premium workspace solutions including private office spaces, meeting rooms, 
            and coworking areas designed for modern businesses and professionals.
          </p>
        </div>

        {/* About GigLabs Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">What is GigLabs?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  GigLabs is a premium workspace provider located in the heart of Mangaluru, offering flexible 
                  office solutions for businesses and professionals. We specialize in creating productive environments 
                  that adapt to your specific needs.
                </p>
                <p>
                  Located at Shalimar Complex, Kankanady, our modern facility provides three distinct workspace 
                  solutions: private office spaces, professional meeting rooms, and collaborative coworking areas.
                </p>
                <p>
                  Whether you're a startup, freelancer, or established business, GigLabs provides the professional 
                  environment and amenities you need to succeed.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/coworking-space.jpg" 
                alt="Modern GigLabs workspace with professionals collaborating"
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

        {/* Our Mission */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To provide flexible, premium workspace solutions that empower businesses and professionals to thrive. 
              We are committed to creating productive environments that combine professionalism with the flexibility 
              that modern work demands.
            </p>
          </div>
        </div>

        {/* Why Choose GigLabs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose GigLabs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-3">Prime Location</h3>
              <p className="text-muted-foreground">Located in Kankanady, Mangaluru with excellent connectivity and easy access to business districts.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-3">Modern Facilities</h3>
              <p className="text-muted-foreground">Fully equipped workspaces with high-speed internet, modern furniture, and professional amenities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-3">Flexible Booking</h3>
              <p className="text-muted-foreground">Hourly, daily, or monthly bookings available to suit your specific business requirements.</p>
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
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Book Your Workspace?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the GigLabs difference. Professional workspaces designed for productivity and success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/office-booking">Book Office Space</Link>
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