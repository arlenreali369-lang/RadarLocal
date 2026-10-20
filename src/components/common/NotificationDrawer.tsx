import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Bell,
  Zap,
  Gift,
  MessageCircle,
  CheckCheck,
  Store,
  Wrench,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    userRole,
    setUserRole,
    setViewingStoreId,
    triggerInstantPromoDemo,
    openCustomerRegistration,
    customerProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'store' | 'service' | 'order' | 'reward'>('all');

  if (!isNotificationsOpen) return null;

  const relevantNotifications = notifications.filter(
    n => n.targetRole === 'both' || n.targetRole === userRole
  );

  const filtered = relevantNotifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'store') return n.notificationKind === 'store_promo' || (n.type === 'flash_deal' && n.notificationKind !== 'service_promo');
    if (activeTab === 'service') return n.notificationKind === 'service_promo';
    if (activeTab === 'order') return n.type === 'order';
    if (activeTab === 'reward') return n.type === 'reward' || n.notificationKind === 'welcome';
    return true;
  });

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);

    if (notif.targetRole === 'merchant' && userRole !== 'merchant') {
      setUserRole('merchant');
    }
    if (notif.relatedMerchantId) {
      setViewingStoreId(notif.relatedMerchantId);
    }
    setIsNotificationsOpen(false);
  };

  const handleWhatsApp = (phone?: string, title?: string) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Olá! Vi a notificação da promoção "${title || 'no Radar Local'}" e gostaria de agendar/pedir!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <Bell className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Central Match Push</h3>
                <p className="text-xs text-slate-500">Alertas instantâneos da cidade</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={markAllNotificationsAsRead}
                title="Marcar todas como lidas"
                className="p-2 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Demo Trigger & Status Banner */}
          <div className="px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-emerald-900 block truncate">
                {customerProfile
                  ? `🔔 Alertas ativos para ${customerProfile.name.split(' ')[0]} (${customerProfile.neighborhood})`
                  : '🔔 Receba alertas instantâneos de João Neiva'}
              </span>
              <span className="text-[10px] text-emerald-700">
                Promoções de lojas e prestadores de serviços
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {!customerProfile && (
                <button
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    openCustomerRegistration();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow-2xs"
                >
                  Cadastrar
                </button>
              )}
              <button
                onClick={triggerInstantPromoDemo}
                className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[10px] flex items-center gap-1 shadow-2xs transition-colors"
                title="Disparar uma nova notificação instantânea para testar"
              >
                <Zap className="w-3 h-3 fill-slate-950" />
                <span>Testar Push</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-slate-100 bg-white px-3 gap-1 overflow-x-auto text-xs py-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Todas ({relevantNotifications.length})
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'store'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              Lojas
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'service'
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              Serviços
            </button>
            <button
              onClick={() => setActiveTab('order')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'order'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              Pedidos
            </button>
            <button
              onClick={() => setActiveTab('reward')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'reward'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Recompensas
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-700 text-sm">Nenhuma notificação no momento</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Você receberá novidades de ofertas de lojas, prestadores de serviços e pedidos aqui.
                </p>
                <button
                  onClick={triggerInstantPromoDemo}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simular Notificação Instantânea</span>
                </button>
              </div>
            ) : (
              filtered.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-md relative ${
                    notif.read
                      ? 'bg-white border-slate-200/80 text-slate-600'
                      : 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                  }`}
                >
                  {!notif.read && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-200" />
                  )}

                  <div className="flex items-start gap-3">
                    {notif.avatar ? (
                      <img
                        src={notif.avatar}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="p-2 rounded-xl bg-white shadow-2xs border border-slate-100 shrink-0">
                        {notif.notificationKind === 'service_promo' ? (
                          <Wrench className="w-4 h-4 text-teal-600" />
                        ) : notif.type === 'flash_deal' ? (
                          <Zap className="w-4 h-4 text-amber-500" />
                        ) : notif.type === 'order' ? (
                          <Bell className="w-4 h-4 text-emerald-600" />
                        ) : notif.type === 'reward' ? (
                          <Gift className="w-4 h-4 text-purple-600" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className="text-[10px] uppercase font-black text-slate-500 bg-slate-200/60 px-1.5 py-0.2 rounded">
                          {notif.notificationKind === 'service_promo'
                            ? '🛠️ Prestador de Serviços'
                            : notif.notificationKind === 'store_promo'
                            ? '🥖 Oferta de Loja'
                            : notif.type.replace('_', ' ')}
                        </span>
                        {notif.discountBadge && (
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                            {notif.discountBadge}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">• {notif.timestamp}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>

                      {/* Action buttons inside item */}
                      <div className="mt-2.5 flex items-center gap-2">
                        {notif.whatsappContact && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWhatsApp(notif.whatsappContact, notif.title);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </button>
                        )}

                        {notif.relatedMerchantId && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotificationClick(notif);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center gap-1"
                          >
                            <Store className="w-3 h-3" />
                            <span>Ver Detalhes</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
            <p className="text-xs text-slate-500 leading-relaxed">
              O sistema <strong>Match Push</strong> notifica moradores instantaneamente sobre promoções ativas de lojas e prestadores de serviços de João Neiva.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
