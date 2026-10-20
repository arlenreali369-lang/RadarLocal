import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Gift,
  Zap,
  CheckCircle2,
  Bell,
  MessageCircle,
  ExternalLink,
  Store,
  ArrowRight,
  ShieldCheck,
  Share2
} from 'lucide-react';

export const RegistrationSuccessModal: React.FC = () => {
  const {
    isRegistrationSuccessModalOpen,
    setIsRegistrationSuccessModalOpen,
    customerProfile,
    lastRegisteredInstantNotifs,
    setIsNotificationsOpen,
    setViewingStoreId,
    loyaltyProfile
  } = useApp();

  if (!isRegistrationSuccessModalOpen || !customerProfile) return null;

  const handleOpenStore = (merchantId?: string) => {
    if (merchantId) {
      setViewingStoreId(merchantId);
    }
    setIsRegistrationSuccessModalOpen(false);
  };

  const handleOpenWhatsApp = (phone?: string, title?: string) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Olá! Me cadastrei no Radar Local e acabei de receber a notificação instantânea da promoção "${title || 'do Radar Local'}". Gostaria de saber mais!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleOpenNotificationsCenter = () => {
    setIsRegistrationSuccessModalOpen(false);
    setIsNotificationsOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto">
        {/* Confetti & Celebration Header */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-6 text-center overflow-hidden">
          <button
            onClick={() => setIsRegistrationSuccessModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl mb-3 shadow-lg">
            🎉
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-purple-900" />
            +50 Pontos de Boas-Vindas Creditados
          </span>

          <h2 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">
            Parabéns, {customerProfile.name.split(' ')[0]}!
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto mt-1 leading-relaxed">
            Seu cadastro foi ativado com sucesso! Como solicitado, você começou a receber <strong>notificações instantâneas</strong> de lojas e prestadores de serviços do bairro <strong>{customerProfile.neighborhood}</strong>.
          </p>
        </div>

        {/* Instant Notifications Feed Preview */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Zap className="w-4 h-4 fill-amber-500" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Suas Primeiras Promoções Instantâneas:
              </h4>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Recebidas agora
            </span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {lastRegisteredInstantNotifs.map(notif => (
              <div
                key={notif.id}
                className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col justify-between gap-2.5 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  {notif.avatar ? (
                    <img
                      src={notif.avatar}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200 shadow-2xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-black text-sm">
                      {notif.notificationKind === 'service_promo' ? '🛠️' : '🏷️'}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.2 rounded-full bg-slate-200 text-slate-800">
                        {notif.notificationKind === 'service_promo' ? '🛠️ Prestador de Serviços' : notif.notificationKind === 'store_promo' ? '🥖 Oferta de Loja' : '🎉 Boas-Vindas'}
                      </span>
                      {notif.discountBadge && (
                        <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                          {notif.discountBadge}
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      {notif.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                      {notif.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/50">
                  {notif.whatsappContact && (
                    <button
                      onClick={() => handleOpenWhatsApp(notif.whatsappContact, notif.title)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Agendar no WhatsApp</span>
                    </button>
                  )}

                  {notif.relatedMerchantId && (
                    <button
                      onClick={() => handleOpenStore(notif.relatedMerchantId)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Ver Oferta / Loja</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleOpenNotificationsCenter}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>Abrir Central de Notificações</span>
            </button>

            <button
              onClick={() => setIsRegistrationSuccessModalOpen(false)}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Explorar Aplicativo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
