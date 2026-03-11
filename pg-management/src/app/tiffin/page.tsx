"use client";

import { motion } from "framer-motion";
import { ChefHat, Leaf, Clock, CheckCircle } from "lucide-react";

export default function TiffinPage() {
  const plans = [
    {
      name: "Standard Plan",
      desc: "Perfect for students needing consistent, healthy meals.",
      price: "3,500",
      meals: "Lunch & Dinner",
      features: ["Pure Veg & Organic", "Menu changes daily", "Roti, Sabzi, Dal, Rice", "Salad & Pickle included"],
      color: "border-slate-200",
      bg: "bg-white",
      btn: "bg-slate-900 text-white hover:bg-slate-800"
    },
    {
      name: "Premium Full Day",
      desc: "Complete nutritional coverage from morning to night.",
      price: "4,500",
      meals: "Breakfast, Lunch & Dinner",
      popular: true,
      features: ["Everything in Standard", "Morning Breakfast + Tea", "Sunday Special Menu", "Sweet dish twice a week", "Priority delivery"],
      color: "border-orange-500 shadow-orange-500/20 scale-105 z-10",
      bg: "bg-white",
      btn: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30"
    },
    {
      name: "Single Meal",
      desc: "For those who occasionally need a healthy homemade meal.",
      price: "2,000",
      meals: "Lunch OR Dinner",
      features: ["Choose any one meal", "Pure Veg & Organic", "Flexible timings", "Easy opt-out days"],
      color: "border-slate-200",
      bg: "bg-white",
      btn: "bg-slate-100 text-slate-800 hover:bg-slate-200"
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-orange-50/50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
              <ChefHat size={16} /> 100% Organic Meals
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-outfit mb-6 leading-tight">
              Taste of Home, <br/> Cooked with Love.
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our tiffin service is renowned for its uncompromised quality and hygiene. We use locally sourced organic vegetables and pure ingredients to ensure every meal is nutritious, safe, and delicious.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">100% Pure Veg</h4>
                  <p className="text-sm text-slate-500">Separately maintained vegetarian kitchen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Timely Delivery</h4>
                  <p className="text-sm text-slate-500">Hot meals delivered exactly on time</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 w-full"
          >
             <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1600&auto=format&fit=crop" 
                  alt="Indian Thali" 
                  className="object-cover w-full h-full"
                />
            </div>
          </motion.div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-outfit mb-4">Meal Plans Pricing</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Affordable monthly packages designed for your convenience. Non-PG residents can also subscribe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border hover:shadow-xl transition-all ${plan.color} ${plan.bg}`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 bg-orange-500 text-white text-center text-sm font-bold py-1.5 rounded-t-3xl border-b border-orange-600">
                  Most Recommended
                </div>
              )}
              
              <div className={`mt-${plan.popular ? '6' : '0'}`}>
                <h3 className="text-2xl font-bold text-slate-900 font-outfit">{plan.name}</h3>
                <p className="text-slate-500 text-sm mt-2 min-h-[40px]">{plan.desc}</p>
              </div>

              <div className="my-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-slate-900 font-outfit">₹{plan.price}</span>
                  <span className="text-slate-500 font-medium pb-1">/ month</span>
                </div>
                <div className="mt-3 inline-block px-3 py-1 bg-slate-100 rounded-lg text-sm font-semibold text-slate-700">
                  {plan.meals}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <span className="text-slate-700 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/917229976031?text=Hi, I am interested in the ${plan.name} for the Tiffin Service.`}
                target="_blank"
                rel="noreferrer"
                className={`w-full block text-center py-3.5 rounded-xl font-semibold transition-all ${plan.btn}`}
              >
                Subscribe Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
