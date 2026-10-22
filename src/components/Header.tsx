import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Radio,
  MapPin,
  ShoppingBag,
  Bell,
  Store,
  User,
  Gift,
  ChevronDown,
  WifiOff,
  Sparkles,
  MessageCircle,
  Zap,
  ShieldCheck,
  FlaskConical
} from 'lucide-react';

interface HeaderProps {
  onOpenLoyalty: () => void;
  onOpenOrders: () => void;
  onOpenManual: () => void;
  onOpenTestAssistant?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLoyalty,
  onOpenOrders,
  onOpenManual,
  onOpenTestAssistant
}) => {
  const {
    userRole,
    setUserRole,
    city,
    selectedNeighborhood,
    setSelectedNeighborhood,
    cart,
    setIsCartOpen,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    loyaltyProfile,
    isOffline,
    toggleOfflineMode,
    setIsChatOpen,
    activeMerchant,
    openMerchantOnboarding,
    openMerchantShowroom,
    customerProfile,
    openCustomerRegistration
  } = useApp();

  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand & City */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setUserRole('customer')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
              <Radio className="w-5 h-5" />
              <span className="absolute w-full h-full rounded-xl bg-emerald-400 opacity-30 animate-radar-ring" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none">
                  Radar<span className="text-emerald-600">Local</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  ES
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-medium">
                Polo Pioneiro: João Neiva - ES
              </p>
            </div>
          </div>

          {/* City / Partner Info Pill */}
          <button
            onClick={onOpenManual}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200/60"
            title="Manual de Desenvolvimento do Comércio Local"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Polo João Neiva</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
              Manual Ativo
            </span>
          </button>

          {/* Neighborhood Selector */}
          <div className="relative">
            <button
              onClick={() => setIsNeighborhoodOpen(!isNeighborhoodOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[105px] sm:max-w-[140px]">{selectedNeighborhood}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {isNeighborhoodOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span>{city.name} - {city.state}</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black">
                    Polo Ativo
                  </span>
                </div>
                <div className="space-y-0.5 max-h-56 overflow-y-auto">
                  {city.neighborhoods.map(bairro => (
                    <button
                      key={bairro}
                      onClick={() => {
                        setSelectedNeighborhood(bairro);
                        setIsNeighborhoodOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center justify-between font-medium transition-colors ${
                        selectedNeighborhood === bairro
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{bairro}</span>
                      {selectedNeighborhood === bairro && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="pt-2 mt-1 border-t border-slate-100 px-1">
                  <button
                    onClick={() => {
                      setIsNeighborhoodOpen(false);
                      onOpenManual();
                    }}
                    className="w-full text-center text-[10px] text-emerald-700 hover:underline font-bold"
                  >
                    Ver Cidades Credenciadas por Parceiros →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Offline quick badge */}
          <button
            onClick={toggleOfflineMode}
            title={isOffline ? 'Modo Offline Ativo' : 'Modo Online (Clique para testar offline)'}
            className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors ${
              isOffline
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline font-bold">Offline</span>
              </>
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
            )}
          </button>

          {/* Customer Instant Push Registration Status / CTA */}
          {userRole === 'customer' && (
            customerProfile ? (
              <button
                onClick={openCustomerRegistration}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-950 hover:bg-emerald-100 transition-all text-xs font-bold shadow-2xs"
                title="Meu cadastro e alertas instantâneos de João Neiva"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="truncate max-w-[90px]">{customerProfile.name.split(' ')[0]}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-black">
                  {customerProfile.neighborhood}
                </span>
              </button>
            ) : (
              <button
                onClick={openCustomerRegistration}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
                title="Cadastre-se para receber promoções instantâneas de lojas e prestadores de serviços"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-bounce" />
                <span className="hidden sm:inline">Receber Promoções</span>
                <span className="sm:hidden">Alertas</span>
              </button>
            )
          )}

          {/* Gamified Loyalty Points button (Customer mode) */}
          {userRole === 'customer' && (
            <button
              onClick={onOpenLoyalty}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/80 text-purple-900 hover:border-purple-300 transition-all text-xs font-bold shadow-xs hover:shadow-sm"
              title="Meu Perfil & Clube Radar de Fidelidade"
            >
              <div className="flex items-center gap-1">
                <span className="text-orange-500 font-extrabold text-[11px] hidden sm:flex items-center gap-0.5">
                  🔥 {loyaltyProfile.currentStreakWeeks}w
                </span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <Gift className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-purple-700 font-black">{loyaltyProfile.points} pts</span>
              </div>
            </button>
          )}

          {/* Chat direct access */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Chat com o Lojista"
          >
            <MessageCircle className="w-5 h-5 text-slate-700" />
          </button>

          {/* Match Push Bell */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Notificações Push"
          >
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Cart Icon (Customer mode) */}
          {userRole === 'customer' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              title="Carrinho de Compras"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-[11px] font-bold text-white flex items-center justify-center shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>
          )}

          {/* Button: Portal do Lojista (Modelo Original & Cadastro Fase 1) */}
          <button
            onClick={openMerchantShowroom}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-xs hover:shadow-md transition-all active:scale-95"
            title="Acessar o Showroom com layout das fotos, promoções e cadastro de lojista"
          >
            <Store className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden xs:inline">Portal do Lojista</span>
            <span className="xs:hidden">Lojista</span>
          </button>

          {/* Button: Teste de Cadastro de Vendedor */}
          {onOpenTestAssistant && (
            <button
              onClick={onOpenTestAssistant}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-200/90 font-extrabold text-xs shadow-2xs transition-all active:scale-95"
              title="Abrir Simulador e Teste do Cadastro de Vendedor"
            >
              <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
              <span>Testar Vendedor</span>
            </button>
          )}

          {/* ROLE SWITCHER PILL */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setUserRole('customer')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                userRole === 'customer'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Cliente</span>
            </button>
            <button
              onClick={() => setUserRole('merchant')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                userRole === 'merchant'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Lojista</span>
              {userRole === 'merchant' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                userRole === 'admin'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Área do Administrador"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden md:inline">Admin</span>
              {userRole === 'admin' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
