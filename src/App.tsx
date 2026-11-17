import React, { useState } from 'react';
import { enterprises } from './data/enterprises';
import { EnterpriseCard } from './components/EnterpriseCard';
import { ScoringRadar } from './components/ScoringRadar';
import { FactorAnalysis } from './components/FactorAnalysis';
import { Brain, Database, Cpu, ChevronDown } from 'lucide-react';

function App() {
  const [selectedId, setSelectedId] = useState(enterprises[0].id);
  const selectedEnterprise = enterprises.find((e) => e.id === selectedId) || enterprises[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Модель оценки кредитного риска
                </h1>
                <p className="text-xs text-gray-500">
                  Республика Бурятия • Loginom + Python (Scikit-learn) • Сельхозпредприятия
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                <Database className="w-3.5 h-3.5" />
                <span>ЕФИС ЗСН</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                <Cpu className="w-3.5 h-3.5" />
                <span>Gradient Boosting</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Enterprise selector */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Выберите предприятие для анализа
            </h2>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {enterprises.map((ent) => {
              const isActive = ent.id === selectedId;
              const riskColor = {
                green: 'border-green-300 bg-green-50',
                yellow: 'border-yellow-300 bg-yellow-50',
                red: 'border-red-300 bg-red-50',
              };
              const dotColor = {
                green: 'bg-green-500',
                yellow: 'bg-yellow-500',
                red: 'bg-red-500',
              };
              return (
                <button
                  key={ent.id}
                  onClick={() => setSelectedId(ent.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? `${riskColor[ent.riskClass]} shadow-md scale-[1.02]`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${dotColor[ent.riskClass]}`}></div>
                  <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                    {ent.name}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-white/80 text-gray-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {ent.riskScore}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enterprise Profile Card */}
        <div className="mb-6">
          <EnterpriseCard enterprise={selectedEnterprise} />
        </div>

        {/* Scoring + Factors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ScoringRadar enterprise={selectedEnterprise} />
          <FactorAnalysis enterprise={selectedEnterprise} />
        </div>

        {/* Model info footer */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-2.5 rounded-xl">
              <Brain className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">О модели</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">Алгоритм</div>
                  <div className="text-sm font-semibold text-gray-800">Gradient Boosting Classifier</div>
                  <div className="text-xs text-gray-500 mt-1">Scikit-learn, 500 деревьев</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">Метрики качества</div>
                  <div className="text-sm font-semibold text-gray-800">AUC-ROC: 0.89 | F1: 0.84</div>
                  <div className="text-xs text-gray-500 mt-1">Cross-validation (5-fold)</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">Интерпретация</div>
                  <div className="text-sm font-semibold text-gray-800">SHAP Values + Feature Importance</div>
                  <div className="text-xs text-gray-500 mt-1">Объяснение «чёрного ящика» для кредитного комитета</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-800">
                  <strong>Источники данных:</strong> ЕФИС ЗСН (Единая федеральная информационная система о закупках и поставках),
                  данные Минсельхоза РБ, бухгалтерская отчётность. 
                  <strong> Инструменты:</strong> Loginom (подготовка данных, EDA) + Python Scikit-learn (обучение модели).
                  <strong> Обучающая выборка:</strong> 156 предприятий АПК Республики Бурятия (2019–2025).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-xs text-gray-400">
            © 2025 Модель оценки финансовой устойчивости и кредитного риска • Республика Бурятия • Кредитный комитет
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
