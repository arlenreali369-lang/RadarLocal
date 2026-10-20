import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  QrCode,
  CreditCard,
  Banknote,
  Copy,
  CheckCircle,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const {
    cart,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    selectedNeighborhood,
    city,
    placeOrder
  } = useApp();

  const [customerName, setCustomerName] = useState('Mariana Duarte');
  const [customerPhone, setCustomerPhone] = useState('(19) 99123-4567');
  const [customerAddress, setCustomerAddress] = useState('Rua das Camélias, 142 - Apto 3');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [notes, setNotes] = useState('');
  const [cashChange, setCashChange] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || cart.length === 0) return null;

  const mockPixPayload = `00020126580014BR.GOV.BCB.PIX0136pix@radarlocal.com.br520400005303986540${cartTotal.toFixed(2)}5802BR5915RADAR LOCAL LOJA6009SAO BENTO62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixPayload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleFinishOrder = (simulatedInstantPix = false) => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName,
        customerPhone,
        customerAddress,
        neighborhood: selectedNeighborhood,
        paymentMethod,
        notes: notes + (cashChange ? ` (Precisa de troco para R$ ${cashChange})` : '')
      });

      // Joyful Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setIsProcessing(false);
      onClose();
      onOrderSuccess(order.id);
    }, simulatedInstantPix ? 800 : 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Finalizar Pedido Local</h3>
              <p className="text-xs text-slate-500">Negociação segura e direta com o comércio do bairro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Delivery destination */}
          <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Entrega no seu Bairro
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Taxa: R$ {cartDeliveryFee.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Seu Nome:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg bg-white border border-slate-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Telefone / WhatsApp:</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg bg-white border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Bairro ({city.name}):</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedNeighborhood}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-100 border border-slate-200 font-medium text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600">Endereço Completo & Complemento:</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Rua, número, apto ou ponto de referência"
                  className="w-full mt-1 p-2 rounded-lg bg-white border border-slate-200 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Forma de Pagamento (Transparência Total):
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'pix'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-600" />
                <span className="text-xs">Pix Instantâneo</span>
                <span className="text-[9px] text-emerald-600 font-semibold">Aprovação imediata</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'credit_card'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <span className="text-xs">Cartão no App</span>
                <span className="text-[9px] text-slate-500 font-semibold">Crédito ou Débito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'cash'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span className="text-xs">Pagar na Entrega</span>
                <span className="text-[9px] text-slate-500 font-semibold">Maquininha/Dinheiro</span>
              </button>
            </div>
          </div>

          {/* Payment Specific Details */}
          {paymentMethod === 'pix' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                  <path
                    fill="currentColor"
                    d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M22,22 h6 v6 h-6 z M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M72,22 h6 v6 h-6 z M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M22,72 h6 v6 h-6 z M45,10 h10 v20 h-10 z M45,45 h10 v10 h-10 z M60,45 h20 v10 h-20 z M45,60 h10 v30 h-10 z M65,65 h10 v10 h-10 z M80,60 h10 v20 h-10 z M65,80 h25 v10 h-25 z"
                  />
                </svg>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedPix ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Código Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copiar Chave Pix Copia e Cola</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 mt-2">
                Pague pelo app do seu banco ou use a simulação abaixo para testar instantaneamente:
              </p>

              <button
                type="button"
                onClick={() => handleFinishOrder(true)}
                disabled={isProcessing}
                className="mt-3 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Simular Pagamento Pix Instantâneo (Baixa Automática)</span>
              </button>
            </div>
          )}

          {paymentMethod === 'credit_card' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-medium text-slate-600 flex items-center justify-between">
                <span>Cartão de Crédito sem juros para a cidade</span>
                <span className="text-[10px] text-emerald-600 font-bold">Transação Criptografada</span>
              </div>
              <input
                type="text"
                placeholder="Número do Cartão (Ex: 4532 9988 7766 1234)"
                defaultValue="•••• •••• •••• 4821"
                className="w-full text-xs p-2.5 rounded-lg bg-white border border-slate-200"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Validade (MM/AA)"
                  defaultValue="11/29"
                  className="w-full text-xs p-2.5 rounded-lg bg-white border border-slate-200"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  defaultValue="321"
                  className="w-full text-xs p-2.5 rounded-lg bg-white border border-slate-200"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'cash' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Precisa de troco? Digite o valor em dinheiro:
              </label>
              <input
                type="text"
                value={cashChange}
                onChange={(e) => setCashChange(e.target.value)}
                placeholder="Ex: 50,00 ou deixe em branco se não precisar"
                className="w-full text-xs p-2.5 rounded-lg bg-white border border-slate-200"
              />
            </div>
          )}

          {/* Observações adicionais */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Instruções de Entrega / Ponto de Referência:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Portão preto ao lado da padaria, bater palma..."
              className="w-full text-xs p-2.5 rounded-lg bg-white border border-slate-200"
            />
          </div>

          {/* Summary */}
          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal dos produtos</span>
              <span className="font-semibold text-slate-800">
                R$ {cartSubtotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Entrega ({selectedNeighborhood})</span>
              <span className="font-semibold text-slate-800">
                R$ {cartDeliveryFee.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total a pagar</span>
              <span className="text-emerald-700">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={() => handleFinishOrder(false)}
            disabled={isProcessing}
            className="flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </span>
            ) : (
              <>
                <span>Confirmar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
