import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Bell,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Gift,
  Zap,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const CustomerRegistrationModal: React.FC = () => {
  const {
    isCustomerRegistrationOpen,
    setIsCustomerRegistrationOpen,
    registerCustomer,
    city,
    selectedNeighborhood
  } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [neighborhood, setNeighborhood] = useState(selectedNeighborhood || 'Centro');
  const [enablePush, setEnablePush] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Padarias & Cafés',
    'Lanches & Pizzas',
    'Mercados & Feira',
    'Serviços & Reparos',
    'Lava-Jato & Auto'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCustomerRegistrationOpen) return null;

  const interestOptions = [
    { id: 'Padarias & Cafés', label: 'Padarias & Cafés', icon: '🥖', kind: 'store' },
    { id: 'Lanches & Pizzas', label: 'Lanches & Pizzas', icon: '🍕', kind: 'store' },
    { id: 'Mercados & Feira', label: 'Mercados & Feira', icon: '🍎', kind: 'store' },
    { id: 'Farmácias & Saúde', label: 'Farmácias & Saúde', icon: '💊', kind: 'store' },
    { id: 'Serviços & Reparos', label: 'Elétrica & Manutenção Residencial', icon: '⚡', kind: 'service' },
    { id: 'Lava-Jato & Auto', label: 'Lava-Jato & Estética Automotiva', icon: '🚗', kind: 'service' },
    { id: 'Beleza & Barbearia', label: 'Barbearia & Salão de Beleza', icon: '✂️', kind: 'service' },
    { id: 'Assistência Técnica', label: 'Conserto de Celulares & TI', icon: '📱', kind: 'service' }
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      registerCustomer({
        name: name.trim(),
        phone: phone.trim() || '(27) 99999-0000',
        neighborhood,
        interestedCategories: selectedInterests,
        enablePush
      });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto">
        {/* Header with vibrant green-teal gradient */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 text-white p-5 sm:p-6 overflow-hidden">
          <button
            onClick={() => setIsCustomerRegistrationOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              Notificações Instantâneas
            </span>
            <span className="text-[11px] text-emerald-100 font-semibold">
              Polo {city.name} - {city.state}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            Receba Promoções de Lojas & Prestadores de Serviços da Cidade
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 leading-relaxed">
            Ao se cadastrar, você passa a receber <strong>instantaneamente</strong> alertas de fornadas quentinhas, descontos em supermercados, serviços elétricos, estética automotiva e mais.
          </p>

          {/* Welcome bonus badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-md">
            <Gift className="w-4 h-4 text-purple-900" />
            <span>Ganhe +50 Pontos no Clube Radar na hora do cadastro!</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 sm:space-y-5">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Seu Nome Completo *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Eduardo ou Maria Silva"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp / Celular *</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(27) 99999-0000"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Neighborhood */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Seu Bairro em {city.name} (Para promoções com entrega e atendimento rápido)</span>
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white font-medium text-slate-800"
            >
              {city.neighborhoods.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Categories of Interest */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-emerald-600" />
                <span>Que tipos de promoções você quer receber instantaneamente?</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {selectedInterests.length} selecionados
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {interestOptions.map(opt => {
                const isSelected = selectedInterests.includes(opt.id);
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => toggleInterest(opt.id)}
                    className={`text-left p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{opt.icon}</span>
                      <span className="truncate">{opt.label}</span>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant notification permission toggle */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">
                  Ativar Alertas Push Instantâneos
                </span>
                <input
                  type="checkbox"
                  checked={enablePush}
                  onChange={(e) => setEnablePush(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Receba imediatamente avisos de pão quente, promoções relâmpago e vagas de prestadores de serviços no seu bairro.
              </p>
            </div>
          </div>

          {/* Privacy & Anti-spam Notice */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Zero spam: apenas comércios e prestadores homologados de {city.name}. Seus dados estão 100% seguros.
            </span>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Ativando Notificações Instantâneas...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Cadastrar e Receber Promoções Instantaneamente</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
