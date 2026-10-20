import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import {
  ClipboardList,
  Clock,
  MapPin,
  Check,
  Bike,
  ChefHat,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  Printer,
  ChevronRight,
  User,
  ShieldCheck,
  Send
} from 'lucide-react';

export const OrdersKanban: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    couriers,
    activeMerchant,
    openChatWithMerchant,
    sendMatchPush
  } = useApp();

  const [selectedCourierId, setSelectedCourierId] = useState<string>(couriers[0]?.id || '');
  const [selectedOrderForDispatch, setSelectedOrderForDispatch] = useState<Order | null>(null);

  // Filter orders for active merchant (or all if simulated)
  const merchantOrders = orders;

  const pendingOrders = merchantOrders.filter(o => o.status === 'pending');
  const preparingOrders = merchantOrders.filter(o => o.status === 'preparing');
  const readyOrders = merchantOrders.filter(o => o.status === 'ready_for_pickup');
  const inRouteOrders = merchantOrders.filter(o => o.status === 'out_for_delivery');
  const completedOrders = merchantOrders.filter(o => o.status === 'delivered');

  const handlePrint = (order: Order) => {
    alert(`Comanda impressa para a cozinha / balcão do comércio:\n\nPedido #${order.id}\nCliente: ${order.customerName}\nBairro: ${order.neighborhood}\nItens: ${order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}\nObs: ${order.notes || 'Sem observações'}`);
  };

  const handleSimulateNewOrderAlert = () => {
    sendMatchPush({
      targetRole: 'merchant',
      type: 'order',
      title: '🔔 Novo Pedido #RADAR-9901 Pendente!',
      message: 'Novo morador do Centro fez um pedido no valor de R$ 38,50 via Pix.',
      priority: 'high',
      relatedMerchantId: activeMerchant.id
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-emerald-600" />
              Gestão de Pedidos em Tempo Real
            </h2>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Painel da <strong>{activeMerchant.name}</strong> • Conexão direta com motoboys e moradores
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateNewOrderAlert}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors border border-amber-300"
            title="Simula a chegada de um novo pedido com alerta sonoro"
          >
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Testar Alerta de Novo Pedido</span>
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1: Pendentes */}
        <div className="bg-slate-100/80 rounded-3xl p-4 flex flex-col h-[76vh] border border-slate-200">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-700">
                1. Pendentes
              </h3>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
              {pendingOrders.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {pendingOrders.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-center p-4 text-xs text-slate-400">
                Nenhum pedido pendente
              </div>
            ) : (
              pendingOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border-2 border-amber-400/80 space-y-3 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-slate-900">
                      #{order.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {order.paymentMethod === 'pix' ? 'Pix Pago' : 'Cartão'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{order.customerName}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{order.customerAddress} ({order.neighborhood})</span>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between font-medium text-slate-700">
                        <span>{i.quantity}x {i.product.name}</span>
                        <span>R$ {(i.product.price * i.quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                    {order.notes && (
                      <p className="text-[11px] text-amber-800 font-semibold italic pt-1 border-t border-slate-200">
                        Obs: "{order.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-black text-slate-900 pt-1">
                    <span>Total com frete:</span>
                    <span className="text-emerald-700">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handlePrint(order)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                      title="Imprimir comanda"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ChefHat className="w-4 h-4" />
                      <span>Aceitar e Preparar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Em Preparo */}
        <div className="bg-slate-100/80 rounded-3xl p-4 flex flex-col h-[76vh] border border-slate-200">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-700">
                2. Em Preparo
              </h3>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-blue-200 text-blue-900">
              {preparingOrders.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {preparingOrders.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-center p-4 text-xs text-slate-400">
                Nenhum pedido sendo preparado
              </div>
            ) : (
              preparingOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-slate-900">
                      #{order.id}
                    </span>
                    <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                      Cozinha / Balcão
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{order.customerName}</h4>
                    <p className="text-[11px] text-slate-500">{order.neighborhood}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="text-slate-700 font-medium">
                        {i.quantity}x {i.product.name}
                      </div>
                    ))}
                    {order.notes && (
                      <p className="text-[11px] text-amber-700 italic pt-1">
                        Obs: "{order.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => openChatWithMerchant(order.merchantId)}
                      className="p-2 rounded-xl border border-slate-200 text-blue-600 hover:bg-blue-50"
                      title="Enviar mensagem ao cliente"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready_for_pickup')}
                      className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Pronto para Despacho</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Pronto / Chamar Motoboy */}
        <div className="bg-slate-100/80 rounded-3xl p-4 flex flex-col h-[76vh] border border-slate-200">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-700">
                3. Pronto / Despacho
              </h3>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
              {readyOrders.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {readyOrders.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-center p-4 text-xs text-slate-400">
                Nenhum pedido aguardando motoboy
              </div>
            ) : (
              readyOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-purple-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-slate-900">
                      #{order.id}
                    </span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      Embalado
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{order.customerName}</h4>
                    <p className="text-[11px] text-slate-500">{order.customerAddress}</p>
                    <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                      Destino: {order.neighborhood}
                    </p>
                  </div>

                  {/* Courier selection */}
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                      Designar Entregador Parceiro:
                    </label>
                    <select
                      value={selectedCourierId}
                      onChange={(e) => setSelectedCourierId(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    >
                      {couriers.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.vehicle})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'out_for_delivery', selectedCourierId)}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Bike className="w-4 h-4" />
                    <span>Despachar com Motoboy</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 4: Em Rota / Entregues */}
        <div className="bg-slate-100/80 rounded-3xl p-4 flex flex-col h-[76vh] border border-slate-200">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-700">
                4. A Caminho ({inRouteOrders.length})
              </h3>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              {inRouteOrders.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {inRouteOrders.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-center p-4 text-xs text-slate-400">
                Nenhum pedido em trânsito no momento
              </div>
            ) : (
              inRouteOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-emerald-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-slate-900">
                      #{order.id}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Em Rota
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{order.customerName}</h4>
                    <p className="text-[11px] text-slate-500">{order.customerAddress}</p>
                    {order.courier && (
                      <p className="text-[11px] font-bold text-slate-700 mt-1 flex items-center gap-1">
                        <Bike className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{order.courier.name}</span>
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirmar Entrega Concluída</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
