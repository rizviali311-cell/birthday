"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { messageScreenHeading, specialMessage } from "@/data"
import { ArrowRight } from "lucide-react"
import Button from "../Button"

export default function MessageScreen({ onNext }) {
    const [opened, setOpened] = useState(false)

    return (
        <div className="bg-[#fff8fc] p-7 rounded-[60px] card-shadow min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center will-change-transform">
                <h2
                    className="text-2xl md:text-3xl font-semibold text-primary text-center will-change-transform"
                >
                    {messageScreenHeading}
                </h2>

                <p className="text-primary/70 text-sm">
                    Tap to open
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                onClick={() => setOpened(!opened)}
                className={`card ${opened ? "tapped" : ""} relative h-71.25 w-full rounded-[40px] overflow-hidden gif-box-shadow cursor-pointer transition-all bg-linear-to-b from-white/80 to-pink-200 flex items-center justify-center max-w-71.25 will-change-transform`}
            >
                <div className={`cover z-10 will-change-transform bg-[#ffedea]!`} />

                <div className="relative px-6 h-56 overflow-y-auto text-foreground whitespace-pre-wrap">
                    {specialMessage}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                transition={{ duration: 0.5 }}
                className="mt-4 flex justify-center"
            >
                <Button
                    onClick={onNext}
                    className="bg-[#f1caeb] text-primary"
                >
                    Next
                    <ArrowRight size={20} className="mt-0.5" />
                </Button>
            </motion.div>

        </div>
    )
}
