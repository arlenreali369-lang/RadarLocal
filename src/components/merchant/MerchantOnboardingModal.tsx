import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Merchant, Product } from '../../types';
import confetti from 'canvas-confetti';
import {
  Store,
  Sparkles,
  Zap,
  TrendingUp,
  MapPin,
  Gift,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Phone,
  Mail,
  FileText,
  DollarSign,
  Bike,
  ShieldCheck,
  BookOpen,
  Info,
  Clock,
  Plus,
  Trash2,
  Send,
  HelpCircle
} from 'lucide-react';

interface StarterProductInput {
  name: string;
  price: number;
  description: string;
}

const CATEGORY_TEMPLATES: Record<string, { banner: string; avatar: string; perks: string; starterProducts: StarterProductInput[] }> = {
  'Padarias & Cafés': {
    avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80',
    perks: 'Ganhe 1 Pão Doce na compra de 10 Pães Franceses',
    starterProducts: [
      { name: 'Pão Francês Quentinho (Pacote com 6 un)', price: 6.50, description: 'Fornadas saindo a cada hora no bairro' },
      { name: 'Bolo Caseiro de Fubá com Goiabada', price: 16.00, description: 'Receita tradicional da vovó, macio e fresquinho' },
      { name: 'Café Especial Torrado na Serra (500g)', price: 22.00, description: 'Grãos 100% arábica das montanhas capixabas' }
    ]
  },
  'Lanches & Pizzas': {
    avatar: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    perks: 'Refrigerante grátis a partir da 3ª pizza pedida no mês',
    starterProducts: [
      { name: 'Pizza Grande Especial (Calabresa com Catupiry)', price: 44.90, description: 'Massa artesanal assada em forno de pedra' },
      { name: 'X-Tudo Artesanal Neivense', price: 23.50, description: 'Hambúrguer 160g, bacon crocante, ovo, queijo e maionese verde da casa' },
      { name: 'Porção de Batata Frita com Cheddar e Bacon', price: 26.00, description: 'Batata sequinha e crocante para compartilhar' }
    ]
  },
  'Mercearias & Mercados': {
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=80',
    perks: '5% de desconto acumulado em compras acima de R$ 60',
    starterProducts: [
      { name: 'Cesta Hortifruti da Semana (Frutas & Legumes)', price: 29.90, description: 'Produtos frescos colhidos nos sítios da região' },
      { name: 'Queijo Minas Frescal Artesanal (Peça 500g)', price: 21.00, description: 'Produção regional com leite puro da roça' },
      { name: 'Café Extra Forte Moído (500g)', price: 17.50, description: 'Embalagem a vácuo com aroma inconfundível' }
    ]
  },
  'Farmácias & Saúde': {
    avatar: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop&q=80',
    perks: 'Entrega grátis para medicamentos de uso contínuo',
    starterProducts: [
      { name: 'Kit Higiene Pessoal & Proteção Familiar', price: 24.90, description: 'Sabonete líquido, álcool 70% e lenços antissépticos' },
      { name: 'Vitamina C + Zinco Efervescente (10 comp)', price: 18.00, description: 'Fortalecimento do sistema imunológico' },
      { name: 'Termômetro Digital com Alarme Sonoro', price: 22.50, description: 'Medição precisa e rápida para crianças e adultos' }
    ]
  },
  'Açougues & Carnes': {
    avatar: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    perks: 'Farofa temperada artesanal grátis em compras acima de R$ 70',
    starterProducts: [
      { name: 'Kit Churrasco Fim de Semana (Picanha + Linguiça 2kg)', price: 89.90, description: 'Cortes selecionados e inspecionados para churrasco perfeito' },
      { name: 'Carne Moída Especial de Primeira (1kg)', price: 34.00, description: 'Moída na hora, sem gordura excessiva' },
      { name: 'Peito de Frango em Filés Congelados (1kg)', price: 21.00, description: 'Filés limpos e soltinhos para o dia a dia' }
    ]
  },
  'Pet Shop & Agro': {
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80',
    perks: 'Brinquedo ou sachê brinde no 3º saco de ração',
    starterProducts: [
      { name: 'Ração Premium para Cães Adultos (Saco 15kg)', price: 119.00, description: 'Nutrição completa, rica em proteínas e vitaminas' },
      { name: 'Antipulgas e Carrapatos em Comprimido Mastigável', price: 48.00, description: 'Proteção garantida por 30 dias para cães até 10kg' },
      { name: 'Shampoo Neutro para Cães e Gatos (500ml)', price: 18.50, description: 'Pêlos macios, brilhantes e cheirosos' }
    ]
  },
  'Outros / Serviços': {
    avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
    perks: 'Brinde exclusivo no programa de fidelidade local',
    starterProducts: [
      { name: 'Item Especial em Destaque', price: 35.00, description: 'Produto ou serviço de alta qualidade em João Neiva' },
      { name: 'Promoção do Dia no Radar', price: 20.00, description: 'Condição exclusiva para moradores da cidade' }
    ]
  }
};

export const MerchantOnboardingModal: React.FC = () => {
  const {
    isMerchantOnboardingOpen,
    setIsMerchantOnboardingOpen,
    city,
    registerMerchant,
    sendMatchPush
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('(27) 99');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [category, setCategory] = useState('Padarias & Cafés');
  const [neighborhood, setNeighborhood] = useState(city.neighborhoods[0] || 'Centro');
  const [address, setAddress] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [deliveryType, setDeliveryType] = useState<'own_courier' | 'radar_network' | 'pickup' | 'all'>('all');
  const [description, setDescription] = useState('');
  const [exclusivePerk, setExclusivePerk] = useState('Bônus de 1.5x no Clube Radar de Fidelidade');

  // Starter Products
  const [starterProducts, setStarterProducts] = useState<StarterProductInput[]>(
    CATEGORY_TEMPLATES['Padarias & Cafés'].starterProducts
  );

  // Status after registration
  const [createdMerchant, setCreatedMerchant] = useState<Merchant | null>(null);

  if (!isMerchantOnboardingOpen) return null;

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const template = CATEGORY_TEMPLATES[newCat] || CATEGORY_TEMPLATES['Outros / Serviços'];
    setStarterProducts(template.starterProducts);
    setExclusivePerk(template.perks);
  };

  const handleUpdateProduct = (index: number, field: keyof StarterProductInput, value: string | number) => {
    setStarterProducts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddProduct = () => {
    setStarterProducts(prev => [
      ...prev,
      { name: 'Novo Produto', price: 15.00, description: 'Descrição breve para os clientes' }
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (starterProducts.length <= 1) return;
    setStarterProducts(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      alert('Por favor, informe o nome da sua loja.');
      return;
    }

    const template = CATEGORY_TEMPLATES[category] || CATEGORY_TEMPLATES['Outros / Serviços'];

    const newMerchant = registerMerchant(
      {
        name: storeName.trim(),
        ownerName: ownerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        document: document.trim(),
        category,
        neighborhood,
        address: address.trim() || `${neighborhood}, João Neiva - ES`,
        pixKey: pixKey.trim(),
        deliveryType,
        description: description.trim() || `Comércio tradicional de ${category.toLowerCase()} em João Neiva. Atendimento atencioso e produtos de qualidade.`,
        exclusivePerk: exclusivePerk.trim(),
        avatar: template.avatar,
        banner: template.banner,
        deliveryTime: '15-25 min',
        minOrder: 10.00
      },
      starterProducts.map(p => ({
        name: p.name,
        price: Number(p.price) || 10,
        description: p.description,
        pointsReward: Math.round((Number(p.price) || 10) * 1.5)
      }))
    );

    setCreatedMerchant(newMerchant);
    setStep(4);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}

    // Send confirmation Push
    sendMatchPush({
      targetRole: 'merchant',
      type: 'system',
      title: '🏪 Loja Credenciada com Sucesso!',
      message: `Parabéns ${ownerName || storeName}! Seu estabelecimento já está no ar em João Neiva.`,
      priority: 'high',
      relatedMerchantId: newMerchant.id
    });
  };

  const closeAndEnterDashboard = () => {
    setIsMerchantOnboardingOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20 shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Credenciamento de Lojistas
                </span>
                <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {city.name} - {city.state} (&lt; 30 mil hab.)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {step === 1 && 'Como Funciona a Dinâmica do Radar Local'}
                {step === 2 && 'Cadastro do Seu Estabelecimento'}
                {step === 3 && 'Produtos Iniciais & Vitrine do Bairro'}
                {step === 4 && '🎉 Cadastro Concluído com Sucesso!'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
                {step === 1 && 'Entenda como o aplicativo conecta seu comércio aos moradores locais com entregas rápidas, pedidos em tempo real e fidelidade.'}
                {step === 2 && 'Preencha os dados básicos da sua loja para receber pedidos, clientes e o manual de desenvolvimento no seu e-mail.'}
                {step === 3 && 'Configure de 2 a 3 produtos sugeridos para sua loja já nascer pronta para receber pedidos hoje mesmo.'}
                {step === 4 && 'Sua loja já está ativa no Radar Local de João Neiva! Receba os pedidos pelo painel e atraia a vizinhança.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMerchantOnboardingOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors shrink-0"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold overflow-x-auto gap-2">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              step === 1
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              1
            </span>
            <span>A Dinâmica do App</span>
          </button>

          <span className="text-slate-300">→</span>

          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              step === 2
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              2
            </span>
            <span>Dados da Loja</span>
          </button>

          <span className="text-slate-300">→</span>

          <button
            onClick={() => {
              if (!storeName.trim()) {
                alert('Por favor, informe o nome da sua loja no Passo 2.');
                return;
              }
              setStep(3);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              step === 3
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              3
            </span>
            <span>Produtos Iniciais</span>
          </button>

          <span className="text-slate-300">→</span>

          <button
            disabled={!createdMerchant}
            onClick={() => createdMerchant && setStep(4)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              step === 4
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                : 'text-slate-400 cursor-not-allowed'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              4
            </span>
            <span>Ativação & Manual</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* STEP 1: A DINÂMICA DO APLICATIVO */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Context Pill */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <p className="font-extrabold text-sm mb-1">
                    Feito para Cidades com Menos de 30 mil Habitantes (Início em João Neiva - ES)
                  </p>
                  <p className="text-emerald-800 leading-relaxed">
                    Diferente dos aplicativos convencionais das capitais que cobram até 27% de comissão e escondem sua loja atrás de grandes redes, o <strong>Radar Local</strong> valoriza o comércio do seu bairro com negociações transparentes, entrega por motoboys locais e Pix direto sem intermediários abusivos.
                  </p>
                </div>
              </div>

              {/* 5 Pilares da Dinâmica */}
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Os 5 Pilares de Sucesso no Radar Local
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pilar 1 */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Vitrine 100% de Bairro</h4>
                      <p className="text-[11px] text-slate-500">Sem algoritmos que cobram para exibir você</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sua loja aparece organizada por bairro (Centro, Vila Nova, Cohab, Acioli...). Os moradores abrem o app e veem seus produtos, telefone, endereço e promoções com fotos de alta qualidade.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm">
                      ⚡
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">O Diferencial "Match Push"</h4>
                      <p className="text-[11px] text-amber-700 font-bold">Notificação relâmpago no bolso do cliente</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sobrou mercadoria fresca ou o movimento caiu? Crie uma <strong>Oferta Relâmpago</strong> com desconto ou pontuação em dobro e dispare um Match Push. O celular dos clientes da cidade apita com o alerta da sua loja!
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
                      🎁
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Fidelidade Gamificada</h4>
                      <p className="text-[11px] text-purple-700 font-bold">Clientes voltam a comprar toda semana</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cada compra gera pontos para o morador. Eles giram a roleta diária e trocam pontos por brindes e cupons da sua loja, criando o hábito de comprar no comércio local em vez de sites de fora.
                  </p>
                </div>

                {/* Pilar 4 */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                      📋
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Kanban ao Vivo & Chat Direto</h4>
                      <p className="text-[11px] text-slate-500">Gestão visual e sem mensagens perdidas</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Quando o cliente faz o pedido, o painel toca um aviso sonoro. Você aceita com 1 toque, avança para 'Em Preparo' e despacha. O chat integrado permite tirar dúvidas urgentes e personalizar pedidos.
                  </p>
                </div>

                {/* Pilar 5 */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:col-span-2 hover:border-emerald-300 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-black text-sm">
                      🛵
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Logística Otimizada & Pagamento Transparente</h4>
                      <p className="text-[11px] text-cyan-800 font-bold">Taxas justas por bairro e Pix direto para o lojista</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    As taxas são pré-definidas para cada canto da cidade (R$ 3 a R$ 4 no Centro e Vila Nova, até R$ 7,50 em Acioli). Você pode usar entregador próprio ou conectar os motoboys parceiros cadastrados. Os pagamentos via Pix vão direto para você!
                  </p>
                </div>
              </div>

              {/* Botão para o Passo 2 */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <span className="text-xs text-slate-500">
                  Pronto para fazer parte do comércio de João Neiva?
                </span>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Cadastrar Minha Loja Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FORMULÁRIO DE CADASTRO DO LOJISTA */}
          {step === 2 && (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!storeName.trim()) {
                alert('Informe o nome da sua loja.');
                return;
              }
              setStep(3);
            }} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome da Loja */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nome Fantasia da Loja / Estabelecimento *
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Padaria Central de João Neiva, Hamburgueria do Vale..."
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-semibold"
                    />
                  </div>
                </div>

                {/* Nome do Responsável */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nome do Proprietário ou Gerente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Eduardo / Maria José"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Ramo de Atuação / Categoria *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white font-medium"
                  >
                    {Object.keys(CATEGORY_TEMPLATES).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* WhatsApp Comercial */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    WhatsApp Comercial (com DDD 27) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="(27) 99876-5432"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Usado para confirmações de pedidos e contato com clientes
                  </span>
                </div>

                {/* E-mail para Manuais */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    E-mail do Lojista (Receberá o Manual de Operação) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="lojista@exemplo.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
                    O Manual oficial com estratégias de venda será enviado aqui!
                  </span>
                </div>

                {/* CNPJ ou CPF / MEI */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    CNPJ ou CPF (MEI / Produtor Familiar)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="00.000.000/0001-00 ou CPF"
                      value={document}
                      onChange={(e) => setDocument(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Autônomos e pequenos produtores de feira são muito bem-vindos!
                  </span>
                </div>

                {/* Bairro Sede */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Bairro de João Neiva onde fica a loja *
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white font-semibold"
                  >
                    {city.neighborhoods.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Endereço Físico */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Endereço Completo & Ponto de Referência
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Av. Presidente Vargas, 140 - Próximo à praça central"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Chave Pix para Recebimento */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Chave Pix da Loja (Para Receber Pagamentos)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Chave CNPJ, celular, e-mail ou aleatória"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Os clientes pagam direto no seu Pix no ato da entrega ou retirada
                  </span>
                </div>

                {/* Tipo de Entrega */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Como fará as entregas?
                  </label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white font-medium"
                  >
                    <option value="all">Todas as opções (Entregador próprio + Rede Radar + Retirada)</option>
                    <option value="radar_network">Utilizar a rede de motoboys do Radar Local</option>
                    <option value="own_courier">Possuo entregador próprio da loja</option>
                    <option value="pickup">Somente Retirada no Balcão</option>
                  </select>
                </div>

                {/* Brinde / Benefício do Clube de Fidelidade */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                    <span>Benefício Exclusivo para o Clube de Fidelidade de João Neiva</span>
                    <span className="text-[10px] text-purple-700 font-black">Atrai clientes fiéis</span>
                  </label>
                  <div className="relative">
                    <Gift className="w-4 h-4 text-purple-600 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Ex: 10% de desconto na 5ª compra, Brinde especial aos 100 pontos..."
                      value={exclusivePerk}
                      onChange={(e) => setExclusivePerk(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-hidden font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar para Dinâmica</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Avançar para Produtos Iniciais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PRODUTOS INICIAIS & VITRINE EXPRESS */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <p className="font-extrabold text-sm mb-0.5">
                    Sugestão de Cardápio Inicial para "{category}"
                  </p>
                  <p className="text-amber-800 leading-relaxed">
                    Personalize os preços e nomes dos produtos abaixo. Eles já ficarão visíveis para os moradores de João Neiva assim que seu cadastro for concluído! Você poderá adicionar mais produtos a qualquer momento no seu painel.
                  </p>
                </div>
              </div>

              {/* Lista de Produtos Sugeridos */}
              <div className="space-y-3">
                {starterProducts.map((prod, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 relative group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Produto #{idx + 1}
                      </span>
                      {starterProducts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remover produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Nome do Produto *
                        </label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => handleUpdateProduct(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Preço de Venda (R$) *
                        </label>
                        <input
                          type="number"
                          step="0.50"
                          value={prod.price}
                          onChange={(e) => handleUpdateProduct(idx, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-bold text-emerald-700 font-mono"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Descrição Rápida para o Cliente
                        </label>
                        <input
                          type="text"
                          value={prod.description}
                          onChange={(e) => handleUpdateProduct(idx, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de Adicionar mais um produto */}
              <button
                type="button"
                onClick={handleAddProduct}
                className="w-full py-2.5 rounded-xl border border-dashed border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Mais um Produto à Vitrine</span>
              </button>

              {/* Botões de Ação */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar aos Dados</span>
                </button>

                <button
                  type="button"
                  onClick={handleCompleteRegistration}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Concluir Cadastro & Ativar Loja</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ATIVAÇÃO CONCLUÍDA & MANUAL ENVIADO */}
          {step === 4 && createdMerchant && (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Credenciamento Homologado em João Neiva - ES
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {createdMerchant.name} está no Radar Local!
                </h3>
                <p className="text-xs text-slate-600 max-w-lg mx-auto mt-1 leading-relaxed">
                  Seu estabelecimento no bairro <strong>{createdMerchant.neighborhood}</strong> já foi incluído na vitrine oficial da cidade. Um alerta Match Push foi disparado para avisar os clientes!
                </p>
              </div>

              {/* Resumo do Negócio */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500">Responsável:</span>
                  <span className="text-xs font-bold text-slate-800">{createdMerchant.ownerName || 'Lojista Local'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500">WhatsApp:</span>
                  <span className="text-xs font-bold text-slate-800 font-mono">{createdMerchant.phone}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500">Chave Pix:</span>
                  <span className="text-xs font-bold text-emerald-700 font-mono">{createdMerchant.pixKey || 'Cadastrada no app'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500">Produtos Iniciais Ativos:</span>
                  <span className="text-xs font-bold text-slate-800">{starterProducts.length} itens cadastrados</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Manual de Operação:</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Enviado para {email || 'seu e-mail'}
                  </span>
                </div>
              </div>

              {/* Dica de Primeiro Pedido */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 max-w-lg mx-auto text-left flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <p className="font-extrabold mb-0.5">Dica de Ouro para os Primeiros Pedidos:</p>
                  <p className="text-amber-800 leading-relaxed">
                    Acesse seu painel agora, clique em <strong>"Promoções & Push"</strong> e anuncie sua primeira <strong>Oferta Relâmpago de Inauguração</strong> com 15% de desconto para atrair a primeira onda de compradores de João Neiva!
                  </p>
                </div>
              </div>

              {/* Botão de Entrada Direta */}
              <div className="pt-2">
                <button
                  onClick={closeAndEnterDashboard}
                  className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-xl transition-all flex items-center gap-2 mx-auto"
                >
                  <Store className="w-4 h-4 text-amber-400" />
                  <span>Acessar Meu Painel de Vendas Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
