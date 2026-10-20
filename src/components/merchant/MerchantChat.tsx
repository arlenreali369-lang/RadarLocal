import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, Send, User, CheckCheck, Clock } from 'lucide-react';

export const MerchantChat: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    activeMerchant
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('Mariana Duarte');

  const customerMessages = chatMessages.filter(
    m => m.merchantId === activeMerchant.id && m.customerName === selectedCustomer
  );

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    sendChatMessage(
      activeMerchant.id,
      text.trim(),
      'merchant',
      selectedCustomer
    );

    if (!textToSend) {
      setInputMessage('');
    }
  };

  const merchantShortcuts = [
    '🥖 Pão francês quentinho acabou de sair do forno!',
    '🛵 O Tiago motoboy já pegou sua encomenda e está a caminho!',
    '✅ Pedido recebido e confirmado com sucesso!',
    '💵 Precisa que mande troco para algum valor específico?'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[76vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <User className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">{selectedCustomer}</h3>
              <p className="text-xs text-slate-500">Cliente Recorrente do Centro • Morador Prata</p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            Chat Direto Ativo
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {customerMessages.map(msg => {
            const isMerchant = msg.sender === 'merchant';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMerchant ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-md rounded-2xl p-3.5 shadow-xs text-xs leading-relaxed ${
                    isMerchant
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isMerchant ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMerchant && <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast shortcuts for merchant */}
        <div className="p-2 border-t border-slate-100 bg-white flex gap-1.5 overflow-x-auto scrollbar-none">
          {merchantShortcuts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-medium text-slate-700 whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Responder ${selectedCustomer}...`}
              className="flex-1 text-xs p-3 rounded-xl border border-slate-200 focus:outline-slate-900 bg-slate-50 text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-3 rounded-xl bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white shadow-xs transition-all flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
