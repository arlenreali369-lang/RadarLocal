import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import {
  ShoppingBag,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  ChefHat,
  MessageCircle,
  Star,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bike
} from 'lucide-react';

export const OrdersTracker: React.FC = () => {
  const { orders, rateOrder, openChatWithMerchant, selectedNeighborhood } = useApp();
  const [filter, setFilter] = useState<'active' | 'history'>('active');
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null);
  const [selectedScore, setSelectedScore] = useState(5);
  const [ratingComment, setRatingComment] = useState('');

  const activeOrders = orders.filter(
    o => o.status !== 'delivered' && o.status !== 'cancelled'
  );
  const pastOrders = orders.filter(
    o => o.status === 'delivered' || o.status === 'cancelled'
  );

  const displayedOrders = filter === 'active' ? activeOrders : pastOrders;

  const getStatusStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'pending':
        return 1;
      case 'preparing':
        return 2;
      case 'ready_for_pickup':
        return 3;
      case 'out_for_delivery':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 1;
    }
  };

  const getStatusLabel = (status: OrderStatus): { text: string; color: string; desc: string } => {
    switch (status) {
      case 'pending':
        return {
          text: 'Pendente / Aguardando Loja',
          color: 'bg-amber-100 text-amber-800 border-amber-300',
          desc: 'A loja foi notificada e já vai aceitar o pedido.'
        };
      case 'preparing':
        return {
          text: 'Em Preparo na Cozinha / Balcão',
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          desc: 'Seus produtos estão sendo separados ou preparados com todo carinho.'
        };
      case 'ready_for_pickup':
        return {
          text: 'Pronto / Aguardando Motoboy',
          color: 'bg-purple-100 text-purple-800 border-purple-300',
          desc: 'Embalado e selado. O entregador parceiro já está encostando.'
        };
      case 'out_for_delivery':
        return {
          text: 'A Caminho do seu Bairro',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          desc: 'O entregador já saiu da loja e está a caminho do seu endereço.'
        };
      case 'delivered':
        return {
          text: 'Entregue com Sucesso',
          color: 'bg-slate-100 text-slate-800 border-slate-300',
          desc: 'Pedido finalizado. Aproveite!'
        };
      default:
        return {
          text: 'Cancelado',
          color: 'bg-rose-100 text-rose-800 border-rose-300',
          desc: 'Pedido cancelado.'
        };
    }
  };

  const handleSendRating = () => {
    if (!ratingOrder) return;
    rateOrder(ratingOrder.id, selectedScore, ratingComment.trim());
    setRatingOrder(null);
    setRatingComment('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            Acompanhamento de Pedidos
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Status em tempo real das compras no comércio da cidade
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'active'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Em Andamento</span>
            {activeOrders.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
                {activeOrders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('history')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filter === 'history'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Histórico ({pastOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {displayedOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200/80 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center mb-3">
            <ShoppingBag className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">
            {filter === 'active' ? 'Nenhum pedido em andamento no momento' : 'Nenhum pedido no histórico'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Quando você faz um pedido em uma loja do bairro, pode acompanhar cada etapa da preparação e entrega aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedOrders.map(order => {
            const stepIndex = getStatusStepIndex(order.status);
            const statusInfo = getStatusLabel(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:shadow-md"
              >
                {/* Top card info */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                      <ShoppingBag className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          Pedido #{order.id}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.merchantName} • {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openChatWithMerchant(order.merchantId)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat com a Loja</span>
                    </button>
                  </div>
                </div>

                {/* Real-time Progress Bar */}
                {order.status !== 'cancelled' && (
                  <div className="p-4 sm:p-6 border-b border-slate-100 bg-white">
                    <div className="relative">
                      {/* Line background */}
                      <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 rounded-full" />
                      {/* Active line fill */}
                      <div
                        className="absolute top-4 left-6 h-1 bg-emerald-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(0, ((stepIndex - 1) / 3) * 100))}%`
                        }}
                      />

                      {/* Steps */}
                      <div className="relative flex justify-between">
                        {/* Step 1: Recebido */}
                        <div className="flex flex-col items-center text-center max-w-[80px]">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                              stepIndex >= 1
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            ✓
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 mt-2">Recebido</span>
                        </div>

                        {/* Step 2: Em Preparo */}
                        <div className="flex flex-col items-center text-center max-w-[80px]">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                              stepIndex >= 2
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            <ChefHat className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 mt-2">Preparando</span>
                        </div>

                        {/* Step 3: A Caminho */}
                        <div className="flex flex-col items-center text-center max-w-[80px]">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                              stepIndex >= 4
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            <Bike className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 mt-2">A Caminho</span>
                        </div>

                        {/* Step 4: Entregue */}
                        <div className="flex flex-col items-center text-center max-w-[80px]">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                              stepIndex >= 5
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 mt-2">Entregue</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mt-5 text-center bg-slate-50 py-2 px-3 rounded-xl border border-slate-100">
                      ℹ️ {statusInfo.desc}
                    </p>
                  </div>
                )}

                {/* Courier info if assigned */}
                {order.courier && order.status !== 'delivered' && (
                  <div className="px-5 py-3 bg-emerald-50/50 border-b border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.courier.photoUrl}
                        alt={order.courier.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            {order.courier.name}
                          </span>
                          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                            ⭐ {order.courier.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {order.courier.vehicle} • {order.courier.phone}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Previsão</span>
                      <p className="text-xs font-extrabold text-emerald-700">
                        {order.estimatedDeliveryTime || '15-20 min'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Items and Details */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 w-5 text-center">
                            {item.quantity}x
                          </span>
                          <span className="text-slate-700 font-medium">{item.product.name}</span>
                          {item.notes && (
                            <span className="text-slate-400 italic text-[11px]">({item.notes})</span>
                          )}
                        </div>
                        <span className="font-semibold text-slate-900">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{order.customerAddress} ({order.neighborhood})</span>
                    </div>

                    <div className="flex items-center gap-3 font-semibold text-slate-800">
                      <span>Pagamento: {order.paymentMethod === 'pix' ? 'Pix (Aprovado)' : order.paymentMethod === 'credit_card' ? 'Cartão' : 'Na Entrega'}</span>
                      <span className="text-sm font-extrabold text-emerald-700">
                        Total: R$ {order.total.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Rating Section if Delivered */}
                  {order.status === 'delivered' && (
                    <div className="pt-2 border-t border-slate-100">
                      {order.rated ? (
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0" />
                          <span className="font-semibold">
                            Você avaliou com {order.ratingScore} estrelas!
                          </span>
                          {order.ratingComment && (
                            <span className="text-slate-600 italic">"{order.ratingComment}"</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/60 border border-purple-200">
                          <div>
                            <span className="text-xs font-bold text-purple-900 block">
                              Como foi a sua experiência?
                            </span>
                            <span className="text-[11px] text-purple-700">
                              Avalie o comércio local e ganhe +15 Pontos de Fidelidade!
                            </span>
                          </div>
                          <button
                            onClick={() => setRatingOrder(order)}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
                          >
                            Avaliar Agora
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 text-center">
              Avaliar {ratingOrder.merchantName}
            </h3>
            <p className="text-xs text-slate-500 text-center mt-1">
              Sua avaliação fortalece o comércio do seu bairro e ajuda outros vizinhos!
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 my-5">
              {[1, 2, 3, 4, 5].map(score => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setSelectedScore(score)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      score <= selectedScore
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Conte o que achou do sabor, agilidade da entrega e embalagem..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-emerald-500"
            />

            <div className="flex items-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => setRatingOrder(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSendRating}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md"
              >
                Enviar e Ganhar +15 pts
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
