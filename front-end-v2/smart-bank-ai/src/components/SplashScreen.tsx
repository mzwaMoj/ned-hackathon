'use client';

import { useEffect, useState } from 'react';
import { Shield, Smartphone, Wallet, Cloud, CreditCard, Settings } from 'lucide-react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00C853] text-white transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 pt-2 pb-1 text-sm">
        <span>5:40</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-1.5 bg-white rounded-sm"></div>
            <div className="w-1 h-2 bg-white rounded-sm"></div>
            <div className="w-1 h-2.5 bg-white rounded-sm"></div>
            <div className="w-1 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-xs ml-1">LTE</span>
          <div className="w-6 h-3 border border-white rounded-sm ml-2">
            <div className="w-full h-full bg-white rounded-sm"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-8">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-white text-base md:text-lg mb-3 font-sans">Welcome to</p>
          <div className="flex items-baseline justify-center gap-1 md:gap-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-sans tracking-tight">NEDBANK</h1>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ADFF2F] font-sans tracking-tight">MONEY</h1>
            <span className="text-xl md:text-2xl text-[#ADFF2F] font-sans align-super">™</span>
          </div>
        </div>

        <div className="relative w-full max-w-md h-64 flex items-center justify-center">
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2">
            <div className="relative">
              <Shield className="w-14 h-14 md:w-16 md:h-16 text-white/70" strokeWidth={1.5} fill="none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white/70"></div>
                <div className="absolute w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/70"></div>
                <div className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full border border-white/70"></div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative">
              <Smartphone className="w-20 h-28 md:w-24 md:h-32 text-white/80" strokeWidth={1.5} fill="none" />
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white/80"></div>
            </div>
          </div>

          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4">
            <Wallet className="w-10 h-10 md:w-12 md:h-12 text-white/70" strokeWidth={1.5} fill="none" />
            <Cloud className="w-10 h-10 md:w-12 md:h-12 text-white/70" strokeWidth={1.5} fill="none" />
            <div className="relative">
              <CreditCard className="w-10 h-10 md:w-12 md:h-12 text-white/70" strokeWidth={1.5} fill="none" />
              <div className="absolute -top-0.5 -right-0.5">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-white/70"></div>
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-white/70"></div>
              </div>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <line
              x1="15%"
              y1="50%"
              x2="30%"
              y2="50%"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <line
              x1="70%"
              y1="50%"
              x2="85%"
              y2="50%"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          </svg>

          <div className="absolute bottom-6 md:bottom-8 right-1/4">
            <Settings className="w-5 h-5 md:w-6 md:h-6 text-white/50" strokeWidth={1.5} fill="none" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 font-sans leading-relaxed">
        <p>
          Nedbank Ltd Reg No 1951/000009/06. Licensed financial services provider (FSP9363) and registered credit provider (NCRCP16).
        </p>
      </div>
    </div>
  );
}

