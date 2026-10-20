import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Promotion } from '../../types';
import {
  Tag,
  Zap,
  Clock,
  Flame,
  Plus,
  Trash2,
  Sparkles,
  Send,
  AlertCircle,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const PromotionsManager: React.FC = () => {
  const {
    promotions,
    createPromotion,
    deletePromotion,
    products,
    activeMerchant
  } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('15.00');
  const [promoPrice, setPromoPrice] = useState('11.90');
  const [durationMinutes, setDurationMinutes] = useState('120');
  const [unitsLeft, setUnitsLeft] = useState('15');
  const [badgeText, setBadgeText] = useState('Fornada das 17h');
  const [imageUrl, setImageUrl] = useState(products[0]?.image || '');
  const [broadcastedSuccess, setBroadcastedSuccess] = useState(false);

  const merchantPromos = promotions.filter(p => p.merchantId === activeMerchant.id);

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setTitle(`Fornada Especial: ${prod.name}`);
      setDescription(`Desconto exclusivo de bairro para ${prod.name}. Peça antes que termine a fornada!`);
      setOriginalPrice(prod.price.toFixed(2));
      setPromoPrice((prod.price * 0.75).toFixed(2));
      setImageUrl(prod.image);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orig = parseFloat(originalPrice) || 20;
    const promo = parseFloat(promoPrice) || 15;
    const discount = Math.round(((orig - promo) / orig) * 100);

    createPromotion({
      title: title || 'Oferta Relâmpago Especial',
      description: description || 'Super desconto exclusivo no comércio do bairro!',
      productId: selectedProductId,
      discountPercentage: discount > 0 ? discount : 20,
      originalPrice: orig,
      promoPrice: promo,
      expiresAt: new Date(Date.now() + 1000 * 60 * parseInt(durationMinutes || '120')).toISOString(),
      unitsLeft: parseInt(unitsLeft || '10'),
      imageUrl: imageUrl || products[0].image,
      badgeText: badgeText || 'Oferta do Bairro',
      category: activeMerchant.category
    });

    setBroadcastedSuccess(true);
    setIsCreating(false);
    setTimeout(() => setBroadcastedSuccess(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500 fill-amber-400" />
            Ofertas Relâmpago & Match Push
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Anuncie fornadas quentes, queima de estoque ou pratos do dia para todos os moradores da cidade.
          </p>
        </div>

        <button
          onClick={() => {
            if (!title && products.length > 0) {
              handleProductChange(products[0].id);
            }
            setIsCreating(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Oferta Relâmpago</span>
        </button>
      </div>

      {broadcastedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in zoom-in-95">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            🚀 Oferta Relâmpago criada e disparada via <strong>Match Push</strong> para os moradores de São Bento da Serra!
          </span>
        </div>
      )}

      {/* Info Card explaining Match Push */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-100">
              Como funciona o Match Push para Cidades Pequenas?
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Diferente de propagandas caras de redes sociais, o Radar Local envia um alerta sonoro e visual instantâneo para moradores que compraram produtos similares ou estão no raio de entrega da sua loja.
            </p>
          </div>
        </div>

        <div className="bg-white/10 px-3 py-2 rounded-xl text-center min-w-[140px] border border-white/10">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Taxa de Abertura</span>
          <span className="text-lg font-black text-emerald-400">74.2%</span>
          <span className="text-[9px] text-slate-300 block">Engajamento local</span>
        </div>
      </div>

      {/* Creation Modal / Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                Lançar Oferta Relâmpago na Cidade
              </h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Selecione o Produto da Loja:
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Atual: R$ {p.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Título da Oferta:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Fornada Especial: Pão Francês Crocante"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descrição curta / Chamada:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Saindo agora do forno a lenha, apenas 15 unidades com preço especial..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preço Normal (R$):</label>
                  <input
                    type="number"
                    step="0.10"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preço Promocional (R$):</label>
                  <input
                    type="number"
                    step="0.10"
                    value={promoPrice}
                    onChange={(e) => setPromoPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border-2 border-amber-400 font-bold text-amber-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duração (Minutos):</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qtd. Unidades:</label>
                  <input
                    type="number"
                    value={unitsLeft}
                    onChange={(e) => setUnitsLeft(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selo / Tag:</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="Ex: Fornada das 17h"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publicar e Disparar Match Push</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Promotions List */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base">
          Promoções Ativas no Radar ({merchantPromos.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {merchantPromos.map(promo => (
            <div
              key={promo.id}
              className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3"
            >
              <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                  {promo.discountPercentage}% OFF
                </span>
                <span className="absolute bottom-3 right-3 bg-black/75 text-white font-mono text-[10px] px-2 py-0.5 rounded-md">
                  Restam {promo.unitsLeft} un.
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {promo.badgeText}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{promo.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{promo.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-base font-black text-slate-900">
                    R$ {promo.promoPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs text-slate-400 line-through ml-1.5">
                    R$ {promo.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={() => deletePromotion(promo.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Encerrar promoção"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
