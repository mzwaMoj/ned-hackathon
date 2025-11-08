'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Menu, Lock, QrCode, Wallet, FileText, ArrowRight } from 'lucide-react';

export default function LoginScreen() {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>(['', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handlePinChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every(digit => digit !== '') && newPin.length === 5) {
      setTimeout(() => {
        router.push('/overview');
      }, 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    const digits = pastedData.split('').filter(char => /^\d$/.test(char));
    
    if (digits.length > 0) {
      const newPin = [...pin];
      digits.forEach((digit, i) => {
        if (i < 5) {
          newPin[i] = digit;
        }
      });
      setPin(newPin);
      
      const nextIndex = Math.min(digits.length, 4);
      inputRefs.current[nextIndex]?.focus();
      
      if (newPin.every(digit => digit !== '') && newPin.length === 5) {
        setTimeout(() => {
          router.push('/overview');
        }, 300);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-between items-center px-6 pt-2 pb-1 text-sm text-zinc-900">
        <span>5:59</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-1.5 bg-zinc-900 rounded-sm"></div>
            <div className="w-1 h-2 bg-zinc-900 rounded-sm"></div>
            <div className="w-1 h-2.5 bg-zinc-900 rounded-sm"></div>
            <div className="w-1 h-3 bg-zinc-900 rounded-sm"></div>
          </div>
          <div className="w-4 h-3 border border-zinc-900 rounded-sm ml-1">
            <div className="w-2 h-1.5 bg-zinc-900 rounded-sm m-0.5"></div>
          </div>
          <div className="w-6 h-3 border border-zinc-900 rounded-sm ml-2">
            <div className="w-full h-full bg-zinc-900 rounded-sm"></div>
          </div>
        </div>
      </div>

      <header className="flex items-center justify-between px-6 py-4">
        <div className="w-10 h-10 bg-[#00C853] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">N</span>
        </div>
        <div className="flex items-center gap-4">
          <MessageCircle className="w-6 h-6 text-zinc-700" strokeWidth={1.5} />
          <Menu className="w-6 h-6 text-zinc-700" strokeWidth={1.5} />
        </div>
      </header>

      <div className="flex-1 px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">
            Welcome back,
          </h1>
          <h1 className="text-3xl font-bold text-zinc-900">
            JOHN DOE...
          </h1>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 mb-4">
            App PIN
          </label>
          <div className="flex gap-3 mb-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-semibold border-b-2 border-zinc-300 focus:border-[#00C853] focus:outline-none transition-colors"
              />
            ))}
          </div>
          <button className="flex items-center gap-2 text-[#00C853] font-medium text-sm">
            <span>Or use your Nedbank ID password</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 mb-8">
          <div className="bg-zinc-100 rounded-lg p-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-[#00C853] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-zinc-900 mb-1">
                Voted #1 retail bank 2024
              </h3>
              <p className="text-sm text-zinc-600">
                2024 World Economic Magazine Awards - Best Retail Bank in South Africa
              </p>
            </div>
          </div>

          <div className="bg-zinc-100 rounded-lg p-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-[#00C853] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-zinc-900 mb-1">
                Customer Obsessed Enterprise Award
              </h3>
              <p className="text-sm text-zinc-600">
                2024 Forrester Award winner
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="border-t border-zinc-200 bg-white">
        <div className="flex items-center justify-around px-2 py-3">
          <button className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 border-2 border-zinc-400 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 border border-zinc-400 rounded-sm"></div>
            </div>
            <span className="text-xs text-zinc-600">Latest</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Lock className="w-5 h-5 text-[#00C853]" strokeWidth={2} />
            <span className="text-xs text-[#00C853] font-medium">Login</span>
            <div className="w-8 h-0.5 bg-[#00C853]"></div>
          </button>
          <button className="flex flex-col items-center gap-1">
            <QrCode className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Scan QR</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Wallet className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Balance</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <FileText className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Applications</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

