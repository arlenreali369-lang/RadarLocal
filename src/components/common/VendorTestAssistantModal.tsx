import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ADMIN_EMAIL_RECIPIENT,
  getEmailDispatchLogs,
  sendMerchantRegistrationEmail,
  EmailDispatchLog
} from '../../utils/merchantNotification';
import confetti from 'canvas-confetti';
import {
  FlaskConical,
  X,
  CheckCircle2,
  Send,
  Store,
  Wrench,
  Pizza,
  ArrowRight,
  ShieldCheck,
  Mail,
  Phone,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Eye,
  Check
} from 'lucide-react';

interface VendorTestAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VendorTestAssistantModal: React.FC<VendorTestAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    city,
    registerMerchantLead,
    setUserRole,
    openMerchantOnboarding,
    openMerchantShowroom,
    registerMerchant
  } = useApp();

  const [logs, setLogs] = useState<EmailDispatchLog[]>([]);
  const [isExecutingTest, setIsExecutingTest] = useState(false);
  const [lastTestedLead, setLastTestedLead] = useState<{
    name: string;
    store: string;
    phone: string;
    type: string;
  } | null>(null);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLogs(getEmailDispatchLogs());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const runQuickTest = async (preset: {
    ownerName: string;
    phone: string;
    storeName: string;
    businessType: string;
    neighborhood: string;
    category: string;
  }) => {
    setIsExecutingTest(true);
    setSuccessFeedback(null);

    // 1. Register as lead in context & dispatch email to arlenreali369@gmail.com
    registerMerchantLead({
      storeName: preset.storeName,
      ownerName: preset.ownerName,
      businessType: preset.businessType,
      phone: preset.phone,
      email: 'teste@radarlocal.com.br',
      neighborhood: preset.neighborhood,
      address: `${preset.neighborhood}, ${city.name} - ${city.state}`,
      primaryProducts: 'Itens de demonstração para teste comercial',
      deliveryType: 'radar_network',
      preferredContactTime: 'morning'
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {}

    setLastTestedLead({
      name: preset.ownerName,
      store: preset.storeName,
      phone: preset.phone,
      type: preset.businessType
    });

    setSuccessFeedback(
      `Vendedor "${preset.storeName}" cadastrado com sucesso! Notificação enviada para ${ADMIN_EMAIL_RECIPIENT}.`
    );

    // Refresh logs after dispatch
    setTimeout(() => {
      setLogs(getEmailDispatchLogs());
      setIsExecutingTest(false);
    }, 600);
  };

  const handleActivateStoreNow = () => {
    if (!lastTestedLead) return;

    registerMerchant(
      {
        name: lastTestedLead.store,
        ownerName: lastTestedLead.name,
        phone: lastTestedLead.phone,
        category: lastTestedLead.type.includes('Serviço') ? 'Serviços & Manutenção' : 'Mercearias & Mercados',
        neighborhood: 'Centro',
        description: `Estabelecimento cadastrado via Teste de Vendedor no Radar Local de ${city.name}.`,
        isOpen: true,
        acceptsPix: true
      },
      [
        {
          name: 'Produto/Serviço Modelo 01',
          price: 18.5,
          description: 'Item de teste configurado para validação do fluxo de pedidos.'
        },
        {
          name: 'Produto/Serviço Modelo 02',
          price: 32.0,
          description: 'Item de teste secundário para validação do carrinho e cashback.'
        }
      ]
    );

    onClose();
    setUserRole('customer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-start justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Ambiente de Testes do Vendedor
                </span>
                <span className="text-xs text-slate-400">Polo {city.name}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Simulador & Teste de Cadastro de Vendedor
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-xs">
          {/* Target Parameters Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                E-mail Notificado:
              </span>
              <strong className="text-indigo-900 font-mono text-[11px] block truncate">
                {ADMIN_EMAIL_RECIPIENT}
              </strong>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Valor de Adesão:
              </span>
              <strong className="text-emerald-700 font-extrabold text-xs block">
                R$ 42,00 / mês (Promocional)
              </strong>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Cidade Polo:
              </span>
              <strong className="text-slate-800 font-extrabold text-xs block">
                {city.name} - {city.state}
              </strong>
            </div>
          </div>

          {/* Feedback banner if a test just ran */}
          {successFeedback && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-in zoom-in-95">
              <div className="flex items-center gap-2 font-black text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Cadastro de Teste Executado com Sucesso!</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {successFeedback}
              </p>

              {lastTestedLead && (
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-[11px] space-y-1 font-mono">
                  <div><strong>Estabelecimento:</strong> {lastTestedLead.store}</div>
                  <div><strong>Responsável:</strong> {lastTestedLead.name}</div>
                  <div><strong>WhatsApp:</strong> {lastTestedLead.phone}</div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    onClose();
                    setUserRole('admin');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ver na Área do Administrador</span>
                </button>

                <button
                  onClick={handleActivateStoreNow}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Store className="w-4 h-4" />
                  <span>Publicar Loja na Vitrine de João Neiva</span>
                </button>
              </div>
            </div>
          )}

          {/* 3 Quick-Test Scenarios */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>⚡ Teste em 1 Clique (Escolha um Perfil de Teste):</span>
              </h3>
              <span className="text-[10px] text-slate-500">Dados reais de João Neiva</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Preset 1 */}
              <button
                type="button"
                disabled={isExecutingTest}
                onClick={() =>
                  runQuickTest({
                    ownerName: 'Carlos Eduardo Reali',
                    phone: '(27) 99899-1530',
                    storeName: 'Padaria & Confeitaria Central',
                    businessType: 'Comércio: Padarias & Cafés',
                    category: 'Padarias & Cafés',
                    neighborhood: 'Centro'
                  })
                }
                className="p-3.5 rounded-2xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100/80 text-left transition-all space-y-1.5 hover:shadow-sm cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">🥖</span>
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200/80 px-1.5 py-0.5 rounded">
                    Comércio
                  </span>
                </div>
                <div className="font-extrabold text-slate-900 text-xs">Padaria Central</div>
                <div className="text-[11px] text-slate-600">Carlos Eduardo • (27) 99899-1530</div>
                <div className="text-[10px] text-amber-700 font-bold pt-1 flex items-center gap-1">
                  <span>Testar Cadastro</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

              {/* Preset 2 */}
              <button
                type="button"
                disabled={isExecutingTest}
                onClick={() =>
                  runQuickTest({
                    ownerName: 'Marcos Silva',
                    phone: '(27) 99755-1234',
                    storeName: 'Silva Eletricista & Manutenção',
                    businessType: 'Serviços: Serviços & Manutenção',
                    category: 'Serviços & Manutenção',
                    neighborhood: 'Triunfo'
                  })
                }
                className="p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 text-left transition-all space-y-1.5 hover:shadow-sm cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">🛠️</span>
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200/80 px-1.5 py-0.5 rounded">
                    Serviço
                  </span>
                </div>
                <div className="font-extrabold text-slate-900 text-xs">Silva Eletricista</div>
                <div className="text-[11px] text-slate-600">Marcos Silva • (27) 99755-1234</div>
                <div className="text-[10px] text-emerald-700 font-bold pt-1 flex items-center gap-1">
                  <span>Testar Cadastro</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>

              {/* Preset 3 */}
              <button
                type="button"
                disabled={isExecutingTest}
                onClick={() =>
                  runQuickTest({
                    ownerName: 'Amanda Rocha',
                    phone: '(27) 99654-7890',
                    storeName: 'Pizzaria & Lanches do Vale',
                    businessType: 'Comércio: Lanches & Pizzas',
                    category: 'Lanches & Pizzas',
                    neighborhood: 'Vila Nova'
                  })
                }
                className="p-3.5 rounded-2xl border border-orange-300 bg-orange-50/70 hover:bg-orange-100/80 text-left transition-all space-y-1.5 hover:shadow-sm cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">🍕</span>
                  <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-200/80 px-1.5 py-0.5 rounded">
                    Delivery
                  </span>
                </div>
                <div className="font-extrabold text-slate-900 text-xs">Pizzaria do Vale</div>
                <div className="text-[11px] text-slate-600">Amanda Rocha • (27) 99654-7890</div>
                <div className="text-[10px] text-orange-700 font-bold pt-1 flex items-center gap-1">
                  <span>Testar Cadastro</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            </div>
          </div>

          {/* Test Steps Guide */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <h4 className="font-black text-indigo-950 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>O que Acontece Durante o Teste:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-indigo-900 leading-relaxed font-normal">
              <li>
                <strong>Gravação do Lead:</strong> O vendedor é registrado com status <em>"Aguardando Contato"</em>.
              </li>
              <li>
                <strong>Disparo de Notificação:</strong> Um e-mail com a tabela estruturada de dados é transmitido para <strong>{ADMIN_EMAIL_RECIPIENT}</strong>.
              </li>
              <li>
                <strong>Visualização no Painel Admin:</strong> O administrador pode alterar status, salvar anotações e testar o contato do agente via WhatsApp com 1 toque.
              </li>
              <li>
                <strong>Publicação da Loja:</strong> É possível homologar a loja para receber pedidos reais no app.
              </li>
            </ol>
          </div>

          {/* Recent Dispatches Log Table */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Histórico de E-mails Enviados para {ADMIN_EMAIL_RECIPIENT}:</span>
              </h4>
              <button
                onClick={() => setLogs(getEmailDispatchLogs())}
                className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Atualizar Logs</span>
              </button>
            </div>

            {logs.length === 0 ? (
              <p className="text-slate-400 italic text-[11px] p-3 bg-slate-50 rounded-xl text-center">
                Nenhum e-mail registrado nesta sessão ainda. Execute um teste acima para visualizar o disparo!
              </p>
            ) : (
              <div className="max-h-40 overflow-y-auto space-y-1.5">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]"
                  >
                    <div>
                      <strong className="text-slate-800 block">
                        {log.payload.storeName} ({log.payload.ownerName})
                      </strong>
                      <span className="text-slate-500 text-[10px]">
                        WhatsApp: {log.payload.phone} • {log.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Enviado</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                setUserRole('admin');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ir para Área do Administrador</span>
            </button>

            <button
              onClick={() => {
                onClose();
                openMerchantOnboarding();
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>Testar Cadastro Completo Passo a Passo</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
