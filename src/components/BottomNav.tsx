import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Zap,
  Gift,
  ShoppingBag,
  MessageCircle,
  LayoutDashboard,
  ClipboardList,
  Tag,
  Bike,
  Sparkles
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { userRole, orders, loyaltyProfile, cart } = useApp();

  const activeOrdersCount = orders.filter(
    o => o.status !== 'delivered' && o.status !== 'cancelled'
  ).length;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (userRole === 'admin') return null;

  if (userRole === 'customer') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 md:py-2">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors ${
              currentTab === 'home'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Início</span>
          </button>

          <button
            onClick={() => setCurrentTab('deals')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors relative ${
              currentTab === 'deals'
                ? 'text-amber-600 bg-amber-50/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-5 h-5 mb-0.5 fill-amber-400 text-amber-500" />
            <span className="text-[10px]">Ofertas</span>
            <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
          </button>

          <button
            onClick={() => setCurrentTab('loyalty')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors relative ${
              currentTab === 'loyalty'
                ? 'text-purple-600 bg-purple-50/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Gift className="w-5 h-5 mb-0.5 text-purple-600" />
            <span className="text-[10px]">Clube</span>
            {loyaltyProfile.points > 0 && (
              <span className="text-[8px] absolute top-1 right-1 bg-purple-100 text-purple-700 px-1 rounded-full font-bold">
                {loyaltyProfile.points}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('orders')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors relative ${
              currentTab === 'orders'
                ? 'text-emerald-600 bg-emerald-50/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Pedidos</span>
            {activeOrdersCount > 0 && (
              <span className="absolute top-1 right-2 min-w-4 h-4 px-1 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                {activeOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('chat')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors ${
              currentTab === 'chat'
                ? 'text-blue-600 bg-blue-50/60'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageCircle className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Chat Loja</span>
          </button>
        </div>
      </nav>
    );
  }

  // Merchant Role
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1 md:py-2 text-white">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        <button
          onClick={() => setCurrentTab('overview')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors ${
            currentTab === 'overview'
              ? 'text-amber-400 bg-slate-800'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Painel</span>
        </button>

        <button
          onClick={() => setCurrentTab('kanban')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors relative ${
            currentTab === 'kanban'
              ? 'text-emerald-400 bg-slate-800'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Pedidos</span>
          {activeOrdersCount > 0 && (
            <span className="absolute top-1 right-2 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setCurrentTab('promos')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors ${
            currentTab === 'promos'
              ? 'text-amber-400 bg-slate-800'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Promoções</span>
        </button>

        <button
          onClick={() => setCurrentTab('logistics')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors ${
            currentTab === 'logistics'
              ? 'text-cyan-400 bg-slate-800'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bike className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Entregas</span>
        </button>

        <button
          onClick={() => setCurrentTab('chat')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-semibold transition-colors ${
            currentTab === 'chat'
              ? 'text-blue-400 bg-slate-800'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Clientes</span>
        </button>
      </div>
    </nav>
  );
};
