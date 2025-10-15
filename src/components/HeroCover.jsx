import Spline from '@splinetool/react-spline';
import { Rocket, Star } from 'lucide-react';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle vignette + gradient for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm tracking-wide">Welcome to the Cosmic Canvas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hello Hema
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-sky-300 to-emerald-300">let\'s paint the cosmos</span>
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80">
            Glide through a holographic nebula and sketch your ideas on a starlit canvas. A playful, immersive drawing studio set in a cosmic playground.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a href="#draw" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-fuchsia-500/90 hover:bg-fuchsia-500 text-white font-semibold transition">
              <Rocket className="w-5 h-5" />
              Start Drawing
            </a>
            <a href="#about" className="text-white/80 hover:text-white underline-offset-4 hover:underline">Learn more</a>
          </div>
        </div>
      </div>
    </section>
  );
}
