import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { ProductDetailModal } from './ProductDetailModal';
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Gift,
  Plus,
  Zap
} from 'lucide-react';

interface StoreViewProps {
  storeId: string;
  onBack: () => void;
}

export const StoreView: React.FC<StoreViewProps> = ({ storeId, onBack }) => {
  const {
    merchants,
    products,
    addToCart,
    openChatWithMerchant
  } = useApp();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const merchant = merchants.find(m => m.id === storeId) || merchants[0];
  const storeProducts = products.filter(p => p.merchantId === merchant.id);

  const categories = ['all', ...Array.from(new Set(storeProducts.map(p => p.category)))];

  const filteredProducts = storeProducts.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para comércios</span>
      </button>

      {/* Store Banner & Info */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="relative h-48 sm:h-64 w-full bg-slate-100">
          <img
            src={merchant.banner}
            alt={merchant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Quick Floating Chat Button */}
          <button
            onClick={() => openChatWithMerchant(merchant.id)}
            className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 font-bold text-xs shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span>Chat com a Loja</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="flex items-end gap-3.5">
              <img
                src={merchant.avatar}
                alt={merchant.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-white shadow-md bg-white shrink-0"
              />
              <div className="text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                    {merchant.category}
                  </span>
                  {merchant.loyaltyPartner && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500 text-white flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      {merchant.loyaltyBonusMultiplier}x Pontos
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-black">{merchant.name}</h1>
                <p className="text-xs text-slate-200 flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{merchant.address}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Sub-bar */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{merchant.rating}</span>
              <span className="text-slate-400 font-normal">({merchant.reviewsCount} avaliações da cidade)</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Entrega estimada: {merchant.deliveryTime}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>{merchant.phone}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-xl italic">
            "{merchant.description}"
          </p>
        </div>
      </div>

      {/* Products Catalog Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Todos os Produtos' : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isFlashDeal && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px] shadow-sm flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-white" />
                    Oferta
                  </span>
                )}
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-purple-900/80 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                  <Gift className="w-3 h-3 text-amber-300" />
                  +{product.pointsReward || Math.round(product.price)} pts
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between">
              <div>
                <span className="text-base font-black text-slate-900">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-[11px] text-slate-400 line-through ml-1.5">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-all shadow-xs"
                title="Adicionar à sacola"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
