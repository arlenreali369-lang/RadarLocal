import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Courier, NeighborhoodFee } from '../../types';
import {
  Bike,
  MapPin,
  Clock,
  Star,
  Plus,
  CheckCircle,
  Phone,
  Route,
  Zap,
  DollarSign,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LogisticsManager: React.FC = () => {
  const {
    neighborhoodFees,
    updateNeighborhoodFee,
    couriers,
    updateCourierStatus,
    addCourier,
    orders,
    city
  } = useApp();

  const [isAddingCourier, setIsAddingCourier] = useState(false);
  const [courierName, setCourierName] = useState('');
  const [vehicle, setVehicle] = useState('Honda CG 160 Fan');
  const [phone, setPhone] = useState('(19) 99');
  const [neighborhood, setNeighborhood] = useState(city.neighborhoods[0]);

  // Grouped delivery orders by neighborhood for small-town route efficiency
  const activeOrders = orders.filter(
    o => o.status === 'preparing' || o.status === 'ready_for_pickup' || o.status === 'out_for_delivery'
  );

  const groupedByNeighborhood = city.neighborhoods.map(bairro => {
    const ordersInBairro = activeOrders.filter(o => o.neighborhood === bairro);
    return {
      neighborhood: bairro,
      orders: ordersInBairro
    };
  }).filter(group => group.orders.length > 0);

  const handleCreateCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courierName.trim()) return;

    addCourier({
      name: courierName.trim(),
      vehicle,
      phone,
      neighborhood,
      status: 'available',
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });

    setIsAddingCourier(false);
    setCourierName('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bike className="w-6 h-6 text-cyan-600" />
            Logística & Entregas de Bairro
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Taxas justas por bairro, rede de motoboys de confiança da cidade e agrupamento inteligente de entregas.
          </p>
        </div>

        <button
          onClick={() => setIsAddingCourier(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Entregador Parceiro</span>
        </button>
      </div>

      {/* SECTION 1: ROTEIRIZADOR DE ENTREGAS AGRUPADAS POR BAIRRO */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                Agrupamento Otimizado de Rotas
                <span className="text-[10px] bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  Economia de Combustível
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Agrupe múltiplos pedidos no mesmo bairro para o motoboy levar na mesma viagem.
              </p>
            </div>
          </div>
        </div>

        {groupedByNeighborhood.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-4 text-center text-xs text-slate-400">
            Nenhum pedido ativo para agrupamento no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {groupedByNeighborhood.map(group => (
              <div
                key={group.neighborhood}
                className="bg-white/10 rounded-2xl p-3.5 border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-cyan-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {group.neighborhood}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-400 text-slate-900">
                    {group.orders.length} pedidos juntos
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  {group.orders.map(o => (
                    <div key={o.id} className="flex justify-between text-[11px]">
                      <span>#{o.id} • {o.customerName}</span>
                      <span className="text-cyan-400 font-semibold">{o.customerAddress}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Tempo estimado rota: <strong>18 min</strong></span>
                  <span className="text-emerald-400 font-bold">1 única viagem</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: GESTÃO DE MOTOBOYS PARCEIROS */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base">
          Entregadores da Cidade ({couriers.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {couriers.map(courier => (
            <div
              key={courier.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={courier.photoUrl}
                    alt={courier.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {courier.name}
                      </h4>
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {courier.rating}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{courier.vehicle}</p>
                    <p className="text-[11px] text-slate-400">{courier.phone}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>{courier.deliveriesCount} entregas realizadas</span>
                  <span className="font-semibold text-slate-800">Bairro: {courier.neighborhood}</span>
                </div>
              </div>

              {/* Status Switcher */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => updateCourierStatus(courier.id, 'available')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    courier.status === 'available'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Disponível
                </button>
                <button
                  onClick={() => updateCourierStatus(courier.id, 'busy')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    courier.status === 'busy'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Em Entrega
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TABELA DE TAXAS POR BAIRRO */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">
            Configuração de Taxas e Prazos por Bairro ({city.name})
          </h3>
          <p className="text-xs text-slate-500">
            Valores ajustados para a realidade de cidades com menos de 30 mil habitantes.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {neighborhoodFees.map(feeItem => (
            <div
              key={feeItem.name}
              className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800 text-sm">{feeItem.name}</span>
                <span className="text-slate-400 font-medium">({feeItem.estimatedMinutes})</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Taxa de Entrega:</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-700">R$</span>
                  <input
                    type="number"
                    step="0.50"
                    defaultValue={feeItem.fee.toFixed(2)}
                    onBlur={(e) => updateNeighborhoodFee(feeItem.name, parseFloat(e.target.value) || feeItem.fee)}
                    className="w-20 p-1.5 rounded-lg border border-slate-200 font-black text-slate-900 text-right bg-slate-50"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Courier Modal */}
      {isAddingCourier && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="font-black text-slate-900 text-base mb-3">
              Cadastrar Novo Entregador de Bairro
            </h3>

            <form onSubmit={handleCreateCourier} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Entregador:</label>
                <input
                  type="text"
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  placeholder="Ex: João da Titan Preta"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Veículo:</label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="Ex: Honda CG 160 Fan / Bike Elétrica"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bairro Base:</label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  >
                    {city.neighborhoods.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCourier(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold shadow-sm"
                >
                  Salvar Entregador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
