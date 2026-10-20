import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MERCHANT_DEVELOPMENT_MANUAL, PARTNER_CITIES } from '../../data/mockData';
import {
  BookOpen,
  Mail,
  CheckCircle,
  MapPin,
  ShieldCheck,
  Send,
  Download,
  Users,
  Sparkles,
  ChevronRight,
  X,
  FileText,
  Building,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MerchantManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantManualModal: React.FC<MerchantManualModalProps> = ({ isOpen, onClose }) => {
  const { sendMatchPush, activeMerchant, city } = useApp();
  const [activeChapterId, setActiveChapterId] = useState<string>('cap-1');
  const [merchantEmail, setMerchantEmail] = useState('arlenreali369@gmail.com');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [viewTab, setViewTab] = useState<'manual' | 'partner_cities'>('manual');

  if (!isOpen) return null;

  const currentChapter = MERCHANT_DEVELOPMENT_MANUAL.find(c => c.id === activeChapterId) || MERCHANT_DEVELOPMENT_MANUAL[0];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantEmail.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      sendMatchPush({
        targetRole: 'merchant',
        type: 'system',
        title: '📘 Manual Radar Local Enviado!',
        message: `O Manual de Desenvolvimento do Comércio Local foi enviado com sucesso para ${merchantEmail}.`,
        priority: 'high'
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                  Polo Pioneiro Homologado
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {city.name} - {city.state} (~{city.population.toLocaleString('pt-BR')} hab)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Manual de Desenvolvimento do Comércio Local
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Cidades credenciadas através de parceiros do aplicativo, onde os lojistas recebem capacitação prática para vender com excelência.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 gap-2 text-xs py-2">
          <button
            onClick={() => setViewTab('manual')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
              viewTab === 'manual'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Capítulos do Manual de João Neiva</span>
          </button>

          <button
            onClick={() => setViewTab('partner_cities')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 ${
              viewTab === 'partner_cities'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Building className="w-4 h-4 text-emerald-400" />
            <span>Rede de Cidades Credenciadas ({PARTNER_CITIES.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {viewTab === 'manual' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Sidebar chapters */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
                  Índice de Capacitação do Lojista
                </span>

                <div className="space-y-1.5">
                  {MERCHANT_DEVELOPMENT_MANUAL.map(chapter => (
                    <button
                      key={chapter.id}
                      onClick={() => setActiveChapterId(chapter.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                        activeChapterId === chapter.id
                          ? 'bg-emerald-50/80 border-emerald-400 text-slate-900 shadow-2xs font-bold'
                          : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="pr-2">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                          Capítulo {chapter.number} • {chapter.estimatedReadTime}
                        </span>
                        <span className="font-extrabold text-xs block mt-0.5 line-clamp-1">
                          {chapter.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${
                        activeChapterId === chapter.id ? 'text-emerald-600' : 'text-slate-300'
                      }`} />
                    </button>
                  ))}
                </div>

                {/* Email Dispatch Card */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold">Receber Manual no E-mail</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Comerciantes de João Neiva - ES recebem a versão completa em PDF com modelos prontos de ofertas.
                  </p>

                  {sentSuccess ? (
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>Enviado com sucesso para {merchantEmail}!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendEmail} className="space-y-2">
                      <input
                        type="email"
                        value={merchantEmail}
                        onChange={(e) => setMerchantEmail(e.target.value)}
                        placeholder="seu-email@comercio.com"
                        className="w-full text-xs p-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-emerald-400 font-medium"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        {isSending ? (
                          <span>Enviando manual...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Enviar Manual para Meu E-mail</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Main Chapter Content */}
              <div className="md:col-span-7 bg-slate-50/70 rounded-3xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Capítulo {currentChapter.number}
                    </span>
                    <span className="text-xs text-slate-400">Leitura de {currentChapter.estimatedReadTime}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {currentChapter.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {currentChapter.subtitle}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {currentChapter.summary}
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-0.5">
                    Benefício Comprovado em Cidades Pequenas:
                  </span>
                  <span className="font-extrabold text-amber-950">
                    ⭐ {currentChapter.keyPerk}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    Checklist Prático do Comerciante de João Neiva:
                  </span>
                  <div className="space-y-1.5">
                    {currentChapter.actionItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                        <div className="p-1 rounded-md bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Partner Cities Network */
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950">
                <span className="font-bold block mb-1">
                  🌐 Modelo de Expansão por Polos Homologados:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  No Radar Local as buscas não são aleatórias nem abertas para qualquer localidade sem estrutura. Cada cidade é ativada exclusivamente através de <strong>parceiros locais homologados</strong> (associações comerciais, lideranças comunitárias e agentes de desenvolvimento regional). Os comerciantes locais são previamente cadastrados e recebem nossos manuais práticos em seus e-mails antes da plataforma entrar em operação com os moradores.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PARTNER_CITIES.map(c => (
                  <div
                    key={c.id}
                    className={`p-4 rounded-3xl border shadow-xs space-y-3 ${
                      c.id === 'cidade-joao-neiva'
                        ? 'bg-white border-2 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200/90'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        c.partnerStatus === 'active_polo'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.partnerStatus === 'active_polo' ? 'Polo Ativo Pioneiro' : 'Em Credenciamento'}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">{c.state}</span>
                    </div>

                    <div>
                      <h4 className="font-black text-base text-slate-900">{c.name} - {c.state}</h4>
                      <p className="text-xs text-slate-500">
                        População: ~{c.population.toLocaleString('pt-BR')} habitantes
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                      <div className="text-[11px] text-slate-600">
                        <strong>Parceiro Responsável:</strong> {c.partnerAgency}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-bold">
                        {c.merchantsTrainedCount} lojistas capacitados com manual
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <strong>Bairros integrados:</strong> {c.neighborhoods.slice(0, 4).join(', ')}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Polo João Neiva - ES • Desenvolvido para cidades com menos de 30 mil habitantes
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Fechar Manual
          </button>
        </div>
      </div>
    </div>
  );
};
