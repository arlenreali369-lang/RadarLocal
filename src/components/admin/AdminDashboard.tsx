import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MerchantLead, Merchant } from '../../types';
import {
  ShieldCheck,
  Users,
  Store,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Search,
  Filter,
  Eye,
  TrendingUp,
  ExternalLink,
  Edit3,
  Save,
  Send,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Bell,
  RefreshCw,
  Copy,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { ADMIN_EMAIL_RECIPIENT, sendMerchantRegistrationEmail } from '../../utils/merchantNotification';

export const AdminDashboard: React.FC = () => {
  const {
    city,
    merchantLeads,
    updateLeadStatus,
    merchants,
    adBanners,
    marketingPackages,
    marketingAdvisor,
    setUserRole,
    openMerchantShowroom,
    sendMatchPush
  } = useApp();

  // Navigation tab inside Admin Dashboard
  const [adminTab, setAdminTab] = useState<'leads' | 'merchants' | 'program' | 'email'>('leads');

  // Search & Filter state for Leads
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | MerchantLead['status']>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Filtered Leads list
  const filteredLeads = merchantLeads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      lead.storeName.toLowerCase().includes(term) ||
      lead.ownerName.toLowerCase().includes(term) ||
      lead.phone.includes(term) ||
      lead.neighborhood.toLowerCase().includes(term) ||
      lead.businessType.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const pendingLeadsCount = merchantLeads.filter(l => l.status === 'pending_contact').length;
  const contactedLeadsCount = merchantLeads.filter(l => l.status === 'phase_2_contacted').length;
  const closedLeadsCount = merchantLeads.filter(l => l.status === 'active').length;

  // Open WhatsApp with merchant using a structured commercial agent greeting
  const handleOpenCommercialWhatsApp = (lead: MerchantLead) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

    const text = encodeURIComponent(
      `Olá ${lead.ownerName}! Tudo bem? Sou da equipe comercial do *Radar Local* aqui de ${city.name} - ES!\n\n` +
      `Recebemos o seu contato no aplicativo demonstrando interesse no nosso *Programa de Alavancagem de Vendas Online* para o estabelecimento *${lead.storeName}* (${lead.businessType}) no bairro *${lead.neighborhood}*.\n\n` +
      `Estou entrando em contato para apresentar como funciona a nossa plataforma de negociação e os benefícios da adesão promocional (apenas R$ 42,00/mês com criação de artes inclusa e sem comissão por venda).\n\n` +
      `Qual o melhor horário para conversarmos hoje?`
    );

    updateLeadStatus(lead.id, 'phase_2_contacted', 'Agente comercial iniciou contato pelo WhatsApp.');
    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
  };

  const handleCopyPhone = (phoneNum: string) => {
    navigator.clipboard.writeText(phoneNum);
    setCopiedPhone(phoneNum);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleSaveNotes = (leadId: string) => {
    const lead = merchantLeads.find(l => l.id === leadId);
    if (lead) {
      updateLeadStatus(leadId, lead.status, notesDraft);
    }
    setEditingNotesId(null);
  };

  const handleSendTestNotification = async () => {
    setTestEmailStatus('Enviando...');
    const result = await sendMerchantRegistrationEmail({
      ownerName: 'Administrador (Teste)',
      phone: '(27) 99899-1530',
      storeName: 'Radar Local João Neiva - Teste de Disparo',
      neighborhood: 'Centro',
      businessType: 'Teste de Notificação Administrativa',
      email: ADMIN_EMAIL_RECIPIENT,
      planName: 'Adesão Promocional - R$ 42,00/mês'
    });
    setTestEmailStatus(result.message);
    setTimeout(() => setTestEmailStatus(null), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in">
      {/* Admin Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/60">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                Área do Administrador
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Polo {city.name} - {city.state}
              </span>
              <span className="text-xs text-indigo-200 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-700/50 font-mono">
                {ADMIN_EMAIL_RECIPIENT}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Painel Central de Gestão & Lojistas Cadastrados
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Área exclusiva para administradores do <strong>Radar Local</strong>. Acompanhe todos os lojistas e prestadores de serviço que se cadastraram no aplicativo, visualize seus nomes e números de WhatsApp, gerencie o status das negociações comerciais e supervisione os comércios ativos na cidade.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setUserRole('customer')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>Ver App como Cliente</span>
            </button>

            <button
              onClick={() => setUserRole('merchant')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-slate-950" />
              <span>Painel do Lojista</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Lojistas Interessados</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{merchantLeads.length}</div>
          <p className="text-[11px] text-slate-500">
            Inscritos no Programa de Vendas
          </p>
        </div>

        {/* Pending Contacts */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Aguardando Contato</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{pendingLeadsCount}</div>
          <p className="text-[11px] text-slate-500">
            Agentes comerciais precisam chamar
          </p>
        </div>

        {/* Contacted / In Negotiation */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Em Contato / Fase 2</span>
            <MessageCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">{contactedLeadsCount}</div>
          <p className="text-[11px] text-slate-500">
            Montagem de fotos e catálogo
          </p>
        </div>

        {/* Active Stores in App */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Lojas Ativas no App</span>
            <Store className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{merchants.length}</div>
          <p className="text-[11px] text-slate-500">
            Comércios e serviços homologados
          </p>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setAdminTab('leads')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'leads'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Lojistas Interessados (Nome & WhatsApp)</span>
          {pendingLeadsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
              {pendingLeadsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('merchants')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'merchants'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Comércios & Serviços Ativos ({merchants.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('program')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'program'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Programa de Vendas (R$ 42/mês)</span>
        </button>

        <button
          onClick={() => setAdminTab('email')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            adminTab === 'email'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>E-mail da Coordenação ({ADMIN_EMAIL_RECIPIENT})</span>
        </button>
      </div>

      {/* TAB 1: LEADS MANAGEMENT (NOME E WHATSAPP DOS LOJISTAS) */}
      {adminTab === 'leads' && (
        <div className="space-y-4">
          {/* Search & Filter Header */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, WhatsApp, loja ou bairro..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Filtrar:</span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  statusFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({merchantLeads.length})
              </button>

              <button
                onClick={() => setStatusFilter('pending_contact')}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  statusFilter === 'pending_contact'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pendentes ({pendingLeadsCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('phase_2_contacted')}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  statusFilter === 'phase_2_contacted'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Em Contato ({contactedLeadsCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Credenciados ({closedLeadsCount})</span>
              </button>
            </div>
          </div>

          {/* Leads Cards Grid */}
          {filteredLeads.length === 0 ? (
            <div className="p-10 rounded-3xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
              <Users className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-extrabold text-slate-800 text-sm">
                Nenhum lojista encontrado para este filtro
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tente alterar os termos da busca ou limpe os filtros para visualizar a lista completa.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLeads.map(lead => {
                const isPending = lead.status === 'pending_contact';
                const isContacted = lead.status === 'phase_2_contacted';
                const isSetup = lead.status === 'catalog_setup';
                const isActive = lead.status === 'active';

                return (
                  <div
                    key={lead.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Badges & Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {lead.businessType}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <h3 className="font-black text-slate-900 text-lg mt-1 leading-tight">
                            {lead.storeName}
                          </h3>
                        </div>

                        {/* Status badge & selector */}
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as MerchantLead['status'])}
                          className={`text-[11px] font-black rounded-full px-2.5 py-1 border outline-none cursor-pointer ${
                            isPending
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : isContacted
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : isSetup
                              ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                              : isActive
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-slate-100 text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="pending_contact">⏳ Aguardando Contato</option>
                          <option value="phase_2_contacted">💬 Em Contato / Fase 2</option>
                          <option value="catalog_setup">📦 Montagem de Catálogo</option>
                          <option value="active">✅ Credenciado / Ativo</option>
                        </select>
                      </div>

                      {/* Lead Contact Info (Nome & WhatsApp) */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Responsável:</span>
                          <strong className="text-slate-900 font-extrabold">{lead.ownerName}</strong>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">WhatsApp:</span>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-emerald-700 font-mono font-black">{lead.phone}</strong>
                            <button
                              onClick={() => handleCopyPhone(lead.phone)}
                              className="text-[10px] text-slate-400 hover:text-slate-700 px-1 py-0.5 rounded bg-white border border-slate-200"
                              title="Copiar número"
                            >
                              {copiedPhone === lead.phone ? 'Copiado!' : 'Copiar'}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Bairro:</span>
                          <span className="text-slate-800 font-bold flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {lead.neighborhood}
                          </span>
                        </div>

                        {lead.email && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 font-medium">E-mail:</span>
                            <span className="text-slate-700 font-mono text-[11px]">{lead.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Admin Notes Section */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-500">Histórico & Anotações do Agente:</span>
                          {editingNotesId !== lead.id && (
                            <button
                              onClick={() => {
                                setEditingNotesId(lead.id);
                                setNotesDraft(lead.adminNotes || '');
                              }}
                              className="text-indigo-600 hover:underline font-bold flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{lead.adminNotes ? 'Editar Nota' : '+ Adicionar Nota'}</span>
                            </button>
                          )}
                        </div>

                        {editingNotesId === lead.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={notesDraft}
                              onChange={(e) => setNotesDraft(e.target.value)}
                              placeholder="Ex: Liguei hoje às 14h, lojista quer estrear com fotos de pães e cupom de 20%..."
                              className="w-full text-xs p-2 rounded-xl border border-indigo-300 focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="px-2.5 py-1 text-[11px] rounded-lg text-slate-600 hover:bg-slate-100"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={() => handleSaveNotes(lead.id)}
                                className="px-3 py-1 text-[11px] rounded-lg bg-indigo-600 text-white font-bold flex items-center gap-1"
                              >
                                <Save className="w-3 h-3" />
                                <span>Salvar Nota</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-xl border border-slate-100">
                            {lead.adminNotes || 'Nenhuma observação registrada ainda.'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Commercial WhatsApp CTA Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCommercialWhatsApp(lead)}
                        className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 fill-slate-950" />
                        <span>Chamar {lead.ownerName.split(' ')[0]} no WhatsApp</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACTIVE MERCHANTS & SERVICES IN THE CITY */}
      {adminTab === 'merchants' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Comércios e Prestadores de Serviços Ativos em {city.name}
              </h3>
              <p className="text-xs text-slate-500">
                Lojas que já estão visíveis no catálogo e recebem pedidos dos clientes no aplicativo.
              </p>
            </div>

            <button
              onClick={openMerchantShowroom}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Showroom de Lojistas</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchants.map(merchant => (
              <div
                key={merchant.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={merchant.avatar}
                      alt={merchant.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {merchant.category}
                      </span>
                      <h4 className="font-black text-slate-900 text-sm leading-tight mt-0.5">
                        {merchant.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {merchant.neighborhood} • {merchant.phone}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {merchant.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[9px]">Status:</span>
                      <span className={`font-black ${merchant.isOpen ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {merchant.isOpen ? '● Aberto no App' : '○ Fechado'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[9px]">Entrega:</span>
                      <span className="font-bold text-slate-800">{merchant.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {merchant.ownerName ? `Dono: ${merchant.ownerName}` : 'Parceiro Radar'}
                  </span>

                  <button
                    onClick={() => {
                      const clean = merchant.phone.replace(/\D/g, '');
                      window.open(`https://wa.me/55${clean}?text=${encodeURIComponent(`Olá ${merchant.name}! Sou da coordenação do Radar Local de João Neiva.`)}`, '_blank');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROGRAMA DE VENDAS & ADESÃO PROMOCIONAL */}
      {adminTab === 'program' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-50 border border-amber-300 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200 px-2.5 py-0.5 rounded-full">
              Diretriz do Programa Comercial
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Programa de Alavancagem de Vendas Online • João Neiva
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
              O objetivo central é incentivar os comércios de bairro a entrarem no mundo digital com custo ultra acessível (<strong>R$ 42,00/mês</strong>), sem cobrança de comissões abusivas por pedido e com criação de artes publicitárias inclusa para estimular a economia da cidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketingPackages.map(pkg => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900 text-base">{pkg.name}</h4>
                    {pkg.highlightBadge && (
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {pkg.highlightBadge}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    R$ {pkg.priceMonthly.toFixed(2).replace('.', ',')}
                    <span className="text-xs text-slate-500 font-normal"> /mês</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pkg.tagline}
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                    {pkg.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EMAIL NOTIFICATIONS SETTINGS */}
      {adminTab === 'email' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Configuração de Notificação por E-mail
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                As informações dos novos lojistas cadastrados (Nome, WhatsApp, Estabelecimento e Bairro) são encaminhadas automaticamente para a sua caixa de entrada.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 max-w-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold uppercase">E-mail de Destino Oficial:</span>
              <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                {ADMIN_EMAIL_RECIPIENT}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold uppercase">Status do Disparo:</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Ativo & Monitorando Novos Cadastros
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSendTestNotification}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Disparar Notificação de Teste para {ADMIN_EMAIL_RECIPIENT}</span>
            </button>

            {testEmailStatus && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                {testEmailStatus}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
