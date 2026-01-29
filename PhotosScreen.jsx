"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Heart, Mail } from "lucide-react"
import { photos, photoScreenHeading } from "@/data"
import Button from "../Button"

export default function PhotosScreen({ onNext }) {

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] card-shadow min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center will-change-transform">
        <h2
          className="text-2xl md:text-3xl font-semibold text-accent will-change-transform"
        >
          {photoScreenHeading}
        </h2>
        <p className="text-sm text-accent/70 mt-1 will-change-transform">(Swipe for more)</p>
      </motion.div>

      <div className="relative p-6 bg-linear-to-b from-white/80 to-violet-200 w-full rounded-[40px] flex items-end justify-center gif-box-shadow">

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Swiper
            effect="fade"
            modules={[EffectFade, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-53.75 h-70 md:w-59.25 md:h-77.5"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  className="h-full w-full rounded-3xl p-2 bg-linear-to-tr from-pink-200/60 via-rose-200/60 to-violet-200/60 backdrop-blur-sm"
                >

                  <div className="relative h-full w-full rounded-2xl overflow-hidden ">
                    {/* Top left corner decoration */}
                    <Heart className="absolute top-2 left-2 text-xl z-10 text-rose-400 fill-rose-400 opacity-90" />

                    {/* Top right corner decoration */}
                    <Heart className="absolute top-2 right-2 text-xl z-10 text-rose-400 fill-rose-400 opacity-90" />

                    {/* Image */}
                    <img
                      loading="lazy"
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="h-full w-full rounded-2xl object-contain"
                      style={{
                        filter: "drop-shadow(0 8px 16px rgba(244, 114, 182, 0.2))",
                      }}
                    />

                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-black/10 to-pink-100/10 pointer-events-none rounded-2xl" />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-4 flex justify-center"
      >
        <Button onClick={onNext} className="bg-[#ddd6ff] text-accent">
          <Mail size={18} /> Open My Message
        </Button>
      </motion.div>
    </div >
  )
}
