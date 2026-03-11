"use client";

import { motion } from "framer-motion";
import { 
  Wifi, 
  Droplet, 
  Car, 
  Wind, 
  BedDouble, 
  Shirt,
  ShieldCheck,
  Zap,
  Coffee,
  ChefHat
} from "lucide-react";

export default function FacilitiesPage() {
  const facilities = [
    { 
      id: "ro-water",
      icon: <Droplet className="text-blue-500" size={40} />, 
      title: "Purified RO Water", 
      desc: "24/7 access to clean, safe, and hygienic RO purified drinking water stored in food-grade steel containers.",
      color: "bg-blue-50"
    },
    { 
      id: "wifi",
      icon: <Wifi className="text-indigo-500" size={40} />, 
      title: "24x7 High-Speed WiFi", 
      desc: "Stay connected with uninterrupted high-speed internet. Ideal for online classes, remote work, and streaming.",
      color: "bg-indigo-50"
    },
    { 
      id: "laundry",
      icon: <Shirt className="text-pink-500" size={40} />, 
      title: "Laundry Service", 
      desc: "Hassle-free laundry service with washing and ironing facilities available to keep your clothes fresh and clean.",
      color: "bg-pink-50"
    },
    { 
      id: "parking",
      icon: <Car className="text-slate-700" size={40} />, 
      title: "Secure Parking Facility", 
      desc: "Dedicated and secure parking space for two-wheelers with 24/7 CCTV surveillance.",
      color: "bg-slate-100"
    },
    { 
      id: "food",
      icon: <ChefHat className="text-orange-500" size={40} />, 
      title: "Organic Tiffin & Food", 
      desc: "Delicious, home-cooked style meals prepared in a hygienic kitchen using quality ingredients and organic vegetables.",
      color: "bg-orange-50"
    },
    { 
      id: "furnished",
      icon: <BedDouble className="text-purple-500" size={40} />, 
      title: "Fully Furnished Rooms", 
      desc: "Rooms equipped with premium beds, comfortable mattresses, spacious wardrobes, and dedicated study tables.",
      color: "bg-purple-50"
    },
    { 
      id: "ac",
      icon: <Wind className="text-teal-500" size={40} />, 
      title: "AC & Non-AC Rooms", 
      desc: "Choose between air-conditioned and non-air-conditioned rooms based on your preference and budget.",
      color: "bg-teal-50"
    },
    { 
      id: "security",
      icon: <ShieldCheck className="text-green-600" size={40} />, 
      title: "Round the Clock Security", 
      desc: "Your safety is our priority. The premises are under 24/7 CCTV surveillance with a secure entry system.",
      color: "bg-green-50"
    },
    { 
      id: "power",
      icon: <Zap className="text-yellow-500" size={40} />, 
      title: "Power Backup", 
      desc: "Continuous power supply with robust inverter backup ensuring no disruptions during study or sleep.",
      color: "bg-yellow-50"
    },
    { 
      id: "homely",
      icon: <Coffee className="text-amber-700" size={40} />, 
      title: "Homely Environment", 
      desc: "A peaceful and disciplined atmosphere that feels just like home, conducive to both studying and relaxing.",
      color: "bg-amber-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-slate-900 absolute top-0 left-0 right-0 h-[400px] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-900/90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 pt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-outfit mb-6"
          >
            World-class Facilities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-200"
          >
            We don't just provide a room; we provide a lifestyle.
            Enjoy unmatched amenities designed for your absolute comfort.
          </motion.p>
        </div>

        {/* Facilities Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {facilities.map((fac) => (
            <motion.div
              key={fac.id}
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex gap-6 group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`w-20 h-20 rounded-2xl ${fac.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                {fac.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 font-outfit">{fac.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {fac.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-primary/10 rounded-3xl p-10 text-center border border-primary/20"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4 font-outfit">Experience it yourself!</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a visit today to see our premium facilities and furnished rooms in person. 
            We would love to show you around.
          </p>
          <a
            href="https://wa.me/918107842564?text=Hi, I would like to schedule a visit to check the PG facilities."
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all"
          >
            Schedule a Visit via WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
