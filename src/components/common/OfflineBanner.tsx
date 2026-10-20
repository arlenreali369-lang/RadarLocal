import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, RefreshCw, CheckCircle, Database } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, toggleOfflineMode, lastSyncTime } = useApp();

  return (
    <div className={`transition-all duration-300 border-b text-xs ${
      isOffline 
        ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200 py-2 px-4' 
        : 'bg-emerald-500/5 border-emerald-500/10 text-slate-600 py-1.5 px-4 hidden md:block'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isOffline ? (
            <>
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping" />
              <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold">
                Modo Offline Ativo:
              </span>
              <span className="text-slate-600">
                Você pode continuar consultando comércios, cardápios e pedidos salvos em cache local.
              </span>
            </>
          ) : (
            <>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Catálogo sincronizado localmente para consultas rápidas na cidade. Última atualização: {lastSyncTime}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={toggleOfflineMode}
            className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors flex items-center gap-1.5 ${
              isOffline
                ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm'
                : 'bg-slate-200/80 hover:bg-slate-300 text-slate-700'
            }`}
          >
            {isOffline ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Simular Reconectar</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-slate-500" />
                <span>Testar Modo Offline</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
