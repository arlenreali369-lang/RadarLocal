import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PushToast } from './components/common/PushToast';
import { OfflineBanner } from './components/common/OfflineBanner';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { MerchantManualModal } from './components/common/MerchantManualModal';
import { CartDrawer } from './components/customer/CartDrawer';
import { CustomerHome } from './components/customer/CustomerHome';
import { StoreView } from './components/customer/StoreView';
import { FlashDealsPage } from './components/customer/FlashDealsPage';
import { OrdersTracker } from './components/customer/OrdersTracker';
import { LoyaltyClub } from './components/customer/LoyaltyClub';
import { LocalChat } from './components/customer/LocalChat';
import { CustomerRegistrationModal } from './components/customer/CustomerRegistrationModal';
import { RegistrationSuccessModal } from './components/customer/RegistrationSuccessModal';

// Merchant Components
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { OrdersKanban } from './components/merchant/OrdersKanban';
import { PromotionsManager } from './components/merchant/PromotionsManager';
import { LogisticsManager } from './components/merchant/LogisticsManager';
import { MerchantAnalytics } from './components/merchant/MerchantAnalytics';
import { MerchantChat } from './components/merchant/MerchantChat';
import { MerchantOnboardingModal } from './components/merchant/MerchantOnboardingModal';
import { MerchantShowroomLanding } from './components/merchant/MerchantShowroomLanding';
import { MerchantLeadsManager } from './components/merchant/MerchantLeadsManager';

import {
  LayoutDashboard,
  ClipboardList,
  Tag,
  Bike,
  TrendingUp,
  MessageCircle,
  Store,
  User,
  ShoppingBag,
  Sparkles,
  BookOpen,
  Users
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    userRole,
    setUserRole,
    viewingStoreId,
    setViewingStoreId,
    activeMerchant,
    merchantLeads,
    openMerchantShowroom
  } = useApp();

  const [customerTab, setCustomerTab] = useState<string>('home');
  const [merchantTab, setMerchantTab] = useState<string>('overview');
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-20 w-full max-w-full overflow-x-hidden">
      {/* Offline Status & Local Cache Banner */}
      <OfflineBanner />

      {/* Global Interactive Push Toast */}
      <PushToast />

      {/* Notification Center Drawer */}
      <NotificationDrawer />

      {/* Merchant Development & Partner Cities Manual Modal */}
      <MerchantManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />

      {/* Merchant Registration & Onboarding Modal */}
      <MerchantOnboardingModal />

      {/* Dedicated Merchant Showroom & Phase 1 Registration Landing */}
      <MerchantShowroomLanding />

      {/* Customer Registration & Instant Push Onboarding Modal */}
      <CustomerRegistrationModal />

      {/* Customer Instant Notifications Celebration Modal */}
      <RegistrationSuccessModal />

      {/* Cart Drawer */}
      <CartDrawer onOpenOrders={() => setCustomerTab('orders')} />

      {/* Main Header */}
      <Header
        onOpenLoyalty={() => {
          setViewingStoreId(null);
          setCustomerTab('loyalty');
        }}
        onOpenOrders={() => {
          setViewingStoreId(null);
          setCustomerTab('orders');
        }}
        onOpenManual={() => setIsManualOpen(true)}
      />

      {/* Merchant Top Sub-navigation when in merchant role */}
      {userRole === 'merchant' && (
        <div className="bg-slate-900 border-b border-slate-800 text-white sticky top-16 z-30 px-3 sm:px-6 py-2.5 w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Polo João Neiva: {activeMerchant.name}
              </span>

              <button
                onClick={() => setIsManualOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold transition-all"
                title="Abrir Manual de Desenvolvimento do Lojista"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Manual do Lojista</span>
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setMerchantTab('overview')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  merchantTab === 'overview' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Visão Geral</span>
              </button>

              <button
                onClick={() => setMerchantTab('kanban')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  merchantTab === 'kanban' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Pedidos ao Vivo</span>
              </button>

              <button
                onClick={() => setMerchantTab('promos')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  merchantTab === 'promos' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Promoções & Push</span>
              </button>

              <button
                onClick={() => setMerchantTab('logistics')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  merchantTab === 'logistics' ? 'bg-cyan-500 text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Logística de Bairro</span>
              </button>

              <button
                onClick={() => setMerchantTab('analytics')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  merchantTab === 'analytics' ? 'bg-purple-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Métricas</span>
              </button>

              <button
                onClick={() => setMerchantTab('leads')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  merchantTab === 'leads' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Cadastros Fase 1</span>
                {merchantLeads.filter(l => l.status === 'pending_contact').length > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                    {merchantLeads.filter(l => l.status === 'pending_contact').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMerchantTab('chat')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
                  merchantTab === 'chat' ? 'bg-blue-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Clientes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {userRole === 'customer' ? (
          viewingStoreId ? (
            <StoreView
              storeId={viewingStoreId}
              onBack={() => setViewingStoreId(null)}
            />
          ) : customerTab === 'home' ? (
            <CustomerHome
              onSelectStore={(id) => setViewingStoreId(id)}
              onOpenLoyalty={() => setCustomerTab('loyalty')}
              onOpenDealsTab={() => setCustomerTab('deals')}
            />
          ) : customerTab === 'deals' ? (
            <FlashDealsPage
              onSelectStore={(id) => setViewingStoreId(id)}
            />
          ) : customerTab === 'loyalty' ? (
            <LoyaltyClub />
          ) : customerTab === 'orders' ? (
            <OrdersTracker />
          ) : customerTab === 'chat' ? (
            <LocalChat />
          ) : null
        ) : (
          /* Merchant Role */
          merchantTab === 'overview' ? (
            <MerchantDashboard onNavigateTab={setMerchantTab} onOpenManual={() => setIsManualOpen(true)} />
          ) : merchantTab === 'kanban' ? (
            <OrdersKanban />
          ) : merchantTab === 'promos' ? (
            <PromotionsManager />
          ) : merchantTab === 'logistics' ? (
            <LogisticsManager />
          ) : merchantTab === 'analytics' ? (
            <MerchantAnalytics />
          ) : merchantTab === 'leads' ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
              <MerchantLeadsManager />
            </div>
          ) : merchantTab === 'chat' ? (
            <MerchantChat />
          ) : null
        )}
      </main>

      {/* Role-Aware Mobile Bottom Navigation */}
      <BottomNav
        currentTab={userRole === 'customer' ? customerTab : merchantTab}
        setCurrentTab={(tab) => {
          setViewingStoreId(null);
          if (userRole === 'customer') {
            setCustomerTab(tab);
          } else {
            setMerchantTab(tab);
          }
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
