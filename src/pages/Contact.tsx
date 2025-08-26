import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare,
  Send,
  ArrowRight
} from "lucide-react";

const Contact = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "919677689494";
    const messageText = `Hello! I'm ${formData.firstName} ${formData.lastName}.\n\nSubject: ${formData.subject}\n\nMessage: ${formData.message}\n\nContact Details:\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-400 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your workspace experience? Let's start a conversation.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 max-w-6xl mx-auto">
          {/* Contact Information - Left Side */}
          <div className="space-y-6">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Call Us</h3>
                      <p className="text-gray-600 text-sm">+91 96776 89494</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                      <p className="text-gray-600 text-sm">Quick Support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600 text-sm">info@gigspace.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location & Map */}
            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Visit Our Office</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      5th floor, Shalimar Complex,<br />
                      near Old Ganesh Medical, Kankanady,<br />
                      Mangaluru, Karnataka 575002
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Map */}
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.1192175303563!2d74.85561480948891!3d12.868058217089825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b08f42d4aab%3A0x5531aeacffeee4f5!2sGigabyte%20Labs%20Private%20Limited!5e1!3m2!1sen!2sin!4v1755078609619!5m2!1sen!2sin" 
                    width="100%" 
                    height="250" 
                    style={{border:0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gigspace Location"
                    className="w-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form - Right Side */}
          <div className="flex flex-col">
            <Card className="border border-gray-200 bg-white flex-1 hover:shadow-md transition-shadow">
              <CardHeader className="pb-6 px-6 pt-6">
                <CardTitle className="text-2xl font-bold text-gray-900">Send us a message</CardTitle>
                <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex-1 flex flex-col">
                <form onSubmit={handleSendMessage} className="space-y-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        placeholder="Enter your first name" 
                        className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        placeholder="Enter your last name" 
                        className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Enter your email address" 
                        className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        placeholder="Enter your phone number" 
                        className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      placeholder="What would you like to discuss?" 
                      className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 flex-1 flex flex-col">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Tell us more about your requirements..." 
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none flex-1 min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send via WhatsApp
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center mt-3">
                      By clicking send, you'll be redirected to WhatsApp to complete your message.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;