"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { MoveRight } from "lucide-react"
import Button from "../Button"

const WORDS = ["You", "are", "a", "Cutiee"]
const balloons = [
    { id: 1, xPct: 20, topPct: 18, color: "#ff8fab" },
    { id: 2, xPct: 40, topPct: 24, color: "#ffc2d1" },
    { id: 3, xPct: 60, topPct: 24, color: "#fca5a5" },
    { id: 4, xPct: 80, topPct: 18, color: "#e9a8ff" },
]

export default function BalloonGameScreen({ onNext }) {
    const [popped, setPopped] = useState([])
    const allPopped = popped.length === 4
    const wrapRef = useRef(null)
    const [box, setBox] = useState({ w: 0, h: 0 })
    const [t, setT] = useState(0)
    const [knotPos, setKnotPos] = useState({})
    const knotRefs = useRef(new Map())

    const registerKnot = (id) => (el) => {
        if (el) knotRefs.current.set(id, el)
    }

    const updateKnots = () => {
        const wrapRect = wrapRef.current?.getBoundingClientRect()
        if (!wrapRect) return
        const next = {}
        balloons.forEach((b) => {
            const el = knotRefs.current.get(b.id)
            if (!el) return
            const r = el.getBoundingClientRect()
            next[b.id] = {
                x: r.left - wrapRect.left + r.width / 2,
                y: r.top - wrapRect.top + r.height / 2,
            }
        })
        setKnotPos(next)
    }

    useEffect(() => {
        const r = new ResizeObserver(() => {
            if (!wrapRef.current) return
            setBox({ w: wrapRef.current.clientWidth, h: wrapRef.current.clientHeight })
            updateKnots()
        })
        if (wrapRef.current) r.observe(wrapRef.current)
        return () => r.disconnect()
    }, [])

    useEffect(() => {
        let raf
        const tick = () => {
            setT((v) => (v + 0.02) % (Math.PI * 2))
            updateKnots()
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    useEffect(() => {
        if (allPopped) {
            confetti({
                particleCount: 90,
                spread: 85,
                startVelocity: 38,
                origin: { y: 0.6 },
                ticks: 190,
                colors: [
                    "#ff8fab",
                    "#ffb3c6",
                    "#fca5a5",
                    "#e9a8ff",
                    "#ffd166"
                ]

            })

        }
    }, [allPopped])

    const pop = (id) => {
        if (popped.includes(id)) return
        setPopped((prev) => [...prev, id])
        confetti({
            particleCount: 45,
            spread: 45,
            startVelocity: 28,
            origin: { y: 0.7 },
            ticks: 100,
            colors: [
                "#ff8fab",
                "#ffb3c6",
                "#fca5a5",
                "#e9a8ff",
                "#ffd166"
            ]
        })

    }

    const stringPath = (b, idx) => {
        const k = knotPos[b.id]
        if (!k || !box.w || !box.h) return ""
        const startX = k.x
        const startY = k.y
        const sway = Math.sin(t + idx) * 18
        const c1x = startX + sway * 0.4
        const c1y = startY + 80
        const c2x = box.w * 0.5 + sway * 0.2
        const c2y = box.h * 0.7
        const endX = box.w * 0.5
        const endY = box.h
        return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`
    }

    return (
        <section className="px-3 md:px-6 py-10 w-full mx-auto flex flex-col items-center justify-center">
            <motion.div
                layout
                ref={wrapRef}
                className="h-[55vh] bg-[#fff8fc] p-7 rounded-[60px] card-shadow min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
            >
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: allPopped ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl md:text-2xl text-center text-secondary font-semibold will-change-transform"
                >
                    Pop all 4 balloons
                </motion.div>

                {balloons.map((b, i) => (
                    <motion.div
                        key={`word-${b.id}`}
                        className="absolute text-xl md:text-2xl font-semibold pointer-events-none"
                        style={{
                            left: `${b.xPct}%`,
                            top: `${b.topPct + (window.innerWidth > 768 ? 18 : 16)}%`,
                            transform: "translateX(-50%)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: popped.includes(b.id) ? 1 : 0 }}
                    >
                        <span className="text-xl md:text-2xl text-primary drop-shadow">
                            {WORDS[i]}
                        </span>
                    </motion.div>
                ))}

                <AnimatePresence>
                    {balloons.map((b) => (
                        <Balloon
                            key={b.id}
                            data={b}
                            popped={popped.includes(b.id)}
                            onPop={() => pop(b.id)}
                            registerKnot={registerKnot(b.id)}
                        />
                    ))}
                </AnimatePresence>

                <svg className="pointer-events-none absolute inset-0" width={box.w} height={box.h}>
                    {balloons.map((b, idx) => {
                        const d = stringPath(b, idx)
                        return d ? (
                            <path key={`str-${b.id}`} d={d} stroke="rgba(0,0,0,0.25)" strokeWidth="1.4" fill="none" />
                        ) : null
                    })}
                </svg>
            </motion.div>

            <div className="mt-8 flex justify-center">
                <AnimatePresence>
                    {allPopped && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                        >
                            <Button onClick={onNext} className="bg-[#ffccd3] text-secondary">Next
                                <MoveRight size={18} />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

function Balloon({ data, onPop, popped, registerKnot }) {
    const { id, xPct, topPct, color } = data
    return (
        <motion.button
            onClick={onPop}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: popped ? 0 : 1, scale: popped ? 1.12 : 1 }}
            exit={{ opacity: 0, scale: 1.25, transition: { duration: 0.22 } }}
            transition={{ y: { repeat: Number.POSITIVE_INFINITY, duration: 2.8, ease: "easeInOut" } }}
            className="absolute -translate-x-1/2"
            style={{ left: `${xPct}%`, top: `${topPct}%`, transform: "translateX(-50%)" }}
            aria-label={`Balloon ${id}`}
        >
            <div className="relative">
                <div
                    className="h-24 w-20 md:h-28 md:w-22 rounded-[50%_50%_45%_45%/55%_55%_45%_45%] z-10"
                    style={{
                        background: `radial-gradient(60% 60% at 35% 35%, rgba(255,255,255,0.6) 0 26%, transparent 27%), linear-gradient(145deg, ${color}, rgba(255,255,255,0.3))`,
                        boxShadow: "inset -6px -10px 16px rgba(0,0,0,0.18), 0 10px 22px rgba(0,0,0,0.22)",
                    }}
                />
                <div ref={registerKnot} className="mx-auto -mt-1 h-3 w-3 rotate-45 relative z-10" style={{ background: color }} />
            </div>
        </motion.button>
    )
}
