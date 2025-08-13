import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare,
  Send
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our spaces or services? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Workspace Avenue, Tech District<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      Main: (555) 123-4567<br />
                      Support: (555) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      General: info@spacebook.com<br />
                      Bookings: bookings@spacebook.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8am - 8pm<br />
                      Saturday: 9am - 5pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connect With Us */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Follow us on social media for updates and workspace inspiration.
                </p>
                {/* Social media links would go here */}
                <div className="text-sm text-muted-foreground">
                  Social media integration coming soon...
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is your message about?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here..." 
                      className="min-h-32"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="privacy" className="rounded" />
                    <Label htmlFor="privacy" className="text-sm">
                      I agree to the{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </a>
                    </Label>
                  </div>
                  
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Interactive map would be integrated here</p>
                  <p className="text-sm">123 Workspace Avenue, Tech District, San Francisco, CA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;