import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Business Address",
      value: "123 Luxury Way, Suite 500, London, UK",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: "+44 (0) 20 7946 0000",
    },
    {
      icon: Mail,
      label: "Email Address",
      value: "concierge@auxempi.com",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Available 24/7 for Reservations",
    },
  ];

  return (
    <MainLayout>
      <Navbar />
      
      {/* 1. Hero / Page Header */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm uppercase tracking-[0.4em] font-medium mb-4 block">
              Get In Touch
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
              Contact <span className="text-gradient-gold">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              We are dedicated to providing the highest level of service. Whether you have a question about our fleet or need a custom travel solution, our team is here to assist your journey.
            </p>
            <div className="luxury-divider mt-8" />
          </motion.div>
        </div>
      </section>

      {/* 2. Main Contact Section (Split Layout) */}
      <section className="bg-background pb-24 md:pb-32 lg:pb-40">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            
            {/* LEFT SIDE – Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-charcoal/30 p-8 md:p-12 rounded-sm border border-border/20 backdrop-blur-sm"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">Send a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-12" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-12" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 000-0000" 
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors h-12" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">Subject (Optional)</Label>
                    <Select>
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary transition-colors h-12">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-charcoal border-border text-foreground">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="booking">Booking Question</SelectItem>
                        <SelectItem value="corporate">Corporate Accounts</SelectItem>
                        <SelectItem value="fleet">Fleet Information</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we assist you today?" 
                    className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary transition-colors resize-none" 
                  />
                </div>

                <Button variant="gold-cta" size="xl" className="w-full group">
                  Send Message
                  <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
            </motion.div>

            {/* RIGHT SIDE – Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pt-12"
            >
              <div className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">Concierge Services</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Our dedicated concierge team is available around the clock to handle your requests. Whether you require immediate assistance or are planning a future journey, we ensure every detail is handled with precision.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center border border-primary/20">
                      <item.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground mb-2">{item.label}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 border border-primary/20 bg-primary/5 rounded-sm">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Response Time Guarantee</h3>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  "At AUXEMPI, we value your time. Our team guarantees a response to all email inquiries within 60 minutes during business operations."
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-[450px] bg-charcoal/50 rounded-sm border border-border/30 overflow-hidden relative grayscale"
          >
            {/* Google Maps Embed Placeholder - Using a stylized luxury placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2033&auto=format&fit=crop')] bg-cover bg-center opacity-40">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              <div className="relative z-10 text-center p-8">
                <MapPin className="text-primary mx-auto mb-4" size={48} />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Our London Headquarters</h3>
                <p className="text-muted-foreground mb-6">123 Luxury Way, Suite 500, London</p>
                <Button variant="luxury-outline" size="sm">
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default Contact;
