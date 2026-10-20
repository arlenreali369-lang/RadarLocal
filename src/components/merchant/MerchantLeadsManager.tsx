import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MerchantLead } from '../../types';
import {
  Users,
  MessageCircle,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Store,
  Share2,
  Copy,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  Eye,
  Edit3
} from 'lucide-react';

export const MerchantLeadsManager: React.FC = () => {
  const {
    merchantLeads,
    updateLeadStatus,
    city,
    openMerchantShowroom,
    adminWhatsAppFormatted
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<MerchantLead | null>(null);
  const [notesInput, setNotesInput] = useState<string>('');

  const filteredLeads = merchantLeads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch =
      lead.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.businessType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = merchantLeads.filter(l => l.status === 'pending_contact').length;

  const handleCopyPortalLink = () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}?portal=lojista`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {}
  };

  const handleOpenWhatsAppAdmin = (lead: MerchantLead) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

    const text = `Olá ${lead.ownerName}, tudo bem? Sou o Administrador do Radar Local aqui de João Neiva - ES!\n\n` +
      `Recebi com muito entusiasmo o cadastro inicial da sua loja *${lead.storeName}* (${lead.businessType}) no bairro *${lead.neighborhood}*.\n\n` +
      `Estou entrando em contato para darmos início à *Fase 2 do projeto*:\n` +
      `1. Vamos organizar as fotos e preços dos seus primeiros produtos para a vitrine;\n` +
      `2. Configurar suas promoções relâmpago de estreia e pontos de fidelidade;\n` +
      `3. Ativar a entrega no seu bairro e chave Pix para recebimento direto.\n\n` +
      `Qual o melhor momento para conversarmos hoje?`;

    // Update status to contacted
    updateLeadStatus(lead.id, 'phase_2_contacted', 'Contato iniciado pelo WhatsApp do Administrador.');

    // Open WhatsApp
    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
              Polo {city.name} - ES
            </span>
            <span className="text-xs text-emerald-400 font-bold">
              Fase 1 ➔ Fase 2 Onboarding
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Lojistas Cadastrados no Portal (Fase 1)
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Comerciantes que acessaram o link do showroom e preencheram o cadastro inicial. Entre em contato pelo WhatsApp para iniciar a Fase 2 (catálogo e vitrine).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyPortalLink}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
              copiedLink
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-300'
            }`}
            title="Copiar link de acesso para enviar pelo WhatsApp a comerciantes de João Neiva"
          >
            {copiedLink ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link do Portal'}</span>
          </button>

          <button
            onClick={openMerchantShowroom}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 border border-white/15"
            title="Visualizar a página do lojista como ele vê"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Portal do Lojista</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por loja, dono ou bairro..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1 text-xs overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { key: 'all', label: 'Todos', count: merchantLeads.length },
            { key: 'pending_contact', label: 'Aguardando Contato', count: pendingCount, highlight: pendingCount > 0 },
            { key: 'phase_2_contacted', label: 'Fase 2 Iniciada', count: merchantLeads.filter(l => l.status === 'phase_2_contacted').length },
            { key: 'active', label: 'Vitrine Ativa', count: merchantLeads.filter(l => l.status === 'active').length }
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filterStatus === f.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                f.highlight && filterStatus !== f.key ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-black/20 text-current'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Leads Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLeads.map(lead => (
          <div
            key={lead.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            {/* Top row */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {lead.businessType}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Cadastrado {new Date(lead.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {lead.storeName}
                  </h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <Store className="w-3.5 h-3.5 text-slate-400" />
                    <span>Responsável: <strong>{lead.ownerName}</strong></span>
                  </p>
                </div>

                {/* Status Badge */}
                <div>
                  {lead.status === 'pending_contact' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Aguardando WhatsApp</span>
                    </span>
                  )}
                  {lead.status === 'phase_2_contacted' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <MessageCircle className="w-3 h-3 text-emerald-600" />
                      <span>Fase 2 Iniciada</span>
                    </span>
                  )}
                  {lead.status === 'catalog_setup' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 border border-purple-300">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>Montando Catálogo</span>
                    </span>
                  )}
                  {lead.status === 'active' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-cyan-100 text-cyan-800 border border-cyan-300">
                      <CheckCircle className="w-3 h-3 text-cyan-600" />
                      <span>Loja Ativa</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Details & Specs */}
              <div className="bg-slate-50 rounded-2xl p-3 text-xs space-y-1.5 border border-slate-100">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lead.neighborhood}, João Neiva</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {lead.preferredContactTime === 'morning' && 'Prefere manhã'}
                    {lead.preferredContactTime === 'afternoon' && 'Prefere tarde'}
                    {lead.preferredContactTime === 'night' && 'Prefere noite'}
                    {lead.preferredContactTime === 'anytime' && 'Qualquer horário'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp: {lead.phone}</span>
                </div>

                {lead.email && (
                  <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lead.email}</span>
                  </div>
                )}

                {lead.primaryProducts && (
                  <p className="text-[11px] text-slate-600 italic pt-0.5">
                    "{lead.primaryProducts}"
                  </p>
                )}

                {lead.adminNotes && (
                  <div className="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200 mt-1">
                    <strong>Nota do Adm:</strong> {lead.adminNotes}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row Actions */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              {/* WhatsApp direct trigger */}
              <button
                onClick={() => handleOpenWhatsAppAdmin(lead)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chamar no WhatsApp (Fase 2)</span>
              </button>

              {/* Status Switcher Dropdown */}
              <select
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                className="px-2.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 outline-none"
              >
                <option value="pending_contact">Aguardando Contato</option>
                <option value="phase_2_contacted">Fase 2 Iniciada</option>
                <option value="catalog_setup">Montando Catálogo</option>
                <option value="active">Loja 100% Ativa</option>
              </select>
            </div>
          </div>
        ))}

        {filteredLeads.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
            <Store className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">Nenhum lojista encontrado neste filtro</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Compartilhe o link do portal com comerciantes de João Neiva para receber novos cadastros.
            </p>
            <button
              onClick={handleCopyPortalLink}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 inline-flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Link do Portal</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
