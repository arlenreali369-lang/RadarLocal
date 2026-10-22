import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MarketingPackage, ArtCreationRequest, AdBanner } from '../../types';
import {
  Sparkles,
  MessageCircle,
  Megaphone,
  CheckCircle,
  Clock,
  Download,
  Eye,
  MousePointerClick,
  Palette,
  Send,
  Zap,
  Star,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowUpRight,
  PlusCircle,
  Image as ImageIcon,
  CreditCard,
  QrCode
} from 'lucide-react';
import { MarketingPackageCheckoutModal } from './MarketingPackageCheckoutModal';

export const MerchantMarketingAgency: React.FC = () => {
  const {
    activeMerchant,
    marketingPackages,
    marketingAdvisor,
    merchantSubscriptions,
    subscribeToMarketingPackage,
    cancelMarketingSubscription,
    adBanners,
    artRequests,
    createArtRequest,
    toggleBannerStatus,
    publishArtRequestAsBanner,
    products
  } = useApp();

  const currentPackageId = merchantSubscriptions[activeMerchant.id] || 'pkg-adesao';
  const currentPackage = marketingPackages.find(p => p.id === currentPackageId) || marketingPackages[0];

  // Form states for new art request
  const [requestType, setRequestType] = useState<ArtCreationRequest['requestType']>('app_banner');
  const [artTitle, setArtTitle] = useState('');
  const [productOrOffer, setProductOrOffer] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedProductPreset, setSelectedProductPreset] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Checkout modal states for package subscription
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPackage, setCheckoutPackage] = useState<MarketingPackage | null>(null);

  // Filter banners and requests for this active store
  const storeBanners = adBanners.filter(b => b.merchantId === activeMerchant.id);
  const storeRequests = artRequests.filter(r => r.merchantId === activeMerchant.id);

  const handleProductPreset = (prodId: string) => {
    setSelectedProductPreset(prodId);
    const prod = products.find(p => p.id === prodId);
    if (prod) {
      setArtTitle(`Destaque: ${prod.name}`);
      setProductOrOffer(prod.name);
      setRegularPrice(`R$ ${prod.price.toFixed(2)}`);
      setOfferPrice(`R$ ${(prod.price * 0.8).toFixed(2)}`);
      setInstructions(`Destacar foto profissional de ${prod.name}, cores atrativas para apetite/compra e chamada para entrega rápida em João Neiva.`);
    }
  };

  const handleSendRequest = (e: React.FormEvent, openWhatsApp: boolean = false) => {
    e.preventDefault();

    if (!artTitle.trim() || !productOrOffer.trim()) return;

    const newReq = createArtRequest({
      merchantId: activeMerchant.id,
      merchantName: activeMerchant.name,
      requestType,
      title: artTitle,
      productOrOffer,
      regularPrice: regularPrice || undefined,
      offerPrice: offerPrice || undefined,
      instructions: instructions || 'Criar arte com alta conversão e estética limpa para moradores de João Neiva.',
      estimatedDeliveryHours: currentPackage.tier === 'gold' ? 12 : 24,
      artPreviewUrl: products.find(p => p.id === selectedProductPreset)?.image || activeMerchant.banner
    });

    setRequestSuccess(true);
    setTimeout(() => setRequestSuccess(false), 5000);

    if (openWhatsApp) {
      const cleanNumber = marketingAdvisor.whatsappNumber.replace(/\D/g, '');
      const typeLabel =
        requestType === 'app_banner'
          ? 'Banner no Topo do App'
          : requestType === 'whatsapp_flyer'
          ? 'Flyer para Status de WhatsApp'
          : requestType === 'promo_card'
          ? 'Cardápio / Tabela de Ofertas'
          : 'Post para Redes Sociais';

      const text = encodeURIComponent(
        `Olá ${marketingAdvisor.name}! Sou o lojista da *${activeMerchant.name}* (Polo João Neiva).\n` +
        `Acabei de cadastrar um briefing de criação de arte no painel:\n\n` +
        `📌 *Tipo de Arte:* ${typeLabel}\n` +
        `🏷️ *Título:* ${artTitle}\n` +
        `📦 *Produto/Oferta:* ${productOrOffer}\n` +
        (offerPrice ? `💰 *Preço Promocional:* ${offerPrice} (De: ${regularPrice || 'Normal'})\n` : '') +
        `📝 *Instruções:* ${instructions || 'Estilo profissional com chamada de impacto'}\n\n` +
        `Fico no aguardo da prévia da arte para veiculação no Radar Local! Muito obrigado.`
      );

      window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
    }

    // Reset form
    setArtTitle('');
    setProductOrOffer('');
    setRegularPrice('');
    setOfferPrice('');
    setInstructions('');
    setSelectedProductPreset('');
  };

  const openAdvisorWhatsAppDirect = () => {
    const cleanNumber = marketingAdvisor.whatsappNumber.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Olá ${marketingAdvisor.name}! Sou o lojista da *${activeMerchant.name}* (Plano Atual: ${currentPackage.name}). ` +
      `Gostaria de instruções e orientação da equipe de marketing sobre nossos espaços publicitários e criação de novas artes no Radar Local.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-in fade-in">
      {/* Top Hero: Nosso Diferencial Radar Local */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/40">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 -top-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                Diferencial Exclusivo Radar Local
              </span>
              <span className="text-xs font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
                Sua Loja com Agência de Marketing Integrada
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Assessoria de Marketing Digital & Espaço Publicitário
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Você não precisa pagar agências externas caras de R$ 1.500/mês ou sofrer sem saber criar artes.
              Nossa equipe de publicidade cria as <strong>imagens publicitárias profissionais da sua loja</strong>,
              orienta sua estratégia no WhatsApp e coloca seu comércio em <strong>espaços de destaque no aplicativo</strong>!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={openAdvisorWhatsAppDirect}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Falar no WhatsApp com Minha Assessora</span>
              </button>

              <a
                href="#planos"
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <span>Ver Pacotes de Mensalidade</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Advisor Spotlight Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 max-w-sm w-full shrink-0 shadow-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={marketingAdvisor.avatarUrl}
                  alt={marketingAdvisor.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 shrink-0"
                />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 absolute -bottom-0.5 -right-0.5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                  Sua Assessora Pessoal
                </span>
                <h4 className="font-extrabold text-white text-base leading-tight">
                  {marketingAdvisor.name}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {marketingAdvisor.role}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-3 border border-white/10 text-[11px] text-slate-200 space-y-1">
              <div className="font-bold text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-400" />
                <span>Instruções da Semana (João Neiva):</span>
              </div>
              <p className="leading-snug text-slate-300">
                "Padarias e lanchonetes têm pico de engajamento às 15h30 e 18h. Seus novos banners no app estão com 98% de entrega nos bairros Centro e Vila Nova."
              </p>
            </div>

            <button
              onClick={openAdvisorWhatsAppDirect}
              className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-black transition-all flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {marketingAdvisor.whatsappFormatted}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Summary Dashboard of Store Marketing Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Package */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Plano Atual</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
              Ativo
            </span>
          </div>
          <div className="text-xl font-black text-slate-900">{currentPackage.name}</div>
          <p className="text-xs text-slate-500">
            R$ {currentPackage.priceMonthly.toFixed(2)}/mês • Renovação automática
          </p>
        </div>

        {/* Ad Banners Active */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Banners no App</span>
            <Megaphone className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {storeBanners.filter(b => b.active).length} / {currentPackage.bannerSlotsCount} ativos
          </div>
          <p className="text-xs text-slate-500">
            {storeBanners.reduce((sum, b) => sum + b.viewsCount, 0)} visualizações registradas
          </p>
        </div>

        {/* Arts Produced */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Artes da Equipe</span>
            <Palette className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {storeRequests.length} criadas
          </div>
          <p className="text-xs text-slate-500">
            Disponíveis para download e veiculação
          </p>
        </div>

        {/* Total Clicks Received */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Cliques dos Clientes</span>
            <MousePointerClick className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {storeBanners.reduce((sum, b) => sum + b.clicksCount, 0)} cliques
          </div>
          <p className="text-xs text-slate-500">
            Direcionados para o seu cardápio/WhatsApp
          </p>
        </div>
      </div>

      {/* Section: Solicitar Nova Arte à Equipe Radar (Briefing Expresso) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md shadow-amber-400/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Assessoria Criativa
                </span>
                <span className="text-xs font-bold text-amber-900">
                  Incluso no seu pacote ({storeRequests.length}/{currentPackage.customArtsCount} este mês)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Solicitar Criação de Imagem Publicitária Profissional
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Diga o que deseja anunciar. Nossa equipe de designers cria a arte, envia no WhatsApp para sua aprovação e publica no app!
              </p>
            </div>
          </div>

          <button
            onClick={openAdvisorWhatsAppDirect}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Tirar Dúvida no WhatsApp</span>
          </button>
        </div>

        <form onSubmit={(e) => handleSendRequest(e, false)} className="p-5 sm:p-6 space-y-5">
          {requestSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <strong>Solicitação enviada com sucesso para a equipe de marketing!</strong> Nossa assessora já foi notificada e entrará em contato pelo seu WhatsApp cadastrado ({activeMerchant.phone}).
              </div>
            </div>
          )}

          {/* Quick Preset Selector from Merchant Products */}
          {products.filter(p => p.merchantId === activeMerchant.id).length > 0 && (
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                💡 Quer agilizar? Escolha um produto já cadastrado na sua loja:
              </label>
              <div className="flex flex-wrap gap-2">
                {products
                  .filter(p => p.merchantId === activeMerchant.id)
                  .slice(0, 6)
                  .map(prod => (
                    <button
                      type="button"
                      key={prod.id}
                      onClick={() => handleProductPreset(prod.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        selectedProductPreset === prod.id
                          ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <img src={prod.image} alt={prod.name} className="w-4 h-4 rounded-full object-cover" />
                      <span>{prod.name} (R$ {prod.price.toFixed(2)})</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Format / Type of Art */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              1. Qual o formato da imagem publicitária que você precisa?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                {
                  id: 'app_banner',
                  label: 'Banner para Topo do App',
                  desc: 'Espaço nobre no carrossel da Home de João Neiva'
                },
                {
                  id: 'whatsapp_flyer',
                  label: 'Flyer para Status / WhatsApp',
                  desc: 'Formato vertical 9:16 de alto impacto'
                },
                {
                  id: 'promo_card',
                  label: 'Tabela / Cardápio de Ofertas',
                  desc: 'Divulgação de combos e lista de preços'
                },
                {
                  id: 'social_post',
                  label: 'Post Quadrado (Feed / Insta)',
                  desc: 'Ideal para publicar nas redes e grupos'
                }
              ].map(format => (
                <div
                  key={format.id}
                  onClick={() => setRequestType(format.id as any)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    requestType === format.id
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="font-extrabold text-xs text-slate-900">{format.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{format.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Título ou Chamada Principal da Imagem:
              </label>
              <input
                type="text"
                value={artTitle}
                onChange={(e) => setArtTitle(e.target.value)}
                placeholder="Ex: Fornada Quentinha das 16h / Sexta da Pizza em Dobro"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                3. Produto ou Serviço Divulgado:
              </label>
              <input
                type="text"
                value={productOrOffer}
                onChange={(e) => setProductOrOffer(e.target.value)}
                placeholder="Ex: Pão Francês Crocante / Pizza Calabresa"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preço Normal (Opcional):
              </label>
              <input
                type="text"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                placeholder="Ex: R$ 15,00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preço Promocional ou Destaque:
              </label>
              <input
                type="text"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="Ex: R$ 11,90 ou '20% OFF na Primeira Compra'"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Instructions for Designer */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              4. Instruções e Orientações para a Equipe de Criação:
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ex: Gostaria de cores alegres, destacar que entregamos em todos os bairros de João Neiva, e incluir nosso selo de forno a lenha."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Prazo de entrega da arte: <strong>até {currentPackage.tier === 'gold' ? '12h' : '24h úteis'}</strong> pelo WhatsApp</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Salvar Solicitação</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleSendRequest(e, true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Enviar Briefing & Iniciar no WhatsApp</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Section: Banners Ativos e Artes da Loja */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-500" />
              Seus Banners Publicitários em Veiculação no App
            </h3>
            <p className="text-xs text-slate-500">
              Imagens que estão aparecendo no topo do aplicativo para todos os clientes de João Neiva.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">
            {storeBanners.length} banner(s) cadastrado(s)
          </span>
        </div>

        {storeBanners.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
            <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-extrabold text-slate-800 text-sm">
              Nenhum banner ativo no momento para esta loja
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Preencha o formulário acima para que nossa equipe crie seu primeiro anúncio profissional e coloque no ar no topo do aplicativo!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storeBanners.map(banner => (
              <div
                key={banner.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      {banner.badgeLabel}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      banner.active ? 'bg-emerald-500 text-white' : 'bg-slate-600 text-white'
                    }`}>
                      {banner.active ? '● Veiculando no App' : '○ Pausado'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-black text-base leading-tight drop-shadow-md">
                      {banner.title}
                    </h4>
                    <p className="text-xs text-slate-200 mt-0.5 line-clamp-1 drop-shadow-sm">
                      {banner.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">Visualizações</div>
                      <div className="text-sm font-black text-slate-900">{banner.viewsCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">Cliques</div>
                      <div className="text-sm font-black text-emerald-600">{banner.clicksCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">Taxa (CTR)</div>
                      <div className="text-sm font-black text-amber-600">
                        {banner.viewsCount > 0 ? `${((banner.clicksCount / banner.viewsCount) * 100).toFixed(1)}%` : '0%'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => toggleBannerStatus(banner.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        banner.active
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      {banner.active ? 'Pausar Banner' : 'Reativar no App'}
                    </button>

                    <a
                      href={banner.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      title="Baixar imagem em alta resolução para WhatsApp"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar Arte</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section: Fila de Artes Solicitadas e Prontas */}
      {storeRequests.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Histórico & Prévia das Artes Criadas pela Equipe
              </h3>
              <p className="text-xs text-slate-500">
                Acompanhe o andamento das suas solicitações e aprove as artes prontas.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {storeRequests.map(req => (
              <div
                key={req.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  {req.artPreviewUrl ? (
                    <img
                      src={req.artPreviewUrl}
                      alt={req.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-300 shrink-0 shadow-xs"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Palette className="w-6 h-6" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        req.status === 'published_in_app'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : req.status === 'ready_for_review'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {req.status === 'published_in_app'
                          ? '✓ Publicado no App'
                          : req.status === 'ready_for_review'
                          ? '⭐ Arte Pronta para Sua Aprovação'
                          : '🎨 Em Criação pela Equipe'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(req.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900">{req.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {req.productOrOffer} {req.offerPrice && `• ${req.offerPrice}`}
                    </p>
                    {req.designerNotes && (
                      <p className="text-[11px] text-purple-900 bg-purple-50 p-1.5 rounded-lg border border-purple-200 mt-1 max-w-lg">
                        <strong>Nota do Designer:</strong> {req.designerNotes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {req.status === 'ready_for_review' && (
                    <button
                      onClick={() => publishArtRequestAsBanner(req.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Aprovar & Ativar no App</span>
                    </button>
                  )}

                  {req.artPreviewUrl && (
                    <a
                      href={req.artPreviewUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar Arte</span>
                    </a>
                  )}

                  <button
                    onClick={openAdvisorWhatsAppDirect}
                    className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 font-bold text-xs border border-emerald-300 transition-all flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section: Quanto Tempo Libera o Serviço & Sistema de Pagamento */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white border border-slate-700/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 fill-slate-950" />
                Prazos & Ativação Transparente
              </span>
              <span className="text-xs text-amber-300 font-bold">
                Radar Local João Neiva
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ⏱️ Quanto Tempo Demora para Liberar o Serviço?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Sem burocracia e sem enrolação. Veja o passo a passo exato desde o pagamento até sua propaganda estar no ar:
            </p>
          </div>

          <button
            onClick={() => {
              setCheckoutPackage(currentPackage);
              setIsCheckoutOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center cursor-pointer"
          >
            <CreditCard className="w-4 h-4 fill-slate-950" />
            <span>Ver Formas de Pagamento</span>
          </button>
        </div>

        {/* 4 Step Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
            <span className="absolute -right-2 -bottom-2 text-5xl font-black text-white/5 pointer-events-none">01</span>
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-400/30">
                0 a 2 Minutos
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-white">
              Liberação Imediata
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Pagou via <strong>PIX</strong> ou <strong>Cartão</strong>? O sistema reconhece no mesmo segundo e libera seus slots de banner e painel.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
            <span className="absolute -right-2 -bottom-2 text-5xl font-black text-white/5 pointer-events-none">02</span>
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-400/30">
                2 a 10 Minutos
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-white">
              Boas-vindas no WhatsApp
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Sua assessora dedicada ({marketingAdvisor.name}) recebe a notificação e manda um "Olá" no seu WhatsApp para alinhar suas ofertas.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
            <span className="absolute -right-2 -bottom-2 text-5xl font-black text-white/5 pointer-events-none">03</span>
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-indigo-400 text-slate-950 font-black text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-400/30">
                12h a 24h úteis
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-white">
              Criação das Artes
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Nossa equipe de designers monta as imagens publicitárias com foco em venda e envia a prévia no WhatsApp para sua aprovação.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
            <span className="absolute -right-2 -bottom-2 text-5xl font-black text-white/5 pointer-events-none">04</span>
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-pink-400 text-slate-950 font-black text-xs flex items-center justify-center">
                4
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-pink-300 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-400/30">
                1 Clique
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-white">
              No Topo do App!
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Arte aprovada? Em 1 clique ela entra no ar no topo do aplicativo Radar Local para todos os moradores de João Neiva!
            </p>
          </div>
        </div>

        {/* How payment is implemented explainer */}
        <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>Sistema de Pagamento Integrado:</strong> Aceitamos <strong>PIX Dinâmico com baixa em tempo real</strong> e <strong>Cartão de Crédito com renovação mensal</strong> (compatível com Mercado Pago & Asaas no Brasil).
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-200">
              🔒 100% Seguro
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-200">
              ⚡ Sem Multa de Fidelidade
            </span>
          </div>
        </div>
      </div>

      {/* Section: Pacotes de Serviços de Marketing Digital (Mensalidades) */}
      <div id="planos" className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Adesão Promocional • Comércio de João Neiva
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Programa de Vendas Radar Local & Assessoria Mensal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Comece com nosso <strong>valor promocional de apenas R$ 42,00/mês</strong> pela adesão completa ao programa de vendas, com criação de imagens publicitárias e assessoria no WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {marketingPackages.map(pkg => {
            const isSubscribed = currentPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  isSubscribed
                    ? 'bg-slate-900 text-white shadow-xl ring-4 ring-amber-400 border border-slate-800'
                    : pkg.isPopular
                    ? 'bg-gradient-to-b from-amber-50 to-white border-2 border-amber-400/90 shadow-md'
                    : 'bg-white border border-slate-200 shadow-xs'
                }`}
              >
                {/* Badge */}
                {pkg.highlightBadge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-3.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {pkg.highlightBadge}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-black ${isSubscribed ? 'text-white' : 'text-slate-900'}`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-xs mt-0.5 ${isSubscribed ? 'text-slate-400' : 'text-slate-500'}`}>
                        {pkg.tagline}
                      </p>
                    </div>
                    {isSubscribed && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-black uppercase">
                        Plano Ativo
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="py-2 border-y border-slate-100 dark:border-slate-800">
                    {pkg.originalPriceMonthly && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs line-through ${isSubscribed ? 'text-slate-400' : 'text-slate-400'}`}>
                          De R$ {pkg.originalPriceMonthly.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                          Valor Promocional
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className={`text-xs font-bold ${isSubscribed ? 'text-slate-400' : 'text-slate-500'}`}>
                        R$
                      </span>
                      <span className={`text-3xl sm:text-4xl font-black ${isSubscribed ? 'text-amber-400' : 'text-slate-950'}`}>
                        {pkg.priceMonthly.toFixed(2).replace('.', ',')}
                      </span>
                      <span className={`text-xs font-bold ${isSubscribed ? 'text-slate-400' : 'text-slate-500'}`}>
                        /mês
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 ${isSubscribed ? 'text-slate-400' : 'text-slate-500'}`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-1">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider ${isSubscribed ? 'text-slate-300' : 'text-slate-700'}`}>
                      O que está incluso:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSubscribed ? 'text-amber-400' : 'text-emerald-600'
                          }`} />
                          <span className={isSubscribed ? 'text-slate-200' : 'text-slate-700'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-6 space-y-2">
                  {isSubscribed ? (
                    <div className="space-y-2">
                      <button
                        onClick={openAdvisorWhatsAppDirect}
                        className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <MessageCircle className="w-4 h-4 fill-slate-950" />
                        <span>Falar com Assessora no WhatsApp</span>
                      </button>

                      <button
                        onClick={() => {
                          setCheckoutPackage(pkg);
                          setIsCheckoutOpen(true);
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Ver Detalhes do Pagamento / Comprovante</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setCheckoutPackage(pkg);
                        setIsCheckoutOpen(true);
                      }}
                      className={`w-full py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        pkg.isPopular
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                          : 'bg-slate-950 hover:bg-slate-900 text-white shadow-xs'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Ativar Pacote {pkg.name}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const cleanNumber = marketingAdvisor.whatsappNumber.replace(/\D/g, '');
                      const msg = encodeURIComponent(
                        `Olá ${marketingAdvisor.name}! Gostaria de saber mais sobre o pacote *${pkg.name}* (R$ ${pkg.priceMonthly}/mês) para a loja ${activeMerchant.name}.`
                      );
                      window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      isSubscribed
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>Dúvidas sobre este plano? Fale no WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Subscription Checkout Modal */}
      <MarketingPackageCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPackage={checkoutPackage}
        onSuccess={(pkgId) => {
          subscribeToMarketingPackage(activeMerchant.id, pkgId);
        }}
      />
    </div>
  );
};
