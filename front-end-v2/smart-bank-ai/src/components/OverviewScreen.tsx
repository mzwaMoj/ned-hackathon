'use client';

import { useRouter } from 'next/navigation';
import { Bell, MessageCircle, Target, CreditCard, Plus, Users, MoreHorizontal, ArrowRight, Gift, FileText, Umbrella, Building2, Car, ShoppingCart, Circle, HandCoins } from 'lucide-react';

export default function OverviewScreen() {
  const router = useRouter();

  const accounts = [
    { name: 'Savings AC', balance: 'R76 908 400.99' },
    { name: 'CURRENT', balance: 'R1 109 760.23' },
    { name: 'SAVINGS', balance: 'R1 012 465.13' },
    { name: 'CURRENT', balance: 'R11 000.00' },
  ];

  const PayShapIcon = () => (
    <div className="grid grid-cols-2 gap-1">
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
    </div>
  );

  const widgets = [
    { name: 'Offers for you', icon: Gift, badge: null, customIcon: null },
    { name: 'Applications', icon: FileText, badge: null, customIcon: null },
    { name: 'Insure', icon: Umbrella, badge: '6', customIcon: null },
    { name: 'Nedbank Connect', icon: Building2, badge: 'NEW', customIcon: null },
    { name: 'Discs and fines', icon: Car, badge: null, customIcon: null },
    { name: 'Shop', icon: ShoppingCart, badge: null, customIcon: null },
    { name: 'PayShap', icon: Circle, badge: 'NEW', customIcon: PayShapIcon },
    { name: 'Quick Pay', icon: HandCoins, badge: null, customIcon: null },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#00C853] text-white">
        <div className="flex justify-between items-center px-6 pt-2 pb-1 text-sm">
          <span>8:54</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-1 h-1.5 bg-white rounded-sm"></div>
              <div className="w-1 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-2.5 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="w-4 h-3 border border-white rounded-sm ml-1">
              <div className="w-2 h-1.5 bg-white rounded-sm m-0.5"></div>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm ml-2">
              <div className="w-full h-full bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        <header className="flex items-center justify-between px-6 py-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-lg font-semibold">John Doe's business account</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" strokeWidth={1.5} />
            <button onClick={() => router.push('/chat')}>
              <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        <div className="px-6 pb-6">
          <div className="text-4xl font-bold mb-6">R17 769 084.85</div>

          <div className="space-y-3 mb-6">
            {accounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/15 transition-colors"
              >
                <div>
                  <div className="text-sm font-medium mb-1">{account.name}</div>
                  <div className="text-lg font-semibold">{account.balance}</div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">Free savings feature MyPocket</div>
            </div>
            <button className="bg-yellow-400 text-zinc-900 px-4 py-2 rounded-lg text-sm font-semibold">
              Set up now
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white px-6 py-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-4">My widgets</h2>
        <div className="grid grid-cols-4 gap-4">
          {widgets.map((widget, index) => {
            const IconComponent = widget.icon;
            const CustomIcon = widget.customIcon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
                    {CustomIcon ? <CustomIcon /> : <IconComponent className="w-6 h-6 text-zinc-700" strokeWidth={1.5} />}
                  </div>
                  {widget.badge && (
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      widget.badge === 'NEW' ? 'bg-[#00C853] text-white' : 'bg-green-500 text-white'
                    }`}>
                      {widget.badge}
                    </div>
                  )}
                </div>
                <span className="text-xs text-center text-zinc-700 font-medium leading-tight">
                  {widget.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <nav className="border-t border-zinc-200 bg-white">
        <div className="flex items-center justify-around px-2 py-3">
          <button className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-[#00C853]" strokeWidth={2} />
            </div>
            <span className="text-xs text-[#00C853] font-medium">Overview</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <CreditCard className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Cards</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Plus className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Transact</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Users className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">Recipients</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <MoreHorizontal className="w-5 h-5 text-zinc-600" strokeWidth={2} />
            <span className="text-xs text-zinc-600">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

