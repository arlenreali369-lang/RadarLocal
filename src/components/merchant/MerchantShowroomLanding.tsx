import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MerchantLead } from '../../types';
import confetti from 'canvas-confetti';
import {
  Store,
  Sparkles,
  Zap,
  ShoppingBag,
  Tag,
  Gift,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Bike,
  ShieldCheck,
  Share2,
  Copy,
  ExternalLink,
  MessageCircle,
  Eye,
  Info,
  ChevronRight,
  BookOpen,
  X,
  Smartphone,
  Star,
  Flame,
  Award
} from 'lucide-react';

interface MockupTemplate {
  category: string;
  storeName: string;
  tagline: string;
  avatar: string;
  banner: string;
  productImage: string;
  productName: string;
  productPrice: number;
  promoTitle: string;
  promoDiscount: string;
  promoOldPrice: number;
  promoNewPrice: number;
  pointsEarned: number;
  dealCountdown: string;
}

const PREVIEW_TEMPLATES: Record<string, MockupTemplate> = {
  'Padarias & Cafés': {
    category: 'Padarias & Cafés',
    storeName: 'Panificadora & Confeitaria Estrela',
    tagline: 'Fornadas quentinhas saindo a cada 30 min no Centro',
    avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
    productImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80',
    productName: 'Bolo Caseiro de Cenoura com Brigadeiro de Panela',
    productPrice: 24.00,
    promoTitle: 'Combo Café Colonial + Pão Francês Quentinho',
    promoDiscount: '30% OFF',
    promoOldPrice: 24.00,
    promoNewPrice: 16.90,
    pointsEarned: 25,
    dealCountdown: '01h 45m'
  },
  'Lanches & Pizzas': {
    category: 'Lanches & Pizzas',
    storeName: 'Pizzaria & Hamburgueria Neivense',
    tagline: 'Massas artesanais e burgers grelhados na brasa',
    avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    productImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    productName: 'Burger Artesanal Duplo com Cheddar Cremoso & Bacon',
    productPrice: 28.50,
    promoTitle: 'Pizza Grande Especial + Refri 1.5L',
    promoDiscount: '25% OFF',
    promoOldPrice: 56.00,
    promoNewPrice: 42.00,
    pointsEarned: 42,
    dealCountdown: '02h 10m'
  },
  'Mercearias & Mercados': {
    category: 'Mercearias & Mercados',
    storeName: 'Mercearia & Hortifruti da Vila',
    tagline: 'Produtos frescos dos sítios da região e mantimentos',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=80',
    productImage: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&auto=format&fit=crop&q=80',
    productName: 'Cesta Hortifruti Selecionada (Frutas & Legumes)',
    productPrice: 32.00,
    promoTitle: 'Queijo Minas Artesanal da Roça (Peça 500g)',
    promoDiscount: '20% OFF',
    promoOldPrice: 26.00,
    promoNewPrice: 20.80,
    pointsEarned: 21,
    dealCountdown: '03h 00m'
  },
  'Farmácias & Saúde': {
    category: 'Farmácias & Saúde',
    storeName: 'Farmácia & Drogaria Saúde Neiva',
    tagline: 'Medicamentos, perfumaria e atendimento acolhedor',
    avatar: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop&q=80',
    productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
    productName: 'Kit Vitamina C + Zinco Fortalecimento Imune',
    productPrice: 22.90,
    promoTitle: 'Combo Higiene Familiar & Cuidados Diários',
    promoDiscount: '35% OFF',
    promoOldPrice: 38.00,
    promoNewPrice: 24.70,
    pointsEarned: 25,
    dealCountdown: '04h 30m'
  },
  'Moda, Calçados & Vestuário': {
    category: 'Moda, Calçados & Vestuário',
    tagline: 'Tendências da estação, confecções e calçados',
    storeName: 'Boutique & Vestuário Ponto Chique',
    avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
    productImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80',
    productName: 'Vestido Casual Estampado Moda Primavera/Verão',
    productPrice: 79.90,
    promoTitle: 'Calça Jeans Premium Modeladora',
    promoDiscount: '25% OFF',
    promoOldPrice: 120.00,
    promoNewPrice: 89.90,
    pointsEarned: 90,
    dealCountdown: '05h 00m'
  },
  'Açougues & Carnes': {
    category: 'Açougues & Carnes',
    storeName: 'Casa de Carnes & Açougue Boi Nobre',
    tagline: 'Cortes nobres inspecionados e temperos artesanais',
    avatar: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    productImage: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&auto=format&fit=crop&q=80',
    productName: 'Picanha Bovina Selecionada para Churrasco (1kg)',
    productPrice: 69.90,
    promoTitle: 'Kit Churrasco Família (Picanha + Linguiça 2kg)',
    promoDiscount: '22% OFF',
    promoOldPrice: 110.00,
    promoNewPrice: 85.80,
    pointsEarned: 86,
    dealCountdown: '02h 40m'
  }
};

export const MerchantShowroomLanding: React.FC = () => {
  const {
    isMerchantShowroomOpen,
    setIsMerchantShowroomOpen,
    city,
    registerMerchantLead,
    adminWhatsAppNumber,
    adminWhatsAppFormatted
  } = useApp();

  // Active category in mockup
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('Padarias & Cafés');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(1);
  const [mockupTab, setMockupTab] = useState<'store' | 'promos' | 'checkout'>('store');
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  // Form State for Phase 1 Registration
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [businessType, setBusinessType] = useState('Padarias & Cafés');
  const [phone, setPhone] = useState('(27) 9');
  const [email, setEmail] = useState('');
  const [neighborhood, setNeighborhood] = useState(city.neighborhoods[0] || 'Centro');
  const [address, setAddress] = useState('');
  const [primaryProducts, setPrimaryProducts] = useState('');
  const [deliveryType, setDeliveryType] = useState<'own_courier' | 'radar_network' | 'pickup' | 'all'>('radar_network');
  const [preferredContactTime, setPreferredContactTime] = useState<'morning' | 'afternoon' | 'night' | 'anytime'>('anytime');

  // Submission Status
  const [registeredLead, setRegisteredLead] = useState<MerchantLead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isMerchantShowroomOpen) return null;

  const currentTemplate = PREVIEW_TEMPLATES[activeCategoryKey] || PREVIEW_TEMPLATES['Padarias & Cafés'];

  const handleCopyLink = () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}?portal=lojista`;
      navigator.clipboard.writeText(url);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {
      alert('Link do portal: ' + window.location.href);
    }
  };

  const handlePhoneChange = (val: string) => {
    // Basic formatting for BR WhatsApp: (27) 9XXXX-XXXX
    let digits = val.replace(/\D/g, '');
    if (digits.length > 11) digits = digits.slice(0, 11);

    if (digits.length <= 2) {
      setPhone(`(${digits}`);
    } else if (digits.length <= 7) {
      setPhone(`(${digits.slice(0, 2)}) ${digits.slice(2)}`);
    } else {
      setPhone(`(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`);
    }
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeName.trim()) {
      alert('Por favor, informe o nome do seu estabelecimento.');
      return;
    }
    if (!ownerName.trim()) {
      alert('Por favor, informe o nome do responsável.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      alert('Por favor, informe um WhatsApp válido com DDD (ex: (27) 99876-5432).');
      return;
    }

    setIsSubmitting(true);

    const lead = registerMerchantLead({
      storeName: storeName.trim(),
      ownerName: ownerName.trim(),
      businessType,
      phone: phone.trim(),
      email: email.trim(),
      neighborhood,
      address: address.trim() || `${neighborhood}, João Neiva - ES`,
      primaryProducts: primaryProducts.trim() || 'Produtos do ramo cadastrado',
      deliveryType,
      preferredContactTime
    });

    setRegisteredLead(lead);
    setIsSubmitting(false);

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {}

    // Scroll to success card smoothly
    setTimeout(() => {
      const el = document.getElementById('success-lead-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // WhatsApp Admin URL generation
  const buildAdminWhatsAppUrl = () => {
    if (!registeredLead) {
      return `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(
        `Olá Administrador do Radar Local! Tenho interesse em credenciar meu comércio em João Neiva - ES. Como iniciamos?`
      )}`;
    }

    const message = `Olá Administrador do Radar Local João Neiva!\n\n` +
      `Sou *${registeredLead.ownerName}*, da loja *${registeredLead.storeName}* (Ramo: *${registeredLead.businessType}*), localizada no bairro *${registeredLead.neighborhood}* em João Neiva - ES.\n\n` +
      `Acabei de preencher o *Cadastro Inicial (Fase 1)* no portal de lojistas e gostaria de dar início à *Fase 2 do projeto* para cadastrar meus produtos, definir fotos e ativar minha vitrine!\n\n` +
      `📱 Meu WhatsApp: ${registeredLead.phone}\n` +
      `✉️ E-mail: ${registeredLead.email || 'Não informado'}\n` +
      `📦 Entrega: ${registeredLead.deliveryType === 'radar_network' ? 'Quero a rede de motoboys do app' : 'Própria / Retirada'}`;

    return `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col overflow-y-auto animate-in fade-in">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/95 border-b border-slate-800 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white">Radar Local</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Polo {city.name} - {city.state}
              </span>
            </div>
            <p className="text-xs text-slate-400">Portal do Lojista: Showroom do Layout & Credenciamento Inicial (Fase 1)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Link Button */}
          <button
            onClick={handleCopyLink}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              copyFeedback
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
            title="Copiar link de acesso para enviar pelo WhatsApp aos lojistas"
          >
            {copyFeedback ? <CheckCircle className="w-3.5 h-3.5 text-white" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copyFeedback ? 'Link Copiado!' : 'Copiar Link para Enviar'}</span>
          </button>

          {/* Close / Return to app */}
          <button
            onClick={() => setIsMerchantShowroomOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            title="Fechar showroom e voltar ao aplicativo"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-6 sm:py-8 space-y-8 flex-1">

        {/* HERO / WELCOME HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 text-white p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Exclusivo para Comerciantes e Empreendedores de João Neiva - ES</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Veja exatamente como o seu comércio aparecerá para os moradores de João Neiva
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              O <strong className="text-white font-bold">Radar Local</strong> foi criado para que você não precise pagar taxas abusivas de aplicativos de capitais. Aqui você acompanha o <strong className="text-amber-300">modelo visual original</strong> de exibição das imagens dos seus produtos, destaque das promoções relâmpago e pontos de fidelidade.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-black shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Visualização Real</h4>
                  <p className="text-[11px] text-slate-400">Entenda o posicionamento de fotos, ofertas e vitrine.</p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-black shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Cadastro Inicial (Fase 1)</h4>
                  <p className="text-[11px] text-slate-400">Preencha seus dados de contato e tipo de negócio.</p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-black shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Contato no WhatsApp (Fase 2)</h4>
                  <p className="text-[11px] text-slate-400">O Adm recebe os dados e inicia a montagem do seu catálogo.</p>
                </div>
              </div>
            </div>

            {/* Quick jump to form */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#formulario-cadastro"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-400/25 transition-all transform active:scale-95"
              >
                <span>Ir Direto para o Cadastro Inicial</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/15"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>{copyFeedback ? 'Link Copiado!' : 'Copiar Link desta Página'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE SHOWROOM & MODELO VISUAL */}
        <section className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                  Showroom Interativo do Layout
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Como as Imagens dos Produtos e Promoções são Posicionadas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Navegue pelo modelo interativo abaixo. Clique nos marcadores numerados [1], [2], [3] e [4] para compreender a dinâmica exata.
              </p>
            </div>

            {/* Category Filter Pills for the Mockup */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              <span className="text-xs font-bold text-slate-500 shrink-0 mr-1">Ramo:</span>
              {Object.keys(PREVIEW_TEMPLATES).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryKey(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategoryKey === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Layout Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left: Interactive Explainers & Hotspots List */}
            <div className="lg:col-span-5 space-y-3.5 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Pontos Chave do Layout Original</span>
                </h3>

                {/* Hotspot 1: Product Images */}
                <div
                  onClick={() => setActiveHotspot(1)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    activeHotspot === 1
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
                      1
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-900 flex items-center justify-between">
                        <span>Posicionamento das Imagens dos Produtos</span>
                        {activeHotspot === 1 && <span className="text-[10px] text-amber-700 font-extrabold uppercase">Selecionado</span>}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        As fotos aparecem no topo de cada card em formato quadrado ou 4:3, com alta definição e carregamento instantâneo. Ao lado, o preço em destaque e os pontos gerados.
                      </p>
                      <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                        💡 Na Fase 2 auxiliamos com as fotos do seu cardápio ou prateleira
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotspot 2: Flash Deals & Promotions */}
                <div
                  onClick={() => setActiveHotspot(2)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    activeHotspot === 2
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-orange-500 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
                      2
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-900 flex items-center justify-between">
                        <span>Destaque das Promoções & Radar Relâmpago ⚡</span>
                        {activeHotspot === 2 && <span className="text-[10px] text-orange-700 font-extrabold uppercase">Selecionado</span>}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Ficam em banner superior com contagem regressiva em tempo real e percentual de desconto vibrante. Ativa o gatilho da urgência para produtos frescos do dia.
                      </p>
                      <div className="text-[10px] text-orange-700 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200 inline-block">
                        ⚡ Notifica os moradores do bairro instantaneamente via Match Push
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotspot 3: Loyalty & Gamification */}
                <div
                  onClick={() => setActiveHotspot(3)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    activeHotspot === 3
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
                      3
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-900 flex items-center justify-between">
                        <span>Programa de Fidelidade & Recompra</span>
                        {activeHotspot === 3 && <span className="text-[10px] text-purple-700 font-extrabold uppercase">Selecionado</span>}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Cada compra soma pontos no perfil do morador (Bronze, Prata, Ouro). Clientes fiéis desbloqueiam brindes exclusivos da sua loja, garantindo retorno semanal.
                      </p>
                      <div className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block">
                        🎁 Mais de 82% de clientes voltam toda semana para somar pontos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotspot 4: Fast Neighborhood Delivery & Direct Pix */}
                <div
                  onClick={() => setActiveHotspot(4)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    activeHotspot === 4
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
                      4
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-900 flex items-center justify-between">
                        <span>Pedido no Bairro & Pix Direto sem Taxa</span>
                        {activeHotspot === 4 && <span className="text-[10px] text-emerald-700 font-extrabold uppercase">Selecionado</span>}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        O cliente seleciona o bairro (Centro, Vila Nova, Santo Afonso, Cohab, etc.), o pedido cai no seu painel em tempo real e o pagamento vai direto para o seu Pix.
                      </p>
                      <div className="text-[10px] text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block">
                        🛵 Motoboys locais com rotas agrupadas para economizar combustível
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative Quote */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 rounded-3xl p-4 text-xs text-amber-950 flex items-start gap-3">
                <Store className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block">Como funciona o processo em 2 Fases:</span>
                  <p className="text-slate-700 text-[11px]">
                    <strong>Fase 1 (Agora):</strong> Você conhece o layout e envia seu cadastro básico.<br />
                    <strong>Fase 2 (Em seguida):</strong> O Administrador do app chama você no WhatsApp para receber suas fotos, cadastrar seus produtos reais e ativar sua loja no ar!
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Realistic Phone Mockup showing the Original Layout */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center">
              <div className="w-full max-w-md bg-slate-900 p-3 sm:p-4 rounded-[40px] shadow-2xl border-4 border-slate-700/80 relative">
                {/* Speaker notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-800 mr-2" />
                  <div className="w-8 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Mockup Screen Viewport */}
                <div className="bg-slate-50 rounded-[32px] overflow-hidden text-slate-900 border border-slate-800 flex flex-col min-h-[640px] pt-4 select-none relative">

                  {/* Mock App Header */}
                  <div className="px-3 py-2 bg-white border-b border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-slate-900 text-sm">Radar</span>
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        {city.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>Centro</span>
                    </div>
                  </div>

                  {/* Mockup Tabs inside screen */}
                  <div className="grid grid-cols-3 bg-slate-100 text-[11px] font-bold border-b border-slate-200 text-center">
                    <button
                      onClick={() => setMockupTab('store')}
                      className={`py-2 transition-colors ${mockupTab === 'store' ? 'bg-white text-emerald-800 border-b-2 border-emerald-600' : 'text-slate-500'}`}
                    >
                      Vitrine da Loja
                    </button>
                    <button
                      onClick={() => setMockupTab('promos')}
                      className={`py-2 transition-colors ${mockupTab === 'promos' ? 'bg-white text-orange-700 border-b-2 border-orange-500' : 'text-slate-500'}`}
                    >
                      Radar Relâmpago ⚡
                    </button>
                    <button
                      onClick={() => setMockupTab('checkout')}
                      className={`py-2 transition-colors ${mockupTab === 'checkout' ? 'bg-white text-cyan-800 border-b-2 border-cyan-600' : 'text-slate-500'}`}
                    >
                      Checkout & Pix
                    </button>
                  </div>

                  {/* Mockup Screen Content */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3.5 bg-slate-50 text-xs">

                    {mockupTab === 'store' && (
                      <>
                        {/* Store Hero Banner & Avatar */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-white">
                          <img
                            src={currentTemplate.banner}
                            alt="Banner do Comércio"
                            className="w-full h-24 object-cover"
                          />
                          <div className="p-3 pt-2 flex items-start gap-2.5">
                            <img
                              src={currentTemplate.avatar}
                              alt="Avatar"
                              className="w-12 h-12 rounded-xl object-cover -mt-6 border-2 border-white shadow-md shrink-0 bg-white"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-slate-900 text-xs truncate">{currentTemplate.storeName}</h4>
                              <p className="text-[10px] text-slate-500 truncate">{currentTemplate.tagline}</p>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-600">
                                <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                  <Star className="w-3 h-3 fill-amber-400" /> 4.9
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-0.5 text-emerald-600 font-bold">
                                  <Clock className="w-3 h-3" /> 15-25 min
                                </span>
                                <span>•</span>
                                <span className="text-[9px] px-1 rounded bg-slate-100 font-bold text-slate-700">
                                  Entrega Centro R$ 3,00
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* HOTSPOT 2: Promotion Banner Highlight */}
                        <div className="relative">
                          {/* Hotspot indicator #2 */}
                          <button
                            onClick={() => setActiveHotspot(2)}
                            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-orange-500 text-white font-black text-[10px] flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce"
                            title="Ver explicação do destaque de promoções"
                          >
                            2
                          </button>

                          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white rounded-2xl p-3 shadow-sm">
                            <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                              <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full">
                                <Flame className="w-3 h-3 text-yellow-300" /> Oferta do Bairro
                              </span>
                              <span className="bg-white/20 px-2 py-0.5 rounded-full font-black text-white">
                                {currentTemplate.dealCountdown} restantes
                              </span>
                            </div>
                            <h5 className="font-black text-xs">{currentTemplate.promoTitle}</h5>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-sm font-black text-white">
                                R$ {currentTemplate.promoNewPrice.toFixed(2).replace('.', ',')}
                              </span>
                              <span className="text-[10px] line-through text-white/70">
                                R$ {currentTemplate.promoOldPrice.toFixed(2).replace('.', ',')}
                              </span>
                              <span className="ml-auto bg-black/30 text-yellow-200 text-[10px] font-black px-1.5 py-0.5 rounded">
                                {currentTemplate.promoDiscount}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* HOTSPOT 1: Product Images & Showcase Card */}
                        <div className="relative space-y-1.5">
                          {/* Hotspot indicator #1 */}
                          <button
                            onClick={() => setActiveHotspot(1)}
                            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce"
                            title="Ver explicação do posicionamento da imagem"
                          >
                            1
                          </button>

                          <div className="flex items-center justify-between">
                            <h5 className="font-extrabold text-[11px] text-slate-800">Mais Vendidos da Semana</h5>
                            <span className="text-[10px] text-emerald-700 font-bold">Ver todos (18)</span>
                          </div>

                          <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex gap-3 items-center">
                            {/* Product Image Position */}
                            <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                              <img
                                src={currentTemplate.productImage}
                                alt="Foto do Produto"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-0 inset-x-0 bg-slate-950/75 text-amber-300 text-[8px] font-black py-0.5 text-center">
                                +{currentTemplate.pointsEarned} pts
                              </span>
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h6 className="font-black text-xs text-slate-900 leading-tight">
                                {currentTemplate.productName}
                              </h6>
                              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                                Preparado artesanalmente no bairro com ingredientes selecionados.
                              </p>
                              <div className="flex items-center justify-between mt-1.5">
                                <span className="font-black text-xs text-emerald-700">
                                  R$ {currentTemplate.productPrice.toFixed(2).replace('.', ',')}
                                </span>
                                <button className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black flex items-center gap-1 shadow-xs">
                                  <span>Pedir</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* HOTSPOT 3: Loyalty Banner in screen */}
                        <div className="relative">
                          {/* Hotspot indicator #3 */}
                          <button
                            onClick={() => setActiveHotspot(3)}
                            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-purple-600 text-white font-black text-[10px] flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce"
                            title="Ver explicação do Clube de Fidelidade"
                          >
                            3
                          </button>

                          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-3 rounded-2xl border border-purple-800 shadow-xs flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-black shrink-0">
                              <Award className="w-5 h-5 text-purple-300" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-black bg-purple-400 text-slate-950 px-1.5 py-0.2 rounded uppercase">
                                  Clube Radar
                                </span>
                                <span className="text-[10px] text-purple-200 font-bold">Ganhe 1.5x Pontos</span>
                              </div>
                              <p className="text-[10px] text-purple-200 mt-0.5 truncate">
                                Moradores acumulam pontos e resgatam prêmios na sua loja.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {mockupTab === 'promos' && (
                      <div className="space-y-3 py-1">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-2xl text-slate-950">
                          <div className="flex items-center gap-1.5 font-black text-xs">
                            <Zap className="w-4 h-4 fill-slate-950" />
                            <span>Radar Relâmpago em João Neiva</span>
                          </div>
                          <p className="text-[10px] text-slate-900 mt-0.5">
                            Ofertas do dia ativadas com 1 clique para todos os moradores da cidade.
                          </p>
                        </div>

                        <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-slate-600">Disparo para Moradores:</span>
                            <span className="font-black text-emerald-600">480 clientes conectados</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-slate-600">Taxa de Abertura do Push:</span>
                            <span className="font-black text-slate-900">74.2%</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-slate-600">Duração Recomendada:</span>
                            <span className="font-black text-amber-600">90 a 180 minutos</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-100 rounded-2xl text-[10px] text-slate-600 border border-slate-200">
                          📌 <strong>Dica de Sucesso:</strong> Padarias e lanchonetes de João Neiva usam o Radar Relâmpago às 16h para esgotar fornadas de bolos e pães quentinhos.
                        </div>
                      </div>
                    )}

                    {mockupTab === 'checkout' && (
                      <div className="space-y-3 py-1">
                        {/* HOTSPOT 4: Checkout preview */}
                        <div className="relative bg-white rounded-2xl p-3 border border-slate-200 space-y-2">
                          {/* Hotspot indicator #4 */}
                          <button
                            onClick={() => setActiveHotspot(4)}
                            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce"
                            title="Ver explicação da logística e Pix"
                          >
                            4
                          </button>

                          <h6 className="font-black text-xs text-slate-900">Resumo da Sacola do Morador</h6>

                          <div className="text-[10px] space-y-1 text-slate-600 border-b border-slate-100 pb-2">
                            <div className="flex justify-between">
                              <span>1x {currentTemplate.productName.slice(0, 24)}...</span>
                              <span className="font-bold text-slate-900">R$ {currentTemplate.productPrice.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between text-emerald-600 font-bold">
                              <span>Desconto Clube Radar (-30 pts):</span>
                              <span>- R$ 3,00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxa de Entrega (Centro):</span>
                              <span className="font-bold text-slate-900">R$ 3,00</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-baseline pt-1">
                            <span className="text-xs font-black text-slate-900">Total a Pagar:</span>
                            <span className="text-sm font-black text-emerald-700">
                              R$ {currentTemplate.productPrice.toFixed(2).replace('.', ',')}
                            </span>
                          </div>

                          <div className="pt-2">
                            <div className="w-full py-2 bg-emerald-600 text-white font-black text-center rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Pagar via Pix Direto da Loja</span>
                            </div>
                            <p className="text-[9px] text-center text-slate-400 mt-1">
                              Dinheiro cai direto na sua conta bancária sem intermediários
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Mock Bottom App Bar */}
                  <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around text-slate-400 text-[9px] font-bold">
                    <span className="text-emerald-700 flex flex-col items-center">
                      <Store className="w-4 h-4" />
                      <span>Início</span>
                    </span>
                    <span className="flex flex-col items-center">
                      <Tag className="w-4 h-4" />
                      <span>Ofertas</span>
                    </span>
                    <span className="flex flex-col items-center">
                      <Gift className="w-4 h-4" />
                      <span>Fidelidade</span>
                    </span>
                    <span className="flex flex-col items-center">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Sacola</span>
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: CADASTRO INICIAL DO LOJISTA (FASE 1) */}
        <section id="formulario-cadastro" className="space-y-6 pt-4 scroll-mt-20">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-2">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white inline-block">
                Início da Parceria • Fase 1
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Cadastro do Seu Estabelecimento no Radar Local
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Preencha as informações básicas do seu negócio abaixo. Após o envio, <strong className="text-white underline">o Administrador do app recebe seus dados e entra em contato com você pelo WhatsApp</strong> para dar início à <strong>Fase 2</strong> (montagem do seu catálogo, fotos oficiais e ativação da vitrine).
              </p>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">

            {registeredLead ? (
              /* Success State Card */
              <div id="success-lead-card" className="space-y-6 py-4 animate-in fade-in zoom-in-95">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Fase 1 Concluída com Sucesso!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    🎉 Parabéns, {registeredLead.ownerName}!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Os dados do estabelecimento <strong className="text-slate-900 font-bold">{registeredLead.storeName}</strong> foram registrados na base do <strong className="text-emerald-700 font-bold">Polo João Neiva</strong>.
                  </p>
                </div>

                {/* Transition Explanation Box */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 max-w-2xl mx-auto space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>O que acontece agora para a Fase 2:</span>
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p>
                        <strong>Administrador Notificado:</strong> A coordenação do Radar Local já recebeu seu número de WhatsApp e ramo de atuação.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <p>
                        <strong>Início da Fase 2 pelo WhatsApp:</strong> Você receberá a mensagem para organizar suas primeiras fotos, produtos e horários.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <p>
                        <strong>Vitrine no Ar:</strong> Sua loja é ativada no aplicativo e os moradores de João Neiva recebem a notificação de boas-vindas!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Button: Open WhatsApp with Admin */}
                <div className="max-w-xl mx-auto space-y-3 text-center pt-2">
                  <a
                    href={buildAdminWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-base shadow-xl shadow-emerald-500/25 transition-all transform active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Chamar o Administrador no WhatsApp Agora (Iniciar Fase 2)</span>
                  </a>

                  <p className="text-xs text-slate-500">
                    Atendimento oficial: {adminWhatsAppFormatted} (Equipe de Implantação João Neiva)
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      setRegisteredLead(null);
                      setStoreName('');
                      setOwnerName('');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
                  >
                    Cadastrar Outro Estabelecimento
                  </button>

                  <button
                    onClick={() => setIsMerchantShowroomOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
                  >
                    Concluir e Voltar ao App
                  </button>
                </div>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmitLead} className="space-y-6">

                {/* Section: Type of Business */}
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    1. Qual o Tipo do Seu Negócio? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { key: 'Padarias & Cafés', label: 'Padaria & Confeitaria', icon: '🍞' },
                      { key: 'Lanches & Pizzas', label: 'Lanches, Pizzas & Burgers', icon: '🍕' },
                      { key: 'Mercearias & Mercados', label: 'Mercearia & Hortifruti', icon: '🛒' },
                      { key: 'Farmácias & Saúde', label: 'Farmácia & Drogaria', icon: '💊' },
                      { key: 'Moda, Calçados & Vestuário', label: 'Moda & Calçados', icon: '👗' },
                      { key: 'Açougues & Carnes', label: 'Açougue & Carnes', icon: '🥩' },
                      { key: 'Pet Shop & Agro', label: 'Pet Shop & Agropecuária', icon: '🐾' },
                      { key: 'Outros / Serviços', label: 'Outros Comércios / Serviços', icon: '⭐' }
                    ].map(item => (
                      <button
                        type="button"
                        key={item.key}
                        onClick={() => {
                          setBusinessType(item.key);
                          if (PREVIEW_TEMPLATES[item.key]) {
                            setActiveCategoryKey(item.key);
                          }
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                          businessType === item.key
                            ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/20 text-emerald-950 font-black'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-700 text-xs font-bold'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-xs leading-tight">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section: Store & Contact Information */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    2. Informações de Identificação & Contato *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Store Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nome do Estabelecimento (Nome Fantasia) *
                      </label>
                      <div className="relative">
                        <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          placeholder="Ex: Padaria Bella Vista, Restaurante da Serra..."
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Owner Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nome do Proprietário ou Responsável *
                      </label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo, Maria das Graças..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp de Contato (DDD 27) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="(27) 99876-5432"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        O Administrador usará este número para iniciar a Fase 2.
                      </span>
                    </div>

                    {/* E-mail */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        E-mail (para recebimento dos materiais e manuais)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seunegocio@gmail.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Location in João Neiva */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    3. Localização em João Neiva - ES *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Neighborhood */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Bairro do Estabelecimento *
                      </label>
                      <select
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                      >
                        {city.neighborhoods.map(bairro => (
                          <option key={bairro} value={bairro}>{bairro}</option>
                        ))}
                      </select>
                    </div>

                    {/* Address / Landmark */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Endereço / Ponto de Referência
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ex: Av. Brasil, próximo à praça central..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Specialties & Delivery Model */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    4. Especialidades & Preferências Operacionais
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Primary Products */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Principais Produtos ou Especialidades que Pretende Divulgar
                      </label>
                      <textarea
                        rows={2}
                        value={primaryProducts}
                        onChange={(e) => setPrimaryProducts(e.target.value)}
                        placeholder="Ex: Pães quentinhos, bolos caseiros, salgados, pizzas à noite, café especial..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                      />
                    </div>

                    {/* Delivery Option */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Modelo de Entrega Inicial
                      </label>
                      <select
                        value={deliveryType}
                        onChange={(e) => setDeliveryType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white font-bold"
                      >
                        <option value="radar_network">Quero utilizar a rede de motoboys credenciados do Radar Local</option>
                        <option value="own_courier">Já possuo entregador / motoboy próprio na loja</option>
                        <option value="pickup">Apenas retirada no balcão da loja física</option>
                        <option value="all">Todas as modalidades (Próprio + Rede do App + Retirada)</option>
                      </select>
                    </div>
                  </div>

                  {/* Best Contact Time */}
                  <div className="pt-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Melhor horário para o Administrador entrar em contato pelo WhatsApp:
                    </label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {[
                        { key: 'anytime', label: 'Qualquer Horário' },
                        { key: 'morning', label: 'Manhã (08h às 12h)' },
                        { key: 'afternoon', label: 'Tarde (13h às 18h)' },
                        { key: 'night', label: 'Noite (18h às 21h)' }
                      ].map(t => (
                        <button
                          type="button"
                          key={t.key}
                          onClick={() => setPreferredContactTime(t.key as any)}
                          className={`px-3 py-1.5 rounded-xl border transition-all ${
                            preferredContactTime === t.key
                              ? 'bg-emerald-600 text-white font-bold border-emerald-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Cadastro inicial sem mensalidade ou compromisso contratual.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 hover:from-emerald-600 hover:to-teal-800 text-white font-black text-sm shadow-xl shadow-emerald-600/25 transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Registrando...' : 'Concluir Cadastro & Avançar para Fase 2'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}

          </div>
        </section>

        {/* SECTION 3: FAQ & MANUAL DE DESENVOLVIMENTO */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Manual de Desenvolvimento do Comércio em João Neiva</span>
              </h3>
              <p className="text-xs text-slate-400">
                Todo lojista cadastrado recebe as instruções práticas de como multiplicar vendas na cidade.
              </p>
            </div>

            <div className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/20 font-bold shrink-0">
              Polo João Neiva (48 comércios credenciados)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-black block">Fase 1: Credenciamento</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                O lojista acessa a página modelo, compreende o posicionamento das fotos e ofertas, e registra os dados de contato do negócio.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-black block">Fase 2: Catálogo & WhatsApp</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                O Administrador do app entra em contato pelo WhatsApp cadastrado, recebe as fotos dos produtos, configura a chave Pix e orienta a equipe.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-cyan-400 font-black block">Fase 3: Lançamento com Match Push</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Disparo do anúncio da sua loja para todos os moradores cadastrados em João Neiva, ativando as primeiras compras e fidelidade.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
