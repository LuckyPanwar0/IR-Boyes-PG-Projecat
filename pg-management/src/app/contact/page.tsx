"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you shortly.");
    // In a real app, this would use a Server Action or API route to send an email/save to DB
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6"
          >
            <Mail size={16} /> Get In Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-outfit mb-6 leading-tight"
          >
            We'd love to hear from you
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 mb-8 leading-relaxed"
          >
            Have any questions about room availability, tiffin plans, or anything else? Reach out to us via phone, WhatsApp, or through the contact form below.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Contact Information Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 flex flex-col gap-6"
          >
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-start hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Call Us</h3>
              <p className="text-slate-500 mb-6">We are available daily from 9 AM to 9 PM to answer your calls.</p>
              <div className="flex flex-col gap-2 w-full">
                <a href="tel:7229976031" className="text-primary font-semibold hover:underline text-lg">+91 7229976031</a>
                <a href="tel:8107842564" className="text-primary font-semibold hover:underline text-lg">+91 8107842564</a>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-start hover:shadow-lg transition-shadow">
               <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-6">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">WhatsApp</h3>
              <p className="text-slate-500 mb-6">Prefer chatting? Drop us a text on WhatsApp anytime.</p>
              <a 
                href="https://wa.me/917229976031"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold shadow-md inline-flex justify-center items-center gap-2 hover:bg-[#20b858] transition-colors w-full"
              >
                Chat Now
              </a>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-start hover:shadow-lg transition-shadow">
               <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Visit Us</h3>
              <p className="text-slate-500">
                IR Boys PG & Tiffin Centre,<br/>
                [Insert Full Address Here]
              </p>
            </div>
          </motion.div>
          
          {/* Enquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-2/3"
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-2 font-outfit">Send an Enquiry</h3>
              <p className="text-slate-500 mb-8">Fill out the form below and we will get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-semibold text-slate-700">Interested In</label>
                    <select 
                      id="interest"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-700 appearance-none"
                    >
                      <option value="single">Single Sharing PG</option>
                      <option value="double">Double Sharing PG</option>
                      <option value="triple">Triple Sharing PG</option>
                      <option value="tiffin">Only Tiffin Service</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-semibold text-slate-700">Expected Move-in Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">Additional Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    placeholder="Hello! I would like to know more about..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center gap-2 py-4 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all"
                >
                  Submit Enquiry <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-slate-200"
        >
          {/* We use a placeholder Maps embed. Usually this would be the actual location embed URL from Google Maps */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113941.0428616186!2d75.75330880145293!3d26.885315849883584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1709848883647!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
}
