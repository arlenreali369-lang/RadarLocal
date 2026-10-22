import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AdBanner } from '../../types';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Store,
  MessageCircle,
  ExternalLink,
  Tag,
  ArrowRight
} from 'lucide-react';

interface CustomerAdBannersCarouselProps {
  onSelectStore: (storeId: string) => void;
  onOpenDealsTab: () => void;
}

export const CustomerAdBannersCarousel: React.FC<CustomerAdBannersCarouselProps> = ({
  onSelectStore,
  onOpenDealsTab
}) => {
  const { adBanners, recordBannerClick, recordBannerView } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeBanners = adBanners.filter(b => b.active);

  // Auto rotate banners every 5 seconds unless paused by mouse hover
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeBanners.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [activeBanners.length, isPaused]);

  // Record view on current banner
  useEffect(() => {
    if (activeBanners[currentIndex]) {
      recordBannerView(activeBanners[currentIndex].id);
    }
  }, [currentIndex, activeBanners]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const handleAction = (banner: AdBanner) => {
    recordBannerClick(banner.id);

    if (banner.callToActionKind === 'whatsapp' && banner.whatsappNumber) {
      const cleanNum = banner.whatsappNumber.replace(/\D/g, '');
      const msg = encodeURIComponent(`Olá! Vi o anúncio de vocês no Radar Local (${banner.title}) e gostaria de mais informações.`);
      window.open(`https://wa.me/${cleanNum}?text=${msg}`, '_blank');
    } else if (banner.callToActionKind === 'view_deals') {
      onOpenDealsTab();
    } else {
      onSelectStore(banner.merchantId);
    }
  };

  return (
    <div
      className="space-y-2 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Espaço Publicitário & Destaques de João Neiva</span>
              <span className="hidden sm:inline-block text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Artes Criadas pela Equipe Radar
              </span>
            </h2>
          </div>
        </div>

        {activeBanners.length > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentIndex(prev => (prev - 1 + activeBanners.length) % activeBanners.length)}
              className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-all shadow-2xs"
              title="Banner anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold text-slate-400 min-w-[36px] text-center">
              {currentIndex + 1} / {activeBanners.length}
            </span>
            <button
              onClick={() => setCurrentIndex(prev => (prev + 1) % activeBanners.length)}
              className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-all shadow-2xs"
              title="Próximo banner"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white shadow-md border border-slate-800 transition-all">
        {/* Background Image with Ambient Glow */}
        <div className="absolute inset-0">
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                {currentBanner.badgeLabel}
              </span>

              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Store className="w-3 h-3" />
                {currentBanner.merchantName}
              </span>

              {currentBanner.discountHighlight && (
                <span className="text-[11px] font-extrabold text-amber-300 bg-amber-950/60 border border-amber-400/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {currentBanner.discountHighlight}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
              {currentBanner.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
              {currentBanner.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleAction(currentBanner)}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              {currentBanner.callToActionKind === 'whatsapp' ? (
                <>
                  <MessageCircle className="w-4 h-4 fill-emerald-700 text-emerald-700" />
                  <span>{currentBanner.actionText || 'Chamar no WhatsApp'}</span>
                </>
              ) : (
                <>
                  <span>{currentBanner.actionText || 'Ver na Loja'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Carousel Progress Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {activeBanners.map((banner, idx) => (
              <button
                key={banner.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                title={`Banner ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
