
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <div className="text-center pt-8">
        <h1 className="text-5xl font-headline font-bold text-gray-800 dark:text-gray-200">Get In Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about our products, artisans, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              Our Headquarters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>Wore Well Pvt. Ltd.</p>
            <p>123 Weaver's Lane, Textile City</p>
            <p>Coimbatore, Tamil Nadu, 641001</p>
            <p>India</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-primary" />
                Contact Information
            </CardTitle>
          </Header>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <a href="mailto:support@worewell.com" className="hover:text-primary">support@worewell.com</a>
             </div>
             <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <a href="tel:+919876543210" className="hover:text-primary">+91 987 654 3210</a>
             </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
          <Image 
            src="https://images.unsplash.com/photo-1599658880111-3d7f58a5e396?q=80&w=2070&auto=format&fit=crop"
            alt="Modern office building exterior"
            fill
            className="object-cover"
            data-ai-hint="modern building"
          />
      </div>

    </div>
  );
}
