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
          <Badge variant="secondary" className="mb-4">About SpaceBook</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transforming How People Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to create flexible, inspiring workspaces that adapt to the modern professional's needs. 
            From private offices to collaborative coworking spaces, we're building the future of work.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardContent className="pt-6 text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">50+</div>
              <p className="text-muted-foreground">Locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">10K+</div>
              <p className="text-muted-foreground">Happy Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">25</div>
              <p className="text-muted-foreground">Cities</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018, SpaceBook began with a simple observation: the traditional office wasn't working 
                  for the modern professional. Remote work was growing, but people still craved community, collaboration, 
                  and professional environments.
                </p>
                <p>
                  Starting with our first location in downtown San Francisco, we've grown to become one of the leading 
                  flexible workspace providers, serving everyone from solo entrepreneurs to Fortune 500 companies.
                </p>
                <p>
                  Today, we're proud to offer premium workspace solutions that adapt to how people actually work - 
                  flexible, connected, and designed for productivity and wellbeing.
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
                    To provide flexible, inspiring workspaces that empower professionals and businesses 
                    to thrive in the modern economy.
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
                    A world where work happens anywhere, supported by spaces that foster creativity, 
                    collaboration, and community.
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
                    Community first, flexibility always, quality in everything we do, and sustainability 
                    for future generations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">SJ</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Sarah Johnson</h3>
                  <p className="text-primary text-sm mb-2">CEO & Founder</p>
                  <p className="text-sm text-muted-foreground">
                    Former tech executive with 15+ years building scalable businesses and passionate about the future of work.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">MC</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Michael Chen</h3>
                  <p className="text-primary text-sm mb-2">CTO</p>
                  <p className="text-sm text-muted-foreground">
                    Technology leader focused on creating seamless digital experiences that enhance the workspace experience.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">ER</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Emma Rodriguez</h3>
                  <p className="text-primary text-sm mb-2">Head of Operations</p>
                  <p className="text-sm text-muted-foreground">
                    Operations expert ensuring every space delivers exceptional experiences for our community members.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose SpaceBook?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Premium Locations</h3>
              <p className="text-sm text-muted-foreground">Prime business districts with easy access to transportation and amenities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Vibrant Community</h3>
              <p className="text-sm text-muted-foreground">Connect with entrepreneurs, freelancers, and growing companies.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Solutions</h3>
              <p className="text-sm text-muted-foreground">From day passes to dedicated offices, find the perfect fit for your needs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Award-Winning Service</h3>
              <p className="text-sm text-muted-foreground">Recognized for excellence in customer service and workspace design.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Transform Your Work Experience?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect workspace with SpaceBook. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/coworking">Start with Coworking</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;