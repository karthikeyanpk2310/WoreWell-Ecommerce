
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Award, Users, Handshake } from 'lucide-react';

const founders = [
  {
    name: 'P.K. Karthikeyan',
    role: 'Founder',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbGV8ZW58MHx8fHwxNzYzNTQyNDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'professional headshot'
  },
  {
    name: 'Bharathi',
    role: 'Co-Founder',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDB8fHx8MTc2MzU0MjQzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'professional headshot'
  },
  {
    name: 'Gopika',
    role: 'Co-Founder',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDB8fHx8MTc2MzU0MjQzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'professional headshot'
  },
];

export default function AboutUsPage() {
  return (
    <div className="space-y-16">
      <div className="text-center pt-8">
        <h1 className="text-5xl font-headline font-bold text-gray-800 dark:text-gray-200">About Wore Well</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Weaving together tradition and modernity, we bring the finest Indian textiles from the loom to your wardrobe, empowering artisans every step of the way.
        </p>
      </div>

      <section>
        <Card className="shadow-lg border-none bg-muted/30">
          <CardContent className="p-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <Handshake className="w-12 h-12 text-primary" />
              <h2 className="text-3xl font-headline font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                Wore Well was born from a shared passion: to celebrate the rich heritage of Indian textiles and uplift the master weavers who are the custodians of this timeless craft. We embarked on a journey across the country, from the vibrant looms of Kanchipuram to the intricate workshops of Varanasi, to build a bridge between these incredible artisans and a global audience that appreciates quality, authenticity, and style.
              </p>
            </div>
             <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkcmVzc2VzJTIwfGVufDB8fHx8MTc2MzU0MzA4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="A collection of stylish dresses on hangers"
                    fill
                    className="object-cover"
                    data-ai-hint="dresses"
                />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-4xl font-headline font-bold mb-12">Meet Our Founders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {founders.map((founder) => (
            <div key={founder.name} className="flex flex-col items-center">
              <div className="relative h-48 w-48 mb-4">
                <Image
                  src={founder.imageUrl}
                  alt={`Portrait of ${founder.name}`}
                  fill
                  className="object-cover rounded-full shadow-lg"
                  data-ai-hint={founder.imageHint}
                />
              </div>
              <h3 className="text-xl font-bold">{founder.name}</h3>
              <p className="text-primary font-semibold">{founder.role}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex-row items-center gap-4">
            <Target className="w-8 h-8 text-accent" />
            <CardTitle className="m-0">Our Motto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide quality, Indian-made clothing that empowers local weavers. We are dedicated to making their exceptional craftsmanship reachable worldwide, ensuring that every garment tells a story of heritage and skill.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-4">
            <Award className="w-8 h-8 text-primary" />
            <CardTitle className="m-0">A Remarkable Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Through unwavering dedication to our mission, Wore Well has proudly achieved an annual revenue of <span className="font-bold text-foreground">INR 20 Crores within just five years</span>, a testament to the global appreciation for authentic, handcrafted Indian fashion.
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
