
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Wore Well</h3>
            <p className="mt-2 text-sm">Your destination for modern Indian fashion.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              <li><Link href="/shop" className="text-sm hover:text-primary">Shop</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="flex mt-2 space-x-4">
              <Link href="#" className="hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-primary"><Instagram size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Wore Well. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
