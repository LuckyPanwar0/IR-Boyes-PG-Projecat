import Link from "next/link";
import { Phone, Mail, MapPin, Building, ChefHat } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                IR
              </div>
              <span className="font-bold text-xl text-white">
                Boys PG & Tiffin
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mt-4">
              Premium accommodation for boys with an organic tiffin service. 
              Enjoy a homely environment with RO water, WiFi, and more.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/admin" className="text-xs text-slate-500 hover:text-white transition-colors">Admin Portal</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/rooms" className="hover:text-primary transition-colors">Rooms & Pricing</Link></li>
              <li><Link href="/facilities" className="hover:text-primary transition-colors">Facilities</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/tiffin" className="hover:text-primary transition-colors">Tiffin Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Building className="text-primary mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-white">PG Accommodation</p>
                  <p className="text-slate-400 text-xs mt-1">AC & Non-AC Rooms</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ChefHat className="text-primary mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-white">Organic Tiffin</p>
                  <p className="text-slate-400 text-xs mt-1">Breakfast, Lunch, Dinner</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="text-primary" size={18} />
                <div className="flex flex-col gap-1">
                  <a href="tel:7229976031" className="hover:text-white transition-colors">+91 7229976031</a>
                  <a href="tel:8107842564" className="hover:text-white transition-colors">+91 8107842564</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1" size={18} />
                <span className="leading-relaxed">
                  IR Boys PG & Tiffin Centre,<br/>
                  (Please update with full address map)
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <a 
                href="https://wa.me/917229976031" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
               >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} IR Boys PG & Tiffin Centre. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
