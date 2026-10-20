import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, ShoppingBag, Gift, Sparkles, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity, notes.trim());
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 600);
  };

  const totalPrice = product.price * quantity;
  const pointsEarned = (product.pointsReward || Math.round(product.price)) * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Image & Close */}
        <div className="relative h-60 w-full bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {product.isFlashDeal && (
            <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-xs shadow-md flex items-center gap-1">
              ⚡ Oferta Relâmpago
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              {product.merchantName}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              <Gift className="w-3.5 h-3.5 text-purple-600" />
              <span>+{pointsEarned} pts</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 leading-snug">
            {product.name}
          </h2>

          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            {product.unit && (
              <span className="text-xs text-slate-500 font-medium">/ {product.unit}</span>
            )}
          </div>

          {/* Observations / Customization */}
          <div className="mt-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Personalização ou observações para o comerciante:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Pão bem tostadinho, sem cebola, separar em duas embalagens..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-emerald-500 bg-slate-50 text-slate-800"
            />
          </div>

          {/* Quantity & Action */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-slate-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Adicionado ao Carrinho!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar • R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
