"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Wifi, 
  Droplet, 
  ChefHat, 
  Car, 
  Wind, 
  BedDouble, 
  Home, 
  ArrowRight,
  Phone,
  MessageCircle
} from "lucide-react";

export default function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const facilities = [
    { icon: <Droplet className="text-blue-500" size={32} />, title: "RO Water", desc: "24/7 purified drinking water" },
    { icon: <Wifi className="text-indigo-500" size={32} />, title: "Free WiFi", desc: "High-speed internet access" },
    { icon: <ChefHat className="text-orange-500" size={32} />, title: "Organic Food", desc: "Healthy & hygienic meals" },
    { icon: <Car className="text-slate-700" size={32} />, title: "Parking", desc: "Safe vehicle parking space" },
    { icon: <Wind className="text-teal-500" size={32} />, title: "AC/Non-AC", desc: "Rooms to suit your comfort" },
    { icon: <BedDouble className="text-purple-500" size={32} />, title: "Furnished", desc: "Fully equipped living spaces" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-900/80" />
          {/* We will use a geometric pattern or placeholder gradient since we don't have images yet */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522771731470-ea4337bc8be6?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              ✨ Premium Boys PG in Town
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 font-outfit leading-tight">
              A Homely Environment <br className="hidden md:block"/> Away From Home
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed">
              Experience the best-in-class accommodation with our fully furnished rooms, organic tiffin service, and premium amenities tailored for students and professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/rooms"
                className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-primary/30"
              >
                View Rooms <ArrowRight size={20} />
              </Link>
              <a 
                href="https://wa.me/917229976031"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                <MessageCircle size={20} /> WhatsApp Us
              </a>
              <a 
                href="tel:8107842564"
                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all lg:hidden"
              >
                <Phone size={20} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 left-0 w-full h-32 bg-slate-50 blur-2xl transform skew-y-2 z-10" />
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2 
              {...fadeIn}
              className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit mb-4"
            >
              Premium Facilities
            </motion.h2>
            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-slate-600 text-lg"
            >
              Everything you need for a comfortable and productive life, all included in your rent.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {facility.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{facility.title}</h3>
                <p className="text-slate-600 leading-relaxed">{facility.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/facilities"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View all facilities <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tiffin Highlight Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop" 
                  alt="Healthy Food" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass px-6 py-4 rounded-2xl">
                    <p className="text-white font-semibold text-lg flex items-center gap-2">
                      <ChefHat size={24} className="text-orange-400" />
                      100% Organic & Hygienic
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm">
                <ChefHat size={16} /> Optional Tiffin Service
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit leading-tight">
                Nutritious Home-Cooked Meals Everyday
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We understand the importance of good food. That's why we offer a dedicated tiffin service providing organic, hygienic, and purely vegetarian meals to keep you healthy and energized.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                  Freshly Prepared Daily
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                  Breakfast, Lunch & Dinner options
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                  Available for non-PG residents as well
                </li>
              </ul>

              <div className="pt-6">
                <Link 
                  href="/tiffin"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
                >
                  View Meal Plans
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Owner Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3 flex justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src="/images/PHOTO-2026-03-11-23-05-28.png" 
                  alt="PG Owner" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-2/3 text-center md:text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                 Meet the Owner
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit leading-tight">
                Dedicated to Your Comfort
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                "Welcome to IR Boys PG & Tiffin Centre! We created this space to provide a safe, comfortable, and homely environment for students and professionals. My team and I are personally involved in day-to-day operations to ensure everything from the organic food to the RO water is top-notch."
              </p>
              <div className="pt-2">
                <p className="font-bold text-slate-900 text-xl font-outfit">The PG Owner</p>
                <p className="text-slate-500 font-medium">Founder & Manager</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-outfit">Ready to move in?</h2>
          <p className="text-primary-foreground/90 text-lg mb-10 max-w-2xl mx-auto">
            Contact us today to check room availability and schedule a visit to our premises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:7229976031"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} /> Call 7229976031
            </a>
            <a 
              href="https://wa.me/918107842564"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} /> WhatsApp 8107842564
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
