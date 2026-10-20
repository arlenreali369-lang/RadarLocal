import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageCircle,
  Send,
  Store,
  Phone,
  Clock,
  CheckCheck,
  Sparkles,
  Paperclip,
  Image as ImageIcon,
  X
} from 'lucide-react';

export const LocalChat: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    merchants,
    chatTargetMerchantId,
    userRole
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(
    chatTargetMerchantId || merchants[0].id
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];

  const currentConversation = chatMessages.filter(
    m => m.merchantId === selectedMerchantId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation.length]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    sendChatMessage(
      selectedMerchantId,
      text.trim(),
      'customer',
      'Mariana Duarte'
    );

    if (!textToSend) {
      setInputMessage('');
    }

    // Realistic auto-reply from local merchant after a brief delay if sent by customer
    setTimeout(() => {
      const replies = [
        'Olá Mariana! Com certeza, estamos aqui no balcão preparando tudo bem fresquinho para você!',
        'Perfeito! O motoboy parceiro já está ciente e sai em instantes!',
        'Recebido com sucesso! Qualquer dúvida adicional pode chamar aqui no Radar Local.',
        'Combinado! Já anotamos essa observação na sua comanda. Obrigado pela preferência!'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      sendChatMessage(selectedMerchantId, randomReply, 'merchant', currentMerchant.name);
    }, 1800);
  };

  const quickChips = [
    '🥖 O pão francês acabou de sair quentinho?',
    '⏱️ Quanto tempo de entrega pro meu bairro?',
    '🧀 Tem queijo canastra meia cura hoje?',
    '🛵 Pode pedir pro Tiago motoboy trazer?'
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[76vh]">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentMerchant.avatar}
                alt={currentMerchant.name}
                className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {currentMerchant.name}
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>{currentMerchant.neighborhood}</span>
                <span>•</span>
                <span>{currentMerchant.deliveryTime}</span>
              </p>
            </div>
          </div>

          {/* Merchant dropdown switch if customer wants to talk to another shop */}
          <div className="flex items-center gap-2">
            <select
              value={selectedMerchantId}
              onChange={(e) => setSelectedMerchantId(e.target.value)}
              className="text-xs p-2 rounded-xl bg-white border border-slate-200 font-semibold text-slate-700"
            >
              {merchants.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          <div className="text-center my-2">
            <span className="text-[11px] font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
              Conversa direta e segura no comércio de bairro
            </span>
          </div>

          {currentConversation.map(msg => {
            const isMe = msg.sender === 'customer';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-md rounded-2xl p-3.5 shadow-xs text-xs leading-relaxed ${
                    isMe
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isMe ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 border-t border-slate-100 bg-white flex gap-1.5 overflow-x-auto scrollbar-none">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-[11px] font-medium text-slate-600 whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
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
              placeholder="Digite sua dúvida ou pedido personalizado..."
              className="flex-1 text-xs p-3 rounded-xl border border-slate-200 focus:outline-emerald-500 bg-slate-50 text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white shadow-sm transition-all flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
