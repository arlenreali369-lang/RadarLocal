import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Gift,
  Award,
  Sparkles,
  Zap,
  CheckCircle,
  Copy,
  Clock,
  ArrowRight,
  TrendingUp,
  Store,
  ChevronRight,
  Flame,
  ShieldCheck,
  Compass,
  ShoppingBag,
  Info,
  Calendar,
  Check,
  QrCode,
  MapPin,
  HelpCircle,
  Star,
  ExternalLink
} from 'lucide-react';

export const LoyaltyClub: React.FC = () => {
  const {
    loyaltyProfile,
    rewards,
    redeemReward,
    spinDailyWheel,
    claimMissionReward,
    useVoucher,
    city
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'rewards' | 'missions' | 'statement' | 'wheel' | 'my_vouchers'>('profile');
  const [selectedRewardCategory, setSelectedRewardCategory] = useState<string>('all');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinResultMessage, setSpinResultMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redemptionSuccessModal, setRedemptionSuccessModal] = useState<{
    code: string;
    title: string;
    store: string;
    howToRedeem: string;
    terms?: string;
  } | null>(null);
  const [viewingTierPerks, setViewingTierPerks] = useState(false);

  // Tier info & Exclusive Perks definitions
  const tiersConfig = {
    vizinho_bronze: {
      key: 'vizinho_bronze',
      title: 'Vizinho Bronze',
      range: '0 a 199 pts',
      minPoints: 0,
      nextThreshold: 200,
      multiplier: '1.0x Ponto',
      cardGradient: 'from-amber-800 via-amber-900 to-slate-900',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      textColor: 'text-amber-500',
      perks: [
        '1 Ponto Radar a cada R$ 1,00 gasto no comércio da cidade',
        'Chat direto com lojistas e entregadores locais',
        'Giro diário na Roleta da Sorte da Cidade',
        'Acesso ao catálogo de recompensas de lojas parceiras'
      ]
    },
    morador_prata: {
      key: 'morador_prata',
      title: 'Morador Prata',
      range: '200 a 599 pts',
      minPoints: 200,
      nextThreshold: 600,
      multiplier: '1.2x Pontos (20% Bônus)',
      cardGradient: 'from-slate-700 via-slate-800 to-zinc-900',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      textColor: 'text-slate-300',
      perks: [
        'Multiplicador de 1.2x em todas as compras locais',
        'Bônus de Frequência Semanal (+50 pts a cada 2 compras na semana)',
        'Selo de Morador Prata exibido para os comerciantes',
        'Descontos diretos aplicáveis na sacola de compras'
      ]
    },
    conterraneo_ouro: {
      key: 'conterraneo_ouro',
      title: 'Conterrâneo Ouro',
      range: '600 a 1199 pts',
      minPoints: 600,
      nextThreshold: 1200,
      multiplier: '1.5x Pontos (50% Bônus)',
      cardGradient: 'from-yellow-600 via-amber-700 to-slate-950',
      badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      textColor: 'text-amber-300',
      perks: [
        'Multiplicador de 1.5x em todas as compras',
        '2 Cupons de Frete Grátis mensais para qualquer bairro',
        'Acesso antecipado a Ofertas Relâmpago 30 minutos antes do público geral',
        'Prioridade no balcão e no despacho com motoboys parceiros'
      ]
    },
    embaixador_vip: {
      key: 'embaixador_vip',
      title: 'Embaixador VIP da Cidade',
      range: '1200+ pts',
      minPoints: 1200,
      nextThreshold: 2000,
      multiplier: '2.0x Pontos (Dobro de Pontos)',
      cardGradient: 'from-emerald-700 via-teal-900 to-slate-950',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      textColor: 'text-emerald-300',
      perks: [
        'Multiplicador máximo de 2.0x em todos os pedidos',
        'Frete 100% Grátis ilimitado em pedidos acima de R$ 35',
        'Acesso a Ofertas Secretas exclusivas das lojas do bairro',
        'Brinde surpresa de aniversário no comércio parceiro favorito',
        'Canal VIP prioritário no Radar Local'
      ]
    }
  };

  const currentTierData = tiersConfig[loyaltyProfile.tier];

  // Calculation for progress bar to next level
  let nextTierTitle = 'Nível Máximo Alcançado';
  let pointsToNext = 0;
  let progressPercent = 100;

  if (loyaltyProfile.tier === 'vizinho_bronze') {
    nextTierTitle = 'Morador Prata (200 pts)';
    pointsToNext = Math.max(0, 200 - loyaltyProfile.lifetimePoints);
    progressPercent = Math.min(100, (loyaltyProfile.lifetimePoints / 200) * 100);
  } else if (loyaltyProfile.tier === 'morador_prata') {
    nextTierTitle = 'Conterrâneo Ouro (600 pts)';
    pointsToNext = Math.max(0, 600 - loyaltyProfile.lifetimePoints);
    progressPercent = Math.min(100, ((loyaltyProfile.lifetimePoints - 200) / 400) * 100);
  } else if (loyaltyProfile.tier === 'conterraneo_ouro') {
    nextTierTitle = 'Embaixador VIP (1200 pts)';
    pointsToNext = Math.max(0, 1200 - loyaltyProfile.lifetimePoints);
    progressPercent = Math.min(100, ((loyaltyProfile.lifetimePoints - 600) / 600) * 100);
  }

  const filteredRewards = rewards.filter(r => {
    if (selectedRewardCategory === 'all') return true;
    return r.category.toLowerCase() === selectedRewardCategory.toLowerCase();
  });

  const handleRedeem = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    const res = redeemReward(rewardId);
    if (res.success && res.code) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setRedemptionSuccessModal({
        code: res.code,
        title: reward.title,
        store: reward.merchantName,
        howToRedeem: reward.howToRedeem === 'qr_or_code_in_counter'
          ? 'Apresente o código no balcão do comércio físico.'
          : reward.howToRedeem === 'in_app_cart_discount'
          ? 'Use este código no campo de cupom ou abata pontos direto na sacola.'
          : 'Frete grátis aplicado automaticamente nas entregas da cidade.',
        terms: reward.terms
      });
    } else {
      alert(res.message);
    }
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResultMessage(null);

    const extraRotations = 1440 + Math.floor(Math.random() * 720);
    const newRotation = wheelRotation + extraRotations;
    setWheelRotation(newRotation);

    setTimeout(() => {
      const outcome = spinDailyWheel();
      setIsSpinning(false);
      setSpinResultMessage(outcome.message);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 3200);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleClaimMission = (missionId: string) => {
    claimMissionReward(missionId);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* DIGITAL MEMBER CARD & PROFILE OVERVIEW */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${currentTierData.cardGradient} text-white p-6 sm:p-8 shadow-2xl border border-white/20 transition-all`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Member Info & Card Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Cartão Fidelidade Radar
              </span>
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${currentTierData.badgeColor}`}>
                {currentTierData.title}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>Mariana Duarte</span>
                <span className="text-xs font-mono font-medium text-slate-300 bg-black/40 px-2 py-0.5 rounded-lg border border-white/10">
                  {loyaltyProfile.memberCode}
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-3">
                <span>Membro desde {loyaltyProfile.memberSince}</span>
                <span>•</span>
                <span>{city.name} - {city.state}</span>
              </p>
            </div>

            {/* Streak & Frequency Highlights */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5 bg-orange-500/20 text-orange-200 border border-orange-500/30 px-3 py-1 rounded-xl font-bold">
                <Flame className="w-4 h-4 fill-orange-400 text-orange-400 animate-pulse" />
                <span>Sequência: {loyaltyProfile.currentStreakWeeks} semanas apoiando o bairro!</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 text-white border border-white/20 px-3 py-1 rounded-xl font-bold">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                <span>{loyaltyProfile.ordersCount} compras locais</span>
              </div>
            </div>
          </div>

          {/* Right: Balance Display Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center min-w-[210px] shadow-lg flex flex-col justify-between">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-300 block">
              Saldo Disponível
            </span>
            <div className="flex items-center justify-center gap-1.5 my-2">
              <Gift className="w-8 h-8 text-amber-400" />
              <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                {loyaltyProfile.points}
              </span>
              <span className="text-xs font-bold text-slate-300 self-end pb-1.5">pts</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-300 block">
                {currentTierData.multiplier}
              </span>
              <button
                onClick={() => setViewingTierPerks(true)}
                className="text-[10px] text-slate-200 hover:text-white underline font-semibold flex items-center justify-center gap-1 mx-auto mt-1"
              >
                <span>Ver todos os benefícios dos níveis</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300">
              Progresso para <strong>{nextTierTitle}</strong>
            </span>
            <span className="font-extrabold text-amber-300">
              {pointsToNext > 0 ? `Faltam ${pointsToNext} pts` : 'Nível Máximo Conquistado!'}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{loyaltyProfile.lifetimePoints} pontos acumulados na história</span>
            <span>R$ {loyaltyProfile.lifetimePoints},00 reinvestidos no comércio local</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Meu Nível & Benefícios</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'rewards'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Prêmios de Lojas Parceiras ({rewards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('missions')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'missions'
              ? 'bg-orange-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-4 h-4 fill-white" />
          <span>Missões & Frequência</span>
        </button>

        <button
          onClick={() => setActiveTab('statement')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'statement'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Extrato de Pontos</span>
        </button>

        <button
          onClick={() => setActiveTab('my_vouchers')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'my_vouchers'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Meus Vouchers ({loyaltyProfile.redeemedRewards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wheel')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'wheel'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Roleta Diária</span>
        </button>
      </div>

      {/* TAB 1: MEU NÍVEL & BENEFÍCIOS */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Current Tier Perks Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Nível Atual
                </span>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>{currentTierData.title}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {currentTierData.multiplier}
                  </span>
                </h3>
              </div>

              <button
                onClick={() => setViewingTierPerks(true)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 w-fit"
              >
                <span>Comparar Todos os Níveis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTierData.perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-800 font-medium leading-relaxed">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How Points Are Earned in Small Cities */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 rounded-3xl border border-emerald-200/80 p-5 sm:p-6 space-y-4">
            <h3 className="font-extrabold text-base text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Como Funciona o Acúmulo de Pontos no Radar Local:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  <span>1. Valor das Compras</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Cada R$ 1,00 gasto equivale a 1 ponto base, multiplicado pelo seu nível (até 2.0x) e bônus de lojas parceiras.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span>2. Frequência & Streak</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Faça 2 ou mais compras na mesma semana no bairro e ganhe <strong>+50 a +80 pontos bônus</strong> de frequência automática!
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>3. Avaliações & Comunidade</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Avalie suas entregas e produtos com estrelas e ganhe <strong>+15 pontos por avaliação</strong>, fortalecendo a reputação local.
                </p>
              </div>
            </div>
          </div>

          {/* Badges / Conquistas Grid */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Selos & Conquistas Desbloqueadas ({loyaltyProfile.badges.filter(b => b.unlocked).length}/{loyaltyProfile.badges.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Reconhecimento pelo seu apoio constante à economia de {city.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {loyaltyProfile.badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                    badge.unlocked
                      ? 'bg-amber-50/50 border-amber-200 text-slate-900 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-xs ${
                    badge.unlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-orange-400 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {badge.icon === 'Flame' ? (
                      <Flame className="w-6 h-6 fill-white" />
                    ) : badge.icon === 'Store' ? (
                      <Store className="w-6 h-6" />
                    ) : badge.icon === 'ShieldCheck' ? (
                      <ShieldCheck className="w-6 h-6" />
                    ) : badge.icon === 'ShoppingBag' ? (
                      <ShoppingBag className="w-6 h-6" />
                    ) : (
                      <Compass className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-xs leading-snug line-clamp-1">{badge.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{badge.description}</p>
                  </div>

                  <span className={`text-[9px] font-bold uppercase mt-2 px-1.5 py-0.5 rounded ${
                    badge.unlocked ? 'bg-amber-200/60 text-amber-900' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {badge.unlocked ? `Desbloqueado` : 'Bloqueado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRÊMIOS DE LOJAS PARCEIRAS */}
      {activeTab === 'rewards' && (
        <div className="space-y-4">
          {/* Explanation on How to Redeem in Partner Stores */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-100">
                  Como Funciona o Resgate em Lojas Parceiras?
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Você pode resgatar prêmios para consumir presencialmente no balcão da loja parceira apresentando o código gerado, ou utilizar seus pontos diretamente na sacola do aplicativo para abater o valor em compras locais.
                </p>
              </div>
            </div>

            <div className="bg-white/10 px-3.5 py-2 rounded-2xl text-center min-w-[140px] border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Seu Saldo</span>
              <span className="text-xl font-black text-amber-400">{loyaltyProfile.points} pts</span>
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {['all', 'Gastronomia', 'Compras', 'Sobremesa', 'Logística'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedRewardCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors ${
                  selectedRewardCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat === 'all' ? 'Todas as Categorias' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRewards.map(reward => {
              const canAfford = loyaltyProfile.points >= reward.pointsCost;

              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3">
                      <img
                        src={reward.imageUrl}
                        alt={reward.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        {reward.category}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-purple-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-md">
                        {reward.pointsCost} pts
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mb-1">
                      <Store className="w-3.5 h-3.5" />
                      <span>{reward.merchantName} • {reward.merchantNeighborhood}</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {reward.description}
                    </p>

                    <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>
                        {reward.howToRedeem === 'qr_or_code_in_counter'
                          ? 'Resgate presencial no balcão da loja com código gerado.'
                          : reward.howToRedeem === 'in_app_cart_discount'
                          ? 'Abate no valor do pedido no app ou no caixa físico.'
                          : 'Isenção total do frete de entrega da cidade.'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Valor equivalente:</span>
                      <span className="text-xs font-bold text-slate-700">
                        R$ {reward.originalValue.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRedeem(reward.id)}
                      disabled={!canAfford}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 active:scale-95'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{canAfford ? 'Resgatar Prêmio' : 'Faltam Pontos'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MISSÕES & FREQUÊNCIA */}
      {activeTab === 'missions' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-md">
            <div className="max-w-xl space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white w-fit">
                Incentivo à Frequência & Recompra
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Missões da Semana no Bairro
              </h3>
              <p className="text-xs text-orange-100 leading-relaxed">
                Complete desafios de frequência e diversidade de compras nas lojas da cidade para desbloquear grandes pacotes de pontos extras.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loyaltyProfile.missions.map(mission => (
              <div
                key={mission.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                      Missão de {mission.category === 'frequency' ? 'Frequência' : mission.category === 'diversity' ? 'Diversidade' : 'Valor Local'}
                    </span>
                    <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      +{mission.rewardPoints} pts
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                    {mission.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {mission.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Progresso:</span>
                      <span>
                        {mission.currentProgress} / {mission.targetProgress} {mission.unit}
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (mission.currentProgress / mission.targetProgress) * 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {mission.completed ? (
                    <button
                      onClick={() => handleClaimMission(mission.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>Resgatar +{mission.rewardPoints} Pontos Agora!</span>
                    </button>
                  ) : (
                    <div className="text-center py-2 text-xs font-semibold text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
                      Em andamento • Continue comprando no bairro
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EXTRATO DE PONTOS */}
      {activeTab === 'statement' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Extrato Detalhado de Pontos
              </h3>
              <p className="text-xs text-slate-500">
                Histórico transparente de pontos acumulados por compras, frequência e resgates
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Saldo Atual</span>
              <span className="text-xl font-black text-amber-500">{loyaltyProfile.points} pts</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {loyaltyProfile.history.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-400">Nenhuma movimentação registrada.</p>
            ) : (
              loyaltyProfile.history.map(item => {
                const isPositive = item.points > 0;

                return (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.type === 'purchase_value' ? (
                          <ShoppingBag className="w-4 h-4" />
                        ) : item.type === 'frequency_streak' ? (
                          <Flame className="w-4 h-4 fill-emerald-600" />
                        ) : item.type === 'spin_wheel' ? (
                          <Sparkles className="w-4 h-4" />
                        ) : item.type === 'review_bonus' ? (
                          <Star className="w-4 h-4" />
                        ) : (
                          <Gift className="w-4 h-4" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900">{item.description}</h4>
                        <p className="text-[11px] text-slate-500">
                          {item.merchantName ? `${item.merchantName} • ` : ''}{item.date}
                        </p>
                      </div>
                    </div>

                    <span className={`text-sm font-black whitespace-nowrap ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {isPositive ? `+${item.points}` : item.points} pts
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 5: MEUS VOUCHERS RESGATADOS */}
      {activeTab === 'my_vouchers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Vouchers Disponíveis para Uso ({loyaltyProfile.redeemedRewards.length})
            </h3>
            <span className="text-xs text-slate-500">
              Apresente no balcão da loja ou aplique na sacola
            </span>
          </div>

          {loyaltyProfile.redeemedRewards.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-xs">
              <Gift className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 text-base">Nenhum voucher resgatado ainda</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Junte pontos fazendo compras locais e troque por prêmios na aba "Prêmios de Lojas Parceiras".
              </p>
            </div>
          ) : (
            loyaltyProfile.redeemedRewards.map(item => (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  item.used ? 'border-slate-200 opacity-60' : 'border-purple-200/90'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.reward.imageUrl}
                    alt={item.reward.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      {item.reward.merchantName}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      {item.reward.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {item.used ? '✅ Utilizado no balcão' : `Válido até ${new Date(item.expiresAt).toLocaleDateString('pt-BR')}`}
                    </p>
                    <p className="text-[11px] text-purple-700 mt-1 font-medium italic">
                      {item.reward.terms || 'Apresente este código no caixa da loja.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end w-full sm:w-auto bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Código de Validação no Caixa
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono font-bold text-sm text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {item.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(item.code)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"
                      title="Copiar código"
                    >
                      {copiedCode === item.code ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {!item.used && (
                    <button
                      onClick={() => useVoucher(item.code)}
                      className="text-[10px] text-emerald-700 font-bold hover:underline mt-2"
                    >
                      Marcar como utilizado
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 6: ROLETA DA SORTE DIÁRIA */}
      {activeTab === 'wheel' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs text-center space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Gire 1x por dia
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              Roleta da Sorte do Comércio Local
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Gire a roleta diariamente para acumular pontos extras e apoiar a economia da cidade!
            </p>
          </div>

          <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
            <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-600 drop-shadow-md" />

            <div
              className="w-full h-full rounded-full border-8 border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-[3000ms] ease-out"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                background: 'conic-gradient(#10b981 0% 16.6%, #f59e0b 16.6% 33.3%, #8b5cf6 33.3% 50%, #06b6d4 50% 66.6%, #ec4899 66.6% 83.3%, #f97316 83.3% 100%)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xs">
                <span className="absolute top-4 font-bold text-sm drop-shadow-md">+50 pts</span>
                <span className="absolute right-4 font-bold text-sm drop-shadow-md">+25 pts</span>
                <span className="absolute bottom-4 font-bold text-sm drop-shadow-md">+100 pts</span>
                <span className="absolute left-4 font-bold text-sm drop-shadow-md">+15 pts</span>
              </div>
            </div>

            <div className="absolute z-10 w-14 h-14 rounded-full bg-white shadow-lg border-4 border-slate-800 flex items-center justify-center font-black text-slate-900 text-xs">
              RADAR
            </div>
          </div>

          {spinResultMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm animate-in zoom-in-95">
              🎉 {spinResultMessage}
            </div>
          )}

          <button
            onClick={handleSpinWheel}
            disabled={isSpinning}
            className={`px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl transition-all ${
              isSpinning
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/20 active:scale-95'
            }`}
          >
            {isSpinning ? 'Girando a Roleta...' : 'Girar Roleta Agora!'}
          </button>
        </div>
      )}

      {/* COMPARISON MODAL: ALL TIERS & EXCLUSIVE PERKS */}
      {viewingTierPerks && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  Níveis de Fidelidade & Benefícios Exclusivos
                </h3>
                <p className="text-xs text-slate-500">
                  Evolua seu status no Radar Local apoiando os pequenos negócios da nossa cidade
                </p>
              </div>
              <button
                onClick={() => setViewingTierPerks(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(tiersConfig).map(t => {
                const isCurrent = loyaltyProfile.tier === t.key;

                return (
                  <div
                    key={t.key}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{t.title}</span>
                        {isCurrent && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                            Seu Nível
                          </span>
                        )}
                      </h4>
                      <span className="text-xs font-bold text-slate-500">{t.range}</span>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 inline-block">
                        {t.multiplier}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {t.perks.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <button
                onClick={() => setViewingTierPerks(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Fechar Comparativo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REDEMPTION SUCCESS MODAL */}
      {redemptionSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 mx-auto flex items-center justify-center mb-3">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Recompensa Resgatada!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Você resgatou <strong>{redemptionSuccessModal.title}</strong> em {redemptionSuccessModal.store}.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 my-4 text-center">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                Seu Código de Validação:
              </span>
              <span className="font-mono text-xl font-black text-purple-700 block mt-1 tracking-wider bg-white py-1.5 px-3 rounded-xl border border-purple-200 w-fit mx-auto">
                {redemptionSuccessModal.code}
              </span>
              <p className="text-xs text-purple-900 font-semibold mt-2">
                {redemptionSuccessModal.howToRedeem}
              </p>
              {redemptionSuccessModal.terms && (
                <p className="text-[11px] text-purple-700/80 mt-1 italic">
                  Obs: {redemptionSuccessModal.terms}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setRedemptionSuccessModal(null);
                setActiveTab('my_vouchers');
              }}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md"
            >
              Ver Meus Vouchers Salvos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
