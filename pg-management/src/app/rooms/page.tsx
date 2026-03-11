"use client";

import { motion } from "framer-motion";
import { Check, Wind, Users, Bed, Refrigerator, Tv } from "lucide-react";
import Link from "next/link";

export default function RoomsPage() {
  const rooms = [
    {
      id: "single-ac",
      name: "Single Room (AC)",
      price: "12,000",
      type: "Single Occupancy",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1522771731470-ea4337bc8be6?q=80&w=800&auto=format&fit=crop",
      features: ["Personal AC", "Attached Bathroom", "Study Table & Chair", "Spacious Wardrobe", "Premium Mattress"]
    },
    {
      id: "double-ac",
      name: "Double Sharing (AC)",
      price: "8,500",
      type: "Double Occupancy",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop",
      features: ["Shared AC", "Attached Bathroom", "Individual Study Desks", "Separate Wardrobes", "Smart TV in common area"]
    },
    {
      id: "triple",
      name: "Triple Sharing (Non-AC)",
      price: "6,000",
      type: "Triple Occupancy",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=800&auto=format&fit=crop",
      features: ["Cooler / Fan", "Shared Bathroom", "Ample Storage", "Natural light", "Budget Friendly"]
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6"
          >
            <Bed size={16} /> Accommodations
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 font-outfit mb-6"
          >
            Rooms & Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Choose from our range of fully furnished rooms designed for maximum comfort and privacy. 
            All prices include complimentary WiFi, RO water, and daily housekeeping.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-lg border ${
                room.isPopular ? "border-primary shadow-primary/20 scale-105 z-10" : "border-slate-200"
              }`}
            >
              {room.isPopular && (
                <div className="absolute top-0 inset-x-0 bg-primary text-white text-center text-sm font-bold py-1.5 z-20">
                  Most Popular
                </div>
              )}
              
              <div className="relative h-56">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-xl font-bold text-white">{room.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-300 text-sm mt-1">
                    <Users size={14} /> {room.type}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 font-outfit">₹{room.price}</span>
                  <span className="text-slate-500 font-medium"> / mo</span>
                </div>

                <ul className="space-y-4 mb-8 text-slate-700">
                  {room.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="font-medium text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href={`https://wa.me/917229976031?text=Hi, I am interested in the ${room.name} (${room.type}) at IR Boys PG.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full block text-center py-3.5 rounded-xl font-semibold transition-all ${
                    room.isPopular 
                    ? "bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg" 
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  Enquire Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inclusion Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-outfit">Need something specific?</h3>
            <p className="text-slate-300 mb-8 text-lg">
              We also offer customized arrangements and corporate tie-ups. Drop us a message or call to discuss your exact requirements.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/contact" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
