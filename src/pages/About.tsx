import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Lightbulb, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import coworkingImage from "@/assets/coworking-space.jpg";

const About = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About GigSpace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premium workspace solutions in Mangaluru, designed for modern businesses and professionals.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Professional Workspace Partner
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                GigSpace is a premium workspace provider located in the heart of Mangaluru, offering 
                flexible office solutions that adapt to your business needs.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Located at Shalimar Complex, Kankanady, we provide modern facilities with three distinct 
                workspace solutions: private offices, meeting rooms, and collaborative coworking areas.
              </p>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                <span>Shalimar Complex, Kankanady, Mangaluru</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src={coworkingImage}
                alt="Modern GigSpace workspace"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>

          {/* Workspace Solutions */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Workspace Solutions
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Private Offices</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Fully furnished private offices with high-speed internet, security, and professional amenities.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Meeting Rooms</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Professional meeting spaces with presentation technology and comfortable seating.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Coworking Areas</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Open collaborative spaces ideal for freelancers and small teams seeking flexibility.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose GigSpace?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Strategic Location</h3>
                  <p className="text-gray-600">Centrally located with easy access to major business districts.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                  <p className="text-gray-600">Modern technology and professional-grade amenities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible Solutions</h3>
                  <p className="text-gray-600">Adaptable options from day passes to long-term leases.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Community Focus</h3>
                  <p className="text-gray-600">Vibrant professional community with networking opportunities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12 text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              To empower businesses and professionals by providing exceptional workspace solutions 
              that foster creativity, collaboration, and success in the heart of Mangaluru.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the growing community of professionals who have chosen GigSpace as their workspace partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/spaces")}
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Explore Our Spaces
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={() => navigate("/contact")}
                variant="outline" 
                size="lg"
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
