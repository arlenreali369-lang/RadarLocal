import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckoutModal } from './CheckoutModal';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MapPin,
  Tag,
  Gift,
  Store,
  Sparkles,
  Check
} from 'lucide-react';

interface CartDrawerProps {
  onOpenOrders: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenOrders }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDeliveryFee,
    cartPointsDiscount,
    cartPointsUsed,
    applyPointsDiscount,
    removePointsDiscount,
    loyaltyProfile,
    selectedNeighborhood,
    clearCart
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'RADAR10' || couponCode.trim().toUpperCase() === 'BAIRRO5') {
      setAppliedCoupon({ code: couponCode.trim().toUpperCase(), discount: 5.00 });
      setCouponCode('');
    } else {
      alert('Cupom inválido. Tente o cupom de boas-vindas "BAIRRO5" ou "RADAR10".');
    }
  };

  const finalTotal = Math.max(0, cartSubtotal + cartDeliveryFee - (appliedCoupon?.discount || 0) - cartPointsDiscount);

  const handleOrderSuccess = (orderId: string) => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    onOpenOrders();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs">
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Sua Sacola de Bairro</h3>
                  <p className="text-xs text-slate-500">
                    {cart.length === 0 ? 'Sacola vazia' : `${cart.length} item(ns) selecionado(s)`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                    title="Esvaziar sacola"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Sua sacola está vazia</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Explore os comércios do seu bairro, aproveite as ofertas relâmpago e acumule pontos!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {/* Merchant tag */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 font-medium">
                    <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">Loja: {cart[0]?.product.merchantName}</span>
                  </div>

                  {/* Items List */}
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl border border-slate-200/80 bg-white flex gap-3 shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-extrabold text-emerald-700 block mt-0.5">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </span>

                        {item.notes && (
                          <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">
                            Obs: {item.notes}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:text-slate-900 text-slate-500"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:text-slate-900 text-slate-500"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* REDEEM POINTS IN CART */}
                  <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-purple-600" />
                        Resgatar Pontos do Clube Radar
                      </span>
                      <span className="text-[11px] font-extrabold text-purple-700 bg-white px-2 py-0.5 rounded-full border border-purple-200">
                        Saldo: {loyaltyProfile.points} pts
                      </span>
                    </div>

                    <p className="text-[11px] text-purple-800/80">
                      Você pode usar seus pontos acumulados para abater no valor deste pedido:
                    </p>

                    {cartPointsUsed > 0 ? (
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-purple-200 text-xs">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 font-bold" />
                          <span className="font-bold text-purple-950">
                            {cartPointsUsed} pts aplicados (- R$ {cartPointsDiscount.toFixed(2).replace('.', ',')})
                          </span>
                        </div>
                        <button
                          onClick={removePointsDiscount}
                          className="text-[11px] font-bold text-rose-600 hover:underline"
                        >
                          Remover
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 pt-1">
                        {loyaltyProfile.points >= 100 && (
                          <button
                            onClick={() => applyPointsDiscount(100)}
                            className="flex-1 py-1.5 px-2 bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[11px] rounded-xl transition-all shadow-xs"
                          >
                            - R$ 10,00 (100 pts)
                          </button>
                        )}
                        {loyaltyProfile.points >= 200 && (
                          <button
                            onClick={() => applyPointsDiscount(200)}
                            className="flex-1 py-1.5 px-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] rounded-xl transition-all shadow-xs"
                          >
                            - R$ 20,00 (200 pts)
                          </button>
                        )}
                        {loyaltyProfile.points < 100 && (
                          <span className="text-[11px] text-slate-500 italic">
                            Junte a partir de 100 pontos para abater descontos diretos na sacola.
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Cupom de desconto tradicional */}
                  <div className="pt-1">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                        <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          Cupom {appliedCoupon.code} aplicado (- R$ {appliedCoupon.discount.toFixed(2).replace('.', ',')})
                        </span>
                        <button
                          onClick={() => setAppliedCoupon(null)}
                          className="text-[11px] font-bold text-rose-500 hover:underline"
                        >
                          Remover
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Cupom de desconto (Ex: BAIRRO5)"
                          className="flex-1 p-2 text-xs rounded-xl border border-slate-200 uppercase bg-slate-50 focus:outline-emerald-500"
                        />
                        <button
                          type="submit"
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
                        >
                          Aplicar
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Footer calculation */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">
                      R$ {cartSubtotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      Entrega ({selectedNeighborhood})
                    </span>
                    <span className="font-semibold text-slate-800">
                      R$ {cartDeliveryFee.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {cartPointsDiscount > 0 && (
                    <div className="flex justify-between text-xs text-purple-700 font-bold">
                      <span>Desconto Pontos Clube Radar</span>
                      <span>- R$ {cartPointsDiscount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                      <span>Desconto cupom</span>
                      <span>- R$ {appliedCoupon.discount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span className="text-emerald-700">
                      R$ {finalTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="mt-3 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Avançar para Pagamento</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />
    </>
  );
};
