"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const [filter, setFilter] = useState("ALL");

  const categories = ["ALL", "ROOMS", "BUILDING", "FOOD AREA"];

  const images = [
    { id: 1, category: "ROOMS", url: "https://images.unsplash.com/photo-1522771731470-ea4337bc8be6?q=80&w=800&auto=format&fit=crop", title: "Premium Single Room" },
    { id: 2, category: "ROOMS", url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop", title: "Double Sharing AC" },
    { id: 3, category: "BUILDING", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop", title: "Front Exterior" },
    { id: 4, category: "FOOD AREA", url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop", title: "Hygienic Kitchen" },
    { id: 5, category: "FOOD AREA", url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop", title: "Dining Area" },
    { id: 6, category: "ROOMS", url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?q=80&w=800&auto=format&fit=crop", title: "Triple Sharing" },
    { id: 7, category: "BUILDING", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", title: "Corridor & Security" },
    { id: 8, category: "FOOD AREA", url: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=800&auto=format&fit=crop", title: "Organic Tiffin Pack" },
  ];

  const filteredImages = filter === "ALL" ? images : images.filter(img => img.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6"
          >
            <Camera size={16} /> Photo Gallery
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 font-outfit mb-6"
          >
            Inside IR Boys PG
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Take a virtual tour of our premium accommodations, clean dining areas, and secure building premises.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filter === cat 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry-like Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden aspect-square bg-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-white/80 text-xs font-bold tracking-wider mb-1">{img.category}</span>
                  <h3 className="text-white text-xl font-bold">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-slate-500 flex flex-col items-center">
            <ImageIcon size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No images found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
