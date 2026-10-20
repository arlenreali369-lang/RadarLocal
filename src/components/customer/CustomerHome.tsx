import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Merchant, Promotion } from '../../types';
import { ProductDetailModal } from './ProductDetailModal';
import {
  Search,
  Zap,
  MapPin,
  Clock,
  Star,
  Gift,
  Plus,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Store,
  ChevronRight,
  ShieldCheck,
  Flame,
  Bell,
  Wrench,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

interface CustomerHomeProps {
  onSelectStore: (storeId: string) => void;
  onOpenLoyalty: () => void;
  onOpenDealsTab: () => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onSelectStore,
  onOpenLoyalty,
  onOpenDealsTab
}) => {
  const {
    city,
    selectedNeighborhood,
    merchants,
    products,
    promotions,
    addToCart,
    searchQuery,
    setSearchQuery,
    loyaltyProfile,
    openMerchantOnboarding,
    openMerchantShowroom,
    customerProfile,
    openCustomerRegistration,
    triggerInstantPromoDemo,
    setIsNotificationsOpen,
    unreadNotificationsCount
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Live countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const times: { [key: string]: string } = {};
      promotions.forEach(promo => {
        const diff = new Date(promo.expiresAt).getTime() - Date.now();
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);
          times[promo.id] = `${hours > 0 ? `${hours}h ` : ''}${mins}m ${secs}s`;
        } else {
          times[promo.id] = 'Expirada';
        }
      });
      setTimeLeft(times);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [promotions]);

  const categories = [
    { id: 'all', label: 'Todos', icon: '🏙️' },
    { id: 'stores_only', label: 'Lojas & Comércio', icon: '🏪' },
    { id: 'services_only', label: 'Prestadores de Serviços', icon: '🛠️' },
    { id: 'Padarias & Cafés', label: 'Padarias & Cafés', icon: '🥖' },
    { id: 'Mercearias & Mercados', label: 'Mercados & Feira', icon: '🍎' },
    { id: 'Lanches & Pizzas', label: 'Lanches & Pizzas', icon: '🍕' },
    { id: 'Serviços & Manutenção', label: 'Elétrica & Reformas', icon: '⚡' },
    { id: 'Serviços Automotivos', label: 'Lava-Jato & Auto', icon: '🚗' },
    { id: 'Beleza & Estética', label: 'Barbearia & Salão', icon: '✂️' },
    { id: 'Assistência Técnica', label: 'Celulares & TI', icon: '📱' },
    { id: 'Farmácias & Saúde', label: 'Farmácias', icon: '💊' },
    { id: 'Pet Shop & Agro', label: 'Pet Shop & Rações', icon: '🐾' }
  ];

  // Filtering merchants
  const filteredMerchants = merchants.filter(merchant => {
    let matchesCategory = true;
    if (selectedCategory === 'stores_only') {
      matchesCategory = merchant.businessKind !== 'service_provider';
    } else if (selectedCategory === 'services_only') {
      matchesCategory = merchant.businessKind === 'service_provider';
    } else if (selectedCategory !== 'all') {
      matchesCategory = merchant.category === selectedCategory;
    }
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtering products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.merchantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-xs px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`O que você procura hoje em ${city.name}? (Ex: Pão quente, queijo, pizza, remédio...)`}
            className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Hero Banner: Cidade Pioneira João Neiva - ES */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-5 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-xl space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Polo Homologado: João Neiva - ES
            </span>
            <span className="text-[11px] text-emerald-200 bg-white/10 px-2 py-0.5 rounded-md font-semibold">
              48 Comércios Parceiros com Manual Ativo
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            O comércio de João Neiva na palma da sua mão.
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Buscas não aleatórias: conectamos você aos pequenos negócios locais onde os comerciantes foram homologados e capacitados com nossos manuais para oferecer a melhor experiência e entrega rápida em todos os bairros.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenLoyalty}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Gift className="w-4 h-4 text-purple-900" />
              <span>Ver Prêmios do Clube ({loyaltyProfile.points} pts)</span>
            </button>

            <button
              onClick={onOpenDealsTab}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-md transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Ofertas Relâmpago</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Instant Notifications Onboarding Banner */}
      {!customerProfile ? (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-5 sm:p-6 text-white shadow-lg border border-emerald-400/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 flex items-center justify-center shrink-0 shadow-md">
              <Bell className="w-6 h-6 animate-pulse text-amber-300" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 ring-2 ring-emerald-800" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs">
                  ⚡ Alertas Instantâneos de Lojas e Serviços
                </span>
                <span className="text-xs text-emerald-100 hidden sm:inline">
                  • {city.name} - {city.state}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight text-white">
                Cadastre-se e receba promoções instantaneamente no seu celular!
              </h3>
              <p className="text-xs text-emerald-100/90 font-medium max-w-xl mt-0.5 leading-relaxed">
                Padarias, restaurantes, mercados e prestadores de serviços (eletricistas, lava-jato, barbearias e conserto de celular) avisam em tempo real. Ganhe <strong>+50 pontos no Clube Radar</strong> na hora do cadastro!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
            <button
              onClick={openCustomerRegistration}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-purple-900 fill-purple-900" />
              <span>Cadastrar & Receber Promoções</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-black">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">
                  Olá, {customerProfile.name.split(' ')[0]}!
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Alertas Ativos em {customerProfile.neighborhood}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Você recebe alertas instantâneos de lojas e prestadores de serviços no seu bairro.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto">
            <button
              onClick={triggerInstantPromoDemo}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              title="Testar como a notificação push de uma loja ou serviço chega na tela"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Testar Notificação Agora</span>
            </button>

            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ver Minhas Ofertas ({unreadNotificationsCount})</span>
            </button>
          </div>
        </div>
      )}

      {/* Lojista Onboarding & Dinâmica Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 rounded-3xl p-5 sm:p-6 text-slate-950 shadow-md border border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md font-black">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950/15 text-slate-900 px-2 py-0.5 rounded-full">
                Credenciamento de Lojistas
              </span>
              <span className="text-xs font-bold text-slate-900 hidden sm:inline">
                • Polo João Neiva - ES
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black leading-tight text-slate-950">
              É comerciante, feirante ou produtor da cidade?
            </h3>
            <p className="text-xs text-slate-900/80 font-medium max-w-xl mt-0.5 leading-relaxed">
              Cadastre sua loja em 3 minutos, descubra a dinâmica de vendas com <strong>Match Push</strong> e receba o manual de desenvolvimento do comércio local no seu e-mail.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
          <button
            onClick={openMerchantShowroom}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>Ver Modelo do Layout & Cadastrar</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Categorias no Bairro</h3>
          <span className="text-xs text-slate-500">
            Entrega rápida no {selectedNeighborhood}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border shadow-2xs ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: OFERTAS RELÂMPAGO DO DIA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-100 text-amber-700">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-600" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                Ofertas Relâmpago do Bairro
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Match Push
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Lojas anunciando fornadas e descontos exclusivos com tempo limitado
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDealsTab}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promotions.map(promo => {
            const product = products.find(p => p.id === promo.productId);

            return (
              <div
                key={promo.id}
                className="bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100">
                    <img
                      src={promo.imageUrl}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      <span>{promo.discountPercentage}% OFF</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{timeLeft[promo.id] || 'Terminando'}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {promo.promotionKind === 'service' ? '🛠️ Prestador de Serviços' : '🏪 Loja Física'}
                      </span>
                      {promo.highlightPerk && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {promo.highlightPerk}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      {promo.merchantName}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                      {promo.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {promo.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-base font-black text-slate-900">
                      R$ {promo.promoPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-slate-400 line-through ml-1.5">
                      R$ {promo.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {product ? (
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Aproveitar</span>
                    </button>
                  ) : promo.whatsapp ? (
                    <button
                      onClick={() => {
                        const clean = promo.whatsapp!.replace(/\D/g, '');
                        const msg = encodeURIComponent(`Olá! Vi a promoção "${promo.title}" no Radar Local e quero agendar!`);
                        window.open(`https://wa.me/${clean}?text=${msg}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Agendar WhatsApp</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectStore(promo.merchantId)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
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

      {/* SECTION: COMÉRCIOS LOCAIS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-900 text-base">Comércios Próximos de Você</h3>
            <p className="text-xs text-slate-500">
              Lojas abertas com atendimento direto e entregadores do bairro
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {filteredMerchants.length} lojas encontradas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMerchants.map(merchant => (
            <div
              key={merchant.id}
              onClick={() => onSelectStore(merchant.id)}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                <img
                  src={merchant.banner}
                  alt={merchant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{merchant.rating}</span>
                </div>
                {merchant.loyaltyPartner && (
                  <div className="absolute bottom-3 left-3 bg-purple-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Gift className="w-3 h-3 text-purple-300" />
                    <span>{merchant.loyaltyBonusMultiplier}x Pontos</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={merchant.avatar}
                    alt={merchant.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 bg-white -mt-7 relative z-10 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {merchant.businessKind === 'service_provider' ? (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <Wrench className="w-2.5 h-2.5 text-teal-600" />
                          Prestador de Serviços
                        </span>
                      ) : (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <Store className="w-2.5 h-2.5 text-amber-700" />
                          Loja de Bairro
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                      {merchant.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {merchant.category} • {merchant.neighborhood}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{merchant.deliveryTime}</span>
                  </div>

                  {merchant.whatsapp ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const clean = merchant.whatsapp!.replace(/\D/g, '');
                        const msg = encodeURIComponent(`Olá! Vi o perfil de ${merchant.name} no Radar Local e gostaria de um atendimento/orçamento!`);
                        window.open(`https://wa.me/${clean}?text=${msg}`, '_blank');
                      }}
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 cursor-pointer"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-semibold">
                      Pedido mín. R$ {merchant.minOrder.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Card: Quero Cadastrar Minha Loja */}
          <div
            onClick={openMerchantShowroom}
            className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Store className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-sm">Sua Loja Aqui no Radar</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
              Vende em João Neiva? Cadastre seu estabelecimento em 3 minutos e comece a receber pedidos.
            </p>
            <span className="mt-3.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1 group-hover:bg-emerald-700 transition-colors">
              <span>Cadastrar Loja</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* SECTION: PRODUTOS POPULARES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-900 text-base">Mais Pedidos pelos Vizinhos</h3>
            <p className="text-xs text-slate-500">Produtos frescos e mais bem avaliados na cidade</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.slice(0, 8).map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 text-[9px] font-bold bg-purple-900/80 text-white px-1.5 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-0.5">
                    <Gift className="w-2.5 h-2.5 text-amber-300" />
                    +{product.pointsReward || 10} pts
                  </span>
                </div>

                <span className="text-[10px] text-emerald-700 font-bold block truncate">
                  {product.merchantName}
                </span>
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors mt-0.5">
                  {product.name}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-all"
                  title="Adicionar à sacola"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
