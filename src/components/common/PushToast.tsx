import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Bell, Gift, MessageCircle, X, ChevronRight, Store, Wrench } from 'lucide-react';

export const PushToast: React.FC = () => {
  const { activeToast, dismissToast, setUserRole, setIsNotificationsOpen, setViewingStoreId } = useApp();

  if (!activeToast) return null;

  const getIcon = () => {
    if (activeToast.notificationKind === 'service_promo') {
      return <Wrench className="w-5 h-5 text-amber-400" />;
    }
    switch (activeToast.type) {
      case 'flash_deal':
        return <Zap className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />;
      case 'order':
        return <Bell className="w-5 h-5 text-emerald-500 animate-pulse" />;
      case 'reward':
        return <Gift className="w-5 h-5 text-purple-400" />;
      case 'chat':
        return <MessageCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <Bell className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleActionClick = () => {
    if (activeToast.targetRole === 'merchant') {
      setUserRole('merchant');
    }
    if (activeToast.relatedMerchantId) {
      setViewingStoreId(activeToast.relatedMerchantId);
    }
    setIsNotificationsOpen(true);
    dismissToast();
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeToast.whatsappContact) return;
    const cleanPhone = activeToast.whatsappContact.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Olá! Acabei de receber a notificação instantânea "${activeToast.title}" no Radar Local e quero aproveitar!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    dismissToast();
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 flex items-start gap-3.5 ring-1 ring-emerald-500/25">
        {activeToast.avatar ? (
          <img
            src={activeToast.avatar}
            alt=""
            className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
          />
        ) : (
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/50 shrink-0">
            {getIcon()}
          </div>
        )}

        <div className="flex-1 min-w-0" onClick={handleActionClick} role="button" tabIndex={0}>
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {activeToast.notificationKind === 'service_promo' ? '🛠️ Prestador de Serviços' : activeToast.notificationKind === 'store_promo' ? '🥖 Oferta de Loja' : 'Match Push'}
            </span>
            {activeToast.discountBadge && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                {activeToast.discountBadge}
              </span>
            )}
            <span className="text-xs text-slate-400">• {activeToast.timestamp}</span>
          </div>

          <h4 className="text-sm font-bold text-slate-100 truncate">{activeToast.title}</h4>
          <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">{activeToast.message}</p>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center text-xs font-semibold text-emerald-400 hover:text-emerald-300 gap-1 cursor-pointer">
              <span>Ver detalhes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

            {activeToast.whatsappContact && (
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissToast();
          }}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
