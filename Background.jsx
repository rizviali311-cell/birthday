import { Balloon, Star } from 'lucide-react'
import { memo } from 'react'

function Background() {
    return (
        <>
            {/* BLOBS */}
            <div className="fixed top-[25%] -left-52.5 w-105 h-105 rounded-full bg-[radial-gradient(circle_at_center,#f9f2d8_0%,#f9f2d8_40%,transparent_70%)] blur-md opacity-70" />

            <div className="fixed -top-30 -right-50 w-112.5 h-112.5 rounded-full bg-[radial-gradient(circle_at_center,#f7d7cf_0%,#f7d7cf_40%,transparent_72%)] blur-md opacity-50" />

            <div className="fixed -bottom-40 -right-50 w-105 h-105 rounded-full bg-[radial-gradient(circle_at_center,#e2deea_0%,#e2deea_40%,transparent_70%)] blur-sm opacity-90" />

            {/* HEARTS */}
            <Star className="fixed top-[10%] md:top-[16%] right-[16%] w-10 h-10 -rotate-12 text-purple-300 fill-purple-300 opacity-40" />
            <Balloon className="fixed top-[12%] left-8 md:top-[15%] w-16 h-16 rotate-18 text-rose-300 opacity-50" />
            <Star className="fixed bottom-[10%] -left-4.5 w-18 h-18 -rotate-12 text-rose-300 fill-rose-300 opacity-40 stroke-2" />
            <Balloon className="fixed  bottom-[8%] -right-4.5 w-20 h-20 -rotate-12 text-pink-300 opacity-40 stroke-2" />

            {/* BLUR OVERLAY */}
            <div className="fixed inset-0 backdrop-blur-[2px] bg-white/10" />
        </>
    )
}


export default memo(Background)