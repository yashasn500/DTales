

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  // Duplicate testimonials multiple times to ensure seamless looping on wide screens
  const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-32 bg-black text-white overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-dtales-navy/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-blue-300"
          >
            Testimonials
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Trusted by the ambitious.
          </motion.h2>
          <motion.p
             className="text-xl text-gray-400"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
              We don't just build digital presence; we build relationships that drive growth.
          </motion.p>
        </div>

        {/* Infinite Marquee Slider */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Masks for smooth fade in/out */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          <div className="flex">
            <motion.div
              className="flex gap-6 md:gap-8 py-4 pl-4 pr-4"
              animate={{ 
                x: ["0%", "-50%"] 
              }}
              transition={{ 
                ease: "linear", 
                duration: 40, 
                repeat: Infinity,
              }}
              style={{ width: "fit-content" }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* We render the items in two distinct sets to allow for perfect looping. 
                  If we use 4 sets in the array, we simply loop halfway through. 
                  The trick is ensuring the visible track is always full. */}
              {MARQUEE_ITEMS.map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="w-[350px] md:w-[450px] flex-shrink-0 bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-[2rem] hover:bg-zinc-900 hover:border-white/10 transition-all duration-300 group flex flex-col cursor-grab active:cursor-grabbing"
                >
                  <Quote className="text-dtales-navy mb-6 w-10 h-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <p className="text-lg leading-relaxed mb-8 text-gray-300 group-hover:text-white transition-colors flex-grow">
                    "{t.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg flex-shrink-0 text-white">
                      {t.client.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-base leading-tight text-white truncate">{t.client}</h4>
                      <p className="text-blue-400 text-sm font-medium truncate">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;