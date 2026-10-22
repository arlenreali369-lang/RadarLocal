import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ClipboardList,
  Tag,
  Bike,
  TrendingUp,
  AlertCircle,
  Clock,
  Sparkles,
  ShoppingBag,
  Store,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Star,
  BookOpen,
  PlusCircle,
  CheckCircle,
  ChevronDown,
  Users,
  MessageCircle,
  Share2,
  Megaphone,
  Palette
} from 'lucide-react';

interface MerchantDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenManual?: () => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ onNavigateTab, onOpenManual }) => {
  const {
    activeMerchant,
    activeMerchantId,
    setActiveMerchantId,
    merchants,
    orders,
    promotions,
    couriers,
    sendMatchPush,
    openMerchantOnboarding,
    merchantLeads,
    openMerchantShowroom,
    marketingAdvisor,
    merchantSubscriptions,
    marketingPackages,
    adBanners,
    artRequests
  } = useApp();

  const currentPkgId = merchantSubscriptions[activeMerchant.id] || 'pkg-adesao';
  const currentPkg = marketingPackages.find(p => p.id === currentPkgId) || marketingPackages[0];
  const activeStoreBanners = adBanners.filter(b => b.merchantId === activeMerchant.id && b.active);
  const storeArtRequests = artRequests.filter(r => r.merchantId === activeMerchant.id);

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const inTransitCount = orders.filter(o => o.status === 'out_for_delivery').length;

  const todayRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Merchant Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={activeMerchant.avatar}
              alt={activeMerchant.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 bg-white shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Polo João Neiva - ES
                </span>
                <span className="text-xs text-slate-400">
                  {activeMerchant.neighborhood}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {activeMerchant.name}
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-2">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {activeMerchant.rating}
                </span>
                <span>•</span>
                <span>{activeMerchant.phone}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">● Aberto no Radar</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Store Switcher if multiple stores */}
            {merchants.length > 1 && (
              <div className="relative">
                <select
                  value={activeMerchantId}
                  onChange={(e) => setActiveMerchantId(e.target.value)}
                  className="px-3 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 appearance-none pr-8 cursor-pointer"
                  title="Alternar loja ativa"
                >
                  {merchants.map(m => (
                    <option key={m.id} value={m.id} className="text-slate-900 bg-white">
                      {m.name} ({m.neighborhood})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white/70 absolute right-2.5 top-3.5 pointer-events-none" />
              </div>
            )}

            <button
              onClick={openMerchantOnboarding}
              className="px-3.5 py-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-extrabold text-xs transition-all border border-emerald-400/30 flex items-center gap-1.5"
              title="Credenciar outro comércio em João Neiva"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>+ Cadastrar Outra Loja</span>
            </button>

            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs transition-all border border-white/20 flex items-center gap-1.5"
                title="Manual de Desenvolvimento enviado no e-mail"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Manual do Lojista</span>
              </button>
            )}

            <button
              onClick={() => onNavigateTab('promos')}
              className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Tag className="w-4 h-4" />
              <span>Anunciar Oferta Relâmpago</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Registration Celebration Banner */}
      {activeMerchant.isNewRegistration && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-3xl p-5 flex items-start justify-between gap-4 shadow-xs animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-black">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Loja Credenciada com Sucesso no Radar
              </span>
              <h4 className="font-black text-slate-900 text-base mt-1">
                Parabéns, {activeMerchant.ownerName || activeMerchant.name}! Sua loja já está na vitrine de João Neiva.
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                O <strong>Manual de Desenvolvimento do Comércio Local</strong> foi enviado para o e-mail cadastrado ({activeMerchant.email || 'lojista'}). Use a aba <strong>Promoções & Push</strong> para disparar seu primeiro alerta relâmpago!
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('promos')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Criar 1ª Promoção</span>
          </button>
        </div>
      )}

      {/* Marketing Digital & Equipe Publicitária Radar Local (Diferencial) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-indigo-800/40 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-md shadow-amber-400/20">
            <Sparkles className="w-6 h-6 fill-slate-950" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Diferencial Radar Local
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                ● Plano {currentPkg.name} Ativo
              </span>
              <span className="text-xs text-indigo-200">
                • {activeStoreBanners.length} banners no app
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              Sua Loja com Equipe de Marketing Digital & Assessoria no WhatsApp
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Nossa equipe cria suas imagens promocionais de alto padrão, posiciona seus banners no topo do app e orienta horários de pico pelo WhatsApp da assessora <strong>{marketingAdvisor.name}</strong>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateTab('marketing')}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Palette className="w-4 h-4 text-slate-950" />
            <span>Gerenciar Marketing & Banners</span>
          </button>

          <button
            onClick={() => {
              const cleanNumber = marketingAdvisor.whatsappNumber.replace(/\D/g, '');
              const msg = encodeURIComponent(
                `Olá ${marketingAdvisor.name}! Sou da loja ${activeMerchant.name} em João Neiva e gostaria de solicitar uma nova imagem publicitária.`
              );
              window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
            }}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            title="Chamar assessora no WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chamar no WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Merchant Leads (Fase 1) Admin Pipeline Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 rounded-3xl p-5 border border-amber-300/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-md shadow-amber-400/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Gestão de Lojistas da Cidade
              </span>
              <span className="text-xs font-bold text-amber-900">
                {merchantLeads.filter(l => l.status === 'pending_contact').length} aguardando contato no WhatsApp
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-950 leading-tight">
              Cadastros Iniciais de Comerciantes em João Neiva (Fase 1)
            </h3>
            <p className="text-xs text-slate-700 mt-0.5 max-w-xl">
              Lojistas que acessaram o link do showroom e enviaram seus dados de contato. Chame no WhatsApp para iniciar a Fase 2 (montagem de catálogo).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('leads')}
            className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Gerenciar Cadastros ({merchantLeads.length})</span>
          </button>

          <button
            onClick={openMerchantShowroom}
            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 transition-all flex items-center gap-1.5"
            title="Abrir o Portal do Lojista como o comerciante vê"
          >
            <Store className="w-3.5 h-3.5 text-amber-500" />
            <span>Ver Portal</span>
          </button>
        </div>
      </div>

      {/* Action Pipeline Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Card */}
        <div
          onClick={() => onNavigateTab('kanban')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-xs hover:shadow-md ${
            pendingCount > 0
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-600">Pedidos Pendentes</span>
            <span className={`w-3 h-3 rounded-full ${pendingCount > 0 ? 'bg-amber-500 animate-ping' : 'bg-slate-300'}`} />
          </div>
          <div className="text-3xl font-black text-slate-900">{pendingCount}</div>
          <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
            <span>Aguardando confirmação</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </p>
        </div>

        {/* In Preparation */}
        <div
          onClick={() => onNavigateTab('kanban')}
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:shadow-md transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-600">Na Cozinha / Balcão</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{preparingCount}</div>
          <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
            <span>Em preparo ou embalagem</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </p>
        </div>

        {/* Motoboys on Route */}
        <div
          onClick={() => onNavigateTab('logistics')}
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:shadow-md transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-600">Entregadores na Rua</span>
            <Bike className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{inTransitCount}</div>
          <p className="text-xs text-slate-500 mt-1 flex items-center justify-between">
            <span>{couriers.filter(c => c.status === 'available').length} motoboys disponíveis</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </p>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateTab('kanban')}
          className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer space-y-3"
        >
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 w-fit">
            <ClipboardList className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            Quadro Kanban de Pedidos
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Acompanhe cada pedido em tempo real, imprima comandas para a cozinha e despache para o motoboy do bairro.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('promos')}
          className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-amber-500 hover:shadow-md transition-all cursor-pointer space-y-3"
        >
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-800 w-fit">
            <Tag className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            Espaço de Promoções & Push
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Crie ofertas relâmpago com contagem regressiva e dispare Match Push direto no celular dos moradores da cidade.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('logistics')}
          className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer space-y-3"
        >
          <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-800 w-fit">
            <Bike className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            Logística de Bairro & Rotas
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Controle taxas por setor da cidade, agrupe entregas na mesma viagem e gerencie motoboys locais.
          </p>
        </div>
      </div>
    </div>
  );
};
