import React, { useState } from 'react';
import { MarketingPackage, Merchant } from '../../types';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  QrCode,
  CreditCard,
  CheckCircle,
  Clock,
  Sparkles,
  Copy,
  ShieldCheck,
  Zap,
  MessageCircle,
  AlertCircle,
  FileText,
  Lock,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface MarketingPackageCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: MarketingPackage | null;
  onSuccess: (packageId: string) => void;
}

export const MarketingPackageCheckoutModal: React.FC<MarketingPackageCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  onSuccess
}) => {
  const { activeMerchant, marketingAdvisor } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  // Card fields state
  const [cardHolder, setCardHolder] = useState(activeMerchant.ownerName || activeMerchant.name);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cpfCnpj, setCpfCnpj] = useState(activeMerchant.document || '00.000.000/0001-90');

  if (!isOpen || !selectedPackage) return null;

  const pixPayload = `00020126580014BR.GOV.BCB.PIX0136financeiro@radarlocal.com.br520400005303986540${selectedPackage.priceMonthly.toFixed(2)}5802BR5915RADAR LOCAL ASS6009JOAO NEIVA62190515PKG-${selectedPackage.id.toUpperCase()}6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessScreen(true);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
      onSuccess(selectedPackage.id);
    }, 1200);
  };

  const handleClose = () => {
    setShowSuccessScreen(false);
    onClose();
  };

  const openWhatsAppWithReceipt = () => {
    const cleanNumber = marketingAdvisor.whatsappNumber.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Olá ${marketingAdvisor.name}! Sou o lojista da *${activeMerchant.name}* em João Neiva.\n\n` +
      `Acabei de contratar o pacote *${selectedPackage.name}* (R$ ${selectedPackage.priceMonthly.toFixed(2)}/mês).\n` +
      `Gostaria de iniciar nossa assessoria de marketing digital e alinhar as artes publicitárias da minha loja!\n\n` +
      `Comprovante gerado no painel Radar Local. Aguardo seu contato!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Contratação de Mensalidade
            </span>
            <span className="text-xs text-indigo-300 font-bold">
              Radar Local • Equipe de Marketing
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {selectedPackage.name}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedPackage.tagline}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">
                {selectedPackage.originalPriceMonthly ? '🔥 Adesão Promocional' : 'Mensalidade'}
              </span>
              {selectedPackage.originalPriceMonthly && (
                <span className="text-[11px] line-through text-slate-400 block -mb-0.5">
                  De R$ {selectedPackage.originalPriceMonthly.toFixed(2).replace('.', ',')}
                </span>
              )}
              <div className="text-2xl font-black text-amber-400">
                R$ {selectedPackage.priceMonthly.toFixed(2).replace('.', ',')}
                <span className="text-xs text-slate-300 font-normal"> /mês</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {showSuccessScreen ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider">
                  ⚡ Serviço Liberado com Sucesso!
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Parabéns, {activeMerchant.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Seu pacote <strong>{selectedPackage.name}</strong> está ativo. As vagas de banner no topo do app já estão desbloqueadas.
                </p>
              </div>

              {/* Delivery Timeline Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-3">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Cronograma de Liberação do seu Serviço:</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-slate-900">Acesso ao Painel & Banners:</strong>
                      <span className="text-emerald-600 font-bold ml-1">Liberado Agora Imediatamente!</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-slate-900">Atendimento no WhatsApp:</strong>
                      <span className="text-slate-600 ml-1">Em até 2 a 5 minutos sua assessora ({marketingAdvisor.name}) iniciará o contato de boas-vindas.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      🎨
                    </span>
                    <div>
                      <strong className="text-slate-900">Criação da 1ª Arte Publicitária:</strong>
                      <span className="text-slate-600 ml-1">
                        Prazo de entrega em <strong>até {selectedPackage.tier === 'gold' ? '12 horas úteis' : '24 horas úteis'}</strong> pelo WhatsApp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={openWhatsAppWithReceipt}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Iniciar Atendimento no WhatsApp Agora</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all"
                >
                  Ir para Painel de Marketing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout selection & payment flow */
            <>
              {/* Service Release Time Indicator */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <span>Quanto tempo libera o serviço?</span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.2 rounded-full font-bold">
                      Liberação Imediata
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    • <strong>PIX e Cartão:</strong> Acesso ao painel e liberação dos banners acontecem no mesmo minuto.<br />
                    • <strong>WhatsApp:</strong> Contato com a equipe em minutos para alinhar as campanhas.<br />
                    • <strong>Entrega das artes:</strong> Em até <strong>{selectedPackage.tier === 'gold' ? '12h' : '24h úteis'}</strong> direto no seu celular.
                  </p>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                  Escolha como deseja pagar a mensalidade:
                </label>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black">PIX Instantâneo</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded-full">
                      Libera na Hora
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'border-indigo-500 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black">Cartão de Crédito</span>
                    <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 px-1.5 py-0.2 rounded-full">
                      Assinatura Mensal
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'boleto'
                        ? 'border-slate-900 bg-slate-50 text-slate-900 ring-2 ring-slate-900/30'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black">Boleto / Carnê</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Até 1 dia útil
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Tab Details */}
              {paymentMethod === 'pix' && (
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Simulated Dynamic QR Code */}
                    <div className="w-32 h-32 bg-white rounded-2xl p-2 border-2 border-slate-200 shadow-xs shrink-0 flex flex-col items-center justify-center text-center">
                      <div className="w-full h-full bg-slate-950 rounded-lg p-1.5 flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="text-xs font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>PIX Copia e Cola Oficial Radar Local</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Abra o app do seu banco, escolha <strong>Pagar via PIX</strong> e escaneie o código acima ou copie o código abaixo.
                      </p>

                      <div className="relative">
                        <input
                          type="text"
                          readOnly
                          value={pixPayload}
                          className="w-full text-[11px] bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-600 font-mono pr-24 outline-none truncate"
                        />
                        <button
                          type="button"
                          onClick={handleCopyPix}
                          className="absolute right-1 top-1 bottom-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPix ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Pagamento seguro com baixa automática via Webhook
                    </span>

                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      disabled={isProcessing}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Confirmando PIX no Banco...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Já Paguei / Liberar Acesso Agora</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nome Impresso no Cartão
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Ex: CARLOS E SILVA"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-mono outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Validade
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-mono outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-mono outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        CPF ou CNPJ do Titular
                      </label>
                      <input
                        type="text"
                        value={cpfCnpj}
                        onChange={(e) => setCpfCnpj(e.target.value)}
                        placeholder="000.000.000-00 ou 00.000.000/0001-00"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-indigo-600" />
                      Criptografia de ponta a ponta (PCI-DSS)
                    </span>

                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      disabled={isProcessing}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processando Cartão...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Assinar R$ {selectedPackage.priceMonthly.toFixed(2)}/mês</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">
                        Boleto Bancário Registrado
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Vencimento para 3 dias úteis. Compensação em até 24h a 48h.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                    💡 <strong>Dica para liberação imediata:</strong> Após pagar o boleto, você pode enviar o comprovante no WhatsApp da assessora {marketingAdvisor.name} para liberação antecipada sem esperar a compensação bancária!
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Gerar Boleto & Enviar Comprovante</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Package Summary Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <div className="text-xs font-black text-indigo-950 flex items-center justify-between">
                  <span>Resumo dos Benefícios Inclusos:</span>
                  <span className="text-emerald-700 font-extrabold">{selectedPackage.bannerSlotsCount} banner(s) no app</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-indigo-900">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{selectedPackage.customArtsCount} artes publicitárias/mês</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Assessora dedicada no WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sem comissão por venda efetuada</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cancele quando quiser sem multa</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
