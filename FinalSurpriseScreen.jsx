"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { RotateCw } from "lucide-react"
import { finalScreenHeading, overlayMessage, overlayText } from "@/data"
import Button from "../Button"

export default function FinalSurpriseScreen({ onReplay }) {
    const [opened, setOpened] = useState(false)

    const fire = () => {
        confetti({
            particleCount: 100,
            angle: 90,
            spread: 180,
            startVelocity: 45,
            gravity: 1.2,
            origin: { y: 0.6 },
            colors: ["#ff8fab", "#ffb3c6", "#fca5a5", "#e9a8ff", "#ffd166"]
        });

    }

    return (
        <div className="bg-[#fff8fc] p-7 rounded-[60px] card-shadow min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-semibold text-secondary leading-tight will-change-transform"
            >
                {finalScreenHeading}
            </motion.h2>

            <div className="flex flex-col items-center py-4 bg-linear-to-b from-white/80 to-rose-200 rounded-[40px] gif-box-shadow w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center will-change-transform"
                >
                    <button
                        className="hover:scale-105 transition-transform duration-300 active:scale-95"
                        onClick={() => {
                            setOpened(true)
                            fire()
                            setTimeout(fire, 300)
                        }}
                    >
                        <img
                            loading="lazy"
                            src="/gifs/gift.gif"
                            alt="Gift box"
                            className="h-32 md:h-36 object-cover"
                        />
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="text-secondary/70 will-change-transform">
                    Tap the gift
                </motion.div>
            </div>

            {/* overlay */}
            <AnimatePresence>
                {opened && (
                    <motion.div
                        className="fixed p-4 inset-0 z-10 grid place-items-center bg-black/30 backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0.75, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.97, opacity: 0 }}
                            transition={{ duration: 1, type: "spring", stiffness: 200 }}
                            className="relative z-10 max-w-110 rounded-[60px] p-6 text-center bg-linear-to-b from-white/80 to-rose-200 gif-box-shadow drop-shadow"
                        >
                            <img
                                loading="lazy"
                                src="/gifs/surprise.gif"
                                alt="surprise"
                                className="mx-auto w-44 md:w-52 object-cover"
                            />
                            <p className="text-xl text-secondary font-semibold mt-2 drop-shadow-xl">{overlayText}</p>
                            <div className="text-pretty text-secondary/80 drop-shadow-xl mt-2">
                                {overlayMessage}
                            </div>
                            <div className="mt-4 flex justify-center">
                                <Button className="text-secondary bg-white/70" onClick={onReplay}><RotateCw size={18} /> Replay</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
