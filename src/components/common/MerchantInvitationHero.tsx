import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Rocket,
  Store,
  Wrench,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  User,
  Zap,
  HelpCircle,
  Building2,
  Mail,
  FlaskConical
} from 'lucide-react';
import { ADMIN_EMAIL_RECIPIENT } from '../../utils/merchantNotification';

export const MerchantInvitationHero: React.FC = () => {
  const {
    city,
    registerMerchantLead,
    adminWhatsAppFormatted,
    openMerchantShowroom,
    setUserRole,
    registerMerchant
  } = useApp();

  // Form states
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [businessType, setBusinessType] = useState<'comercio' | 'servico'>('comercio');
  const [category, setCategory] = useState('Comércio em Geral');
  const [neighborhood, setNeighborhood] = useState('Centro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastRegisteredPhone, setLastRegisteredPhone] = useState('');
  const [lastRegisteredName, setLastRegisteredName] = useState('');
  const [lastRegisteredStore, setLastRegisteredStore] = useState('');
  const [lastRegisteredNeighborhood, setLastRegisteredNeighborhood] = useState('');
  const [lastRegisteredType, setLastRegisteredType] = useState('');
  const [isStoreActivated, setIsStoreActivated] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleApplyPreset = (preset: {
    ownerName: string;
    phone: string;
    storeName: string;
    businessType: 'comercio' | 'servico';
    category: string;
    neighborhood: string;
  }) => {
    setOwnerName(preset.ownerName);
    setPhone(preset.phone);
    setStoreName(preset.storeName);
    setBusinessType(preset.businessType);
    setCategory(preset.category);
    setNeighborhood(preset.neighborhood);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ownerName.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Por favor, informe seu WhatsApp com DDD (ex: (27) 99876-5432).');
      return;
    }

    setIsSubmitting(true);

    const generatedStoreName = storeName.trim() || `${businessType === 'servico' ? 'Serviços' : 'Comércio'} de ${ownerName.trim().split(' ')[0]}`;

    // Register lead into App Context (which auto-dispatches email to arlenreali369@gmail.com)
    registerMerchantLead({
      storeName: generatedStoreName,
      ownerName: ownerName.trim(),
      businessType: businessType === 'servico' ? `Serviços: ${category}` : `Comércio: ${category}`,
      phone: phone.trim(),
      email: '',
      neighborhood: neighborhood || 'Centro',
      address: `${neighborhood || 'Centro'}, ${city.name} - ${city.state}`,
      primaryProducts: businessType === 'servico' ? 'Prestação de serviços locais' : 'Produtos comerciais locais',
      deliveryType: businessType === 'servico' ? 'pickup' : 'radar_network',
      preferredContactTime: 'morning'
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    setLastRegisteredName(ownerName.trim());
    setLastRegisteredPhone(phone.trim());
    setLastRegisteredStore(generatedStoreName);
    setLastRegisteredNeighborhood(neighborhood || 'Centro');
    setLastRegisteredType(businessType === 'servico' ? 'Prestação de Serviços' : 'Comércio Local');
    setIsStoreActivated(false);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset fields
    setOwnerName('');
    setPhone('');
    setStoreName('');
  };

  const handleActivateStoreNow = () => {
    const isService = lastRegisteredType.includes('Serviço');
    registerMerchant(
      {
        name: lastRegisteredStore,
        ownerName: lastRegisteredName,
        phone: lastRegisteredPhone,
        category: isService ? 'Serviços & Manutenção' : 'Mercearias & Mercados',
        neighborhood: lastRegisteredNeighborhood,
        description: `Estabelecimento cadastrado via Teste de Vendedor no Radar Local de ${city.name}.`,
        isOpen: true,
        acceptsPix: true
      },
      [
        {
          name: isService ? 'Serviço Padrão (Visita/Orçamento)' : 'Produto Destaque 01',
          price: isService ? 50.0 : 15.0,
          description: 'Item de demonstração para testar fluxo de pedidos no app.'
        },
        {
          name: isService ? 'Manutenção Completa' : 'Produto Especial 02',
          price: isService ? 120.0 : 28.5,
          description: 'Item secundário para validação do carrinho e acúmulo de pontos.'
        }
      ]
    );

    setIsStoreActivated(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.4 }
      });
    } catch {}
  };

  const openWhatsAppWithAgent = () => {
    const text = encodeURIComponent(
      `Olá Equipe Comercial do Radar Local! Sou *${lastRegisteredName}* de João Neiva.\n` +
      `Acabei de deixar meu contato no aplicativo para participar do *Programa de Alavancagem de Vendas Online*.\n` +
      `Gostaria de receber o contato de um agente comercial para apresentar a plataforma ao meu negócio!`
    );
    window.open(`https://wa.me/5527998991530?text=${text}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-2 border-amber-400/40 shadow-2xl p-5 sm:p-8 animate-in fade-in">
      {/* Background Glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <Rocket className="w-3.5 h-3.5 fill-slate-950" />
            Programa de Alavancagem de Vendas Online
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            Exclusivo Polo {city.name} - {city.state}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px] font-medium border border-white/10 hidden sm:inline-block">
            Incentivo ao Mercado Digital Local
          </span>
        </div>

        {/* Title and App Core Purpose */}
        <div className="space-y-3 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Convidamos Lojistas e Prestadores de Serviços para alavancarem suas vendas na nossa cidade!
          </h1>

          {/* Simple, clear explanation of the app's mission */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 fill-amber-300" />
              <span>Qual é o Objetivo do Radar Local?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              O objetivo do <strong>Radar Local</strong> é simples e direto: <strong>conectar o comércio e os prestadores de serviço locais com os moradores da cidade</strong> em uma plataforma de negociação ágil, segura e sem intermediários abusivos.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Aqui incentivamos o mercado online de <strong>{city.name}</strong>: o morador encontra tudo que precisa no bairro, o comerciante vende todos os dias sem pagar comissões de 30% para aplicativos de capitais, e o dinheiro gira e fortalece a nossa própria cidade!
            </p>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
              <Store className="w-4 h-4" />
              <span>1. Plataforma de Negociação</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Receba pedidos de compra ou agendamento de serviços direto pelo WhatsApp ou painel, com PIX instantâneo.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs">
              <TrendingUp className="w-4 h-4" />
              <span>2. Vitrine & Banners no Topo</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Seu comércio em destaque no topo do app e em notificações Push relâmpago para todos os bairros.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-black text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Adesão por R$ 42/mês</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Valor promocional de lançamento com criação de artes publicitárias inclusa e sem fidelidade.
            </p>
          </div>
        </div>

        {/* RELATIONSHIP & LEAD CAPTURE FORM SECTION */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-indigo-950 p-5 sm:p-6 border-2 border-amber-400/50 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/70 border border-amber-400/30 px-2 py-0.5 rounded-full inline-block mb-1">
                Primeiro Contato • Início do Relacionamento
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                Participe do Programa: Deixe seu Nome e WhatsApp
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                Adesão: R$ 42,00/mês
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">
                ⚡ Notificação: {ADMIN_EMAIL_RECIPIENT}
              </span>
            </div>
          </div>

          {isSubmitted ? (
            /* Rich Test Confirmation & Next Steps Card */
            <div className="py-5 space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-black shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-center space-y-1.5 max-w-xl mx-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Teste de Cadastro Concluído com Sucesso
                </span>
                <h4 className="text-xl font-black text-white">
                  Muito obrigado, {lastRegisteredName}!
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  As informações do estabelecimento foram gravadas no sistema e transmitidas automaticamente.
                </p>
              </div>

              {/* Data Summary Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/15 max-w-lg mx-auto text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Estabelecimento:</span>
                  <strong className="text-white font-black">{lastRegisteredStore}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Responsável:</span>
                  <span className="text-white font-bold">{lastRegisteredName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">WhatsApp:</span>
                  <strong className="text-emerald-400 font-mono font-black">{lastRegisteredPhone}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Bairro:</span>
                  <span className="text-slate-200 font-medium">{lastRegisteredNeighborhood}, {city.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">E-mail Notificado:</span>
                  <span className="text-amber-300 font-mono text-[11px] font-bold">{ADMIN_EMAIL_RECIPIENT}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status do Registro:</span>
                  <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-950/60 border border-amber-400/40 px-2 py-0.5 rounded-full">
                    Aguardando Contato do Agente
                  </span>
                </div>
              </div>

              {/* Notice of Agent WhatsApp Contact */}
              <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 max-w-lg mx-auto space-y-1 text-center">
                <p className="font-bold flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Aviso ao Lojista: Fique atento ao WhatsApp <strong>{lastRegisteredPhone}</strong></span>
                </p>
                <p className="text-[11px] text-emerald-300/90">
                  Um de nossos agentes comerciais entrará em contato para apresentar a plataforma e alinhar sua vitrine!
                </p>
              </div>

              {/* Store activation confirmation notice if clicked */}
              {isStoreActivated && (
                <div className="p-3 bg-amber-400/20 border border-amber-400/50 rounded-xl text-xs text-amber-200 max-w-lg mx-auto text-center font-bold">
                  🎉 Loja ativada e publicada no catálogo de {city.name}! Role a página ou vá para o catálogo para ver os produtos.
                </div>
              )}

              {/* Next Actions for Testing */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 max-w-xl mx-auto">
                <button
                  onClick={() => setUserRole('admin')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>1. Ver Lead na Área do Administrador</span>
                </button>

                <button
                  onClick={openWhatsAppWithAgent}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>2. Testar Contato via WhatsApp</span>
                </button>

                {!isStoreActivated && (
                  <button
                    onClick={handleActivateStoreNow}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Store className="w-4 h-4" />
                    <span>3. Ativar Loja na Vitrine Agora</span>
                  </button>
                )}

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                >
                  Cadastrar Outro Negócio de Teste
                </button>
              </div>
            </div>
          ) : (
            /* Lead Capture Form with Quick-Fill Test Presets */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quick Fill Test Helper Bar */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preencher Dados de Teste em 1 Clique:</span>
                  </span>
                  <span className="text-slate-400 text-[10px]">Polo João Neiva</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyPreset({
                        ownerName: 'Carlos Eduardo Reali',
                        phone: '(27) 99899-1530',
                        storeName: 'Padaria & Confeitaria Central',
                        businessType: 'comercio',
                        category: 'Padarias & Cafés',
                        neighborhood: 'Centro'
                      })
                    }
                    className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 text-[11px] font-bold transition-all flex items-center gap-1"
                  >
                    <span>🥖 Padaria Central</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleApplyPreset({
                        ownerName: 'Marcos Silva',
                        phone: '(27) 99755-1234',
                        storeName: 'Silva Eletricista & Manutenção',
                        businessType: 'servico',
                        category: 'Serviços & Manutenção',
                        neighborhood: 'Triunfo'
                      })
                    }
                    className="px-2.5 py-1 rounded-lg bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold transition-all flex items-center gap-1"
                  >
                    <span>🛠️ Silva Eletricista</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleApplyPreset({
                        ownerName: 'Amanda Rocha',
                        phone: '(27) 99654-7890',
                        storeName: 'Pizzaria & Lanches do Vale',
                        businessType: 'comercio',
                        category: 'Lanches & Pizzas',
                        neighborhood: 'Vila Nova'
                      })
                    }
                    className="px-2.5 py-1 rounded-lg bg-orange-400/20 hover:bg-orange-400/30 text-orange-200 border border-orange-400/30 text-[11px] font-bold transition-all flex items-center gap-1"
                  >
                    <span>🍕 Pizzaria do Vale</span>
                  </button>
                </div>
              </div>
              {/* Type Switcher: Comércio vs Prestador de Serviço */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                  1. O que você oferece em João Neiva? *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBusinessType('comercio');
                      setCategory('Comércio / Loja');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      businessType === 'comercio'
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold'
                    }`}
                  >
                    <Store className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-xs font-black">Comércio / Loja Física</div>
                      <div className={`text-[10px] ${businessType === 'comercio' ? 'text-slate-800' : 'text-slate-400'}`}>
                        Padarias, mercados, lanches, roupas, farmácias...
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBusinessType('servico');
                      setCategory('Prestação de Serviços');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      businessType === 'servico'
                        ? 'bg-emerald-400 text-slate-950 border-emerald-300 font-black shadow-md'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold'
                    }`}
                  >
                    <Wrench className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-xs font-black">Prestador de Serviços</div>
                      <div className={`text-[10px] ${businessType === 'servico' ? 'text-slate-800' : 'text-slate-400'}`}>
                        Eletricista, lava-jato, conserto celular, beleza...
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Nome do Responsável */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Seu Nome Completo (Responsável) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo ou Maria Silva"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-600 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* WhatsApp com DDD */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Número do seu WhatsApp (com DDD) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(27) 99876-5432"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-600 bg-slate-900/90 text-xs text-white font-mono placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-400 outline-none"
                    />
                  </div>
                </div>

                {/* Nome da Loja ou Serviço */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Nome da sua Loja ou Serviço
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Ex: Padaria Central ou Silva Eletricista"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-600 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bairro Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold">Bairro do Comércio/Atendimento:</span>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="bg-slate-900 border border-slate-600 text-xs text-white rounded-lg px-2.5 py-1 outline-none"
                  >
                    {city.neighborhoods.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>Plano de Adesão Promocional:</span>
                  <strong className="text-amber-400 font-black">R$ 42,00/mês</strong>
                </div>
              </div>

              {/* MANDATORY AGENT CONTACT REASSURANCE BOX */}
              <div className="p-3.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-xs text-amber-200 flex items-start gap-2.5">
                <MessageCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 leading-relaxed">
                  <span className="font-black text-amber-300 block uppercase tracking-wide text-[10px]">
                    📢 Como Funciona o Atendimento Comercial:
                  </span>
                  <p className="text-[11px] text-amber-100">
                    Ao deixar seu nome e WhatsApp acima, <strong>um de nossos agentes comerciais entrará em contato com você diretamente pelo seu WhatsApp</strong> para apresentar todos os detalhes do programa de alavancagem de vendas, tirar dúvidas e montar sua vitrine online sem complicações!
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sem compromisso inicial • Notificação enviada para {ADMIN_EMAIL_RECIPIENT}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-400/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Registrando seu Contato...</span>
                    </>
                  ) : (
                    <>
                      <span>Quero Participar do Programa de Vendas</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer shortcuts for merchants and admin */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Já é lojista cadastrado?</span>
            <button
              onClick={() => setUserRole('merchant')}
              className="text-amber-400 hover:underline font-bold"
            >
              Acessar Painel do Lojista →
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openMerchantShowroom}
              className="text-slate-300 hover:text-white underline text-[11px]"
            >
              Ver Showroom do Modelo Original
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setUserRole('admin')}
              className="text-indigo-300 hover:text-indigo-200 font-bold text-[11px] flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
              title="Acessar Área do Administrador"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Área do Administrador</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
