import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Clock, Flame, Plus, Store, Sparkles } from 'lucide-react';

export const FlashDealsPage: React.FC<{ onSelectStore: (id: string) => void }> = ({ onSelectStore }) => {
  const { promotions, products, addToCart } = useApp();
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const update = () => {
      const times: { [key: string]: string } = {};
      promotions.forEach(promo => {
        const diff = new Date(promo.expiresAt).getTime() - Date.now();
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);
          times[promo.id] = `${hours > 0 ? `${hours}h ` : ''}${mins}m ${secs}s`;
        } else {
          times[promo.id] = 'Encerrada';
        }
      });
      setTimeLeft(times);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [promotions]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-lg space-y-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Zap className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
            Ofertas Relâmpago de Bairro
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Economize no Comércio Local
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Promoções com estoques limitados e descontos negociados diretamente com lojistas da cidade. Notificadas via Match Push!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {promotions.map(promo => {
          const product = products.find(p => p.id === promo.productId);

          return (
            <div
              key={promo.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>{promo.discountPercentage}% OFF</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{timeLeft[promo.id] || 'Terminando'}</span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      {promo.merchantName}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Restam {promo.unitsLeft} un.
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {promo.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <div>
                  <span className="text-base font-black text-slate-900">
                    R$ {promo.promoPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs text-slate-400 line-through ml-2">
                    R$ {promo.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {product ? (
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pedir Agora</span>
                  </button>
                ) : promo.whatsapp ? (
                  <button
                    onClick={() => {
                      const clean = promo.whatsapp!.replace(/\D/g, '');
                      const msg = encodeURIComponent(`Olá! Vi a oferta relâmpago "${promo.title}" no Radar Local e quero agendar!`);
                      window.open(`https://wa.me/${clean}?text=${msg}`, '_blank');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Agendar WhatsApp</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectStore(promo.merchantId)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
                  >
                    Ver Detalhes
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
