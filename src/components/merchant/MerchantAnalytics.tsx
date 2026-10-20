import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
  Award,
  Zap,
  Star,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

export const MerchantAnalytics: React.FC = () => {
  const { orders, activeMerchant, promotions, loyaltyProfile } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const averageTicket = orders.length > 0 ? totalRevenue / orders.length : 0;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  // Small town hourly volume breakdown
  const peakHours = [
    { hour: '07h - 09h', label: 'Café & Pão Quentinho', percent: 78, orders: 42 },
    { hour: '11h - 13h', label: 'Almoço & Feira', percent: 65, orders: 35 },
    { hour: '15h - 17h', label: 'Café da Tarde / Lanche', percent: 84, orders: 48 },
    { hour: '18h - 21h', label: 'Jantar & Pizzas', percent: 92, orders: 54 }
  ];

  const topProducts = [
    { name: 'Pão Francês Quentinho (10 un.)', sales: 142, revenue: 1349.00 },
    { name: 'Combo Café Colonial do Bairro', sales: 94, revenue: 1588.60 },
    { name: 'Bolo Caseiro de Cenoura c/ Brigadeiro', sales: 68, revenue: 1632.00 },
    { name: 'Porção de Pão de Queijo Mineiro (6 un.)', sales: 53, revenue: 636.00 }
  ];

  const neighborhoodDeliveries = [
    { name: 'Centro', count: 184, percent: 45 },
    { name: 'Bairro São Cristóvão', count: 96, percent: 24 },
    { name: 'Jardim Alvorada', count: 72, percent: 18 },
    { name: 'Vila Operária', count: 54, percent: 13 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          Painel Analítico de Vendas & Engajamento Local
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Métricas de faturamento, horários de pico e fidelidade de moradores para a <strong>{activeMerchant.name}</strong>.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Faturamento */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Faturamento Total</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <DollarSign className="w-4 h-4 text-emerald-700" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            R$ {(totalRevenue + 3840.00).toFixed(2).replace('.', ',')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% este mês vs modelo tradicional</span>
          </div>
        </div>

        {/* Card 2: Ticket Médio */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Ticket Médio Local</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
              <ShoppingBag className="w-4 h-4 text-blue-700" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            R$ {averageTicket > 0 ? averageTicket.toFixed(2).replace('.', ',') : '28,90'}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Sem taxas predatórias de intermediação
          </div>
        </div>

        {/* Card 3: Clientes Recorrentes */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Retenção de Bairro</span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
              <Users className="w-4 h-4 text-purple-700" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">82.6%</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">
            Recompra incentivada por pontos
          </div>
        </div>

        {/* Card 4: Match Push Conversão */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Match Push Conv.</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Zap className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">41.8%</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Conversão das Ofertas Relâmpago
          </div>
        </div>
      </div>

      {/* Row 2: Horários de Pico na Cidade Pequena + Distribuição por Bairro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Horários de Pico */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Horários de Pico de Pedidos na Cidade
              </h3>
              <p className="text-xs text-slate-500">
                Padrão de consumo típico da nossa cidade (&lt; 30 mil hab)
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {peakHours.map(item => (
              <div key={item.hour} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{item.hour} • {item.label}</span>
                  <span className="text-emerald-700">{item.orders} pedidos</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendas por Bairro */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Volume de Entregas por Bairro
            </h3>
            <p className="text-xs text-slate-500">
              Onde seus clientes mais fiéis estão localizados
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {neighborhoodDeliveries.map(b => (
              <div key={b.name} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{b.name}</span>
                  <span>{b.count} entregas ({b.percent}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${b.percent * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Produtos Mais Vendidos */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Produtos Campeões de Venda da Loja
          </h3>
          <p className="text-xs text-slate-500">
            Itens mais solicitados pelos moradores no aplicativo
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {topProducts.map((p, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 font-black text-slate-700 flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900 text-sm">{p.name}</span>
              </div>

              <div className="flex items-center gap-4 text-right">
                <span className="text-slate-500 font-medium">{p.sales} un. vendidas</span>
                <span className="font-black text-emerald-700 text-sm">
                  R$ {p.revenue.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
