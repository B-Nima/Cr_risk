import React from 'react';
import { Enterprise } from '../data/enterprises';
import { Building2, MapPin, DollarSign, Users, TrendingUp, Shield } from 'lucide-react';

interface Props {
  enterprise: Enterprise;
}

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} млрд ₽`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} млн ₽`;
  return `${(value / 1000).toFixed(0)} тыс ₽`;
};

const riskLabels = {
  green: { label: 'Низкий риск', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  yellow: { label: 'Средний риск', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  red: { label: 'Высокий риск', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
};

export const EnterpriseCard: React.FC<Props> = ({ enterprise }) => {
  const risk = riskLabels[enterprise.riskClass];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-5 h-5 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">Профиль предприятия (ЕФИС ЗСН)</span>
            </div>
            <h2 className="text-white text-xl font-bold">{enterprise.name}</h2>
          </div>
          {/* Risk indicator - Traffic light */}
          <div className={`${risk.bgColor} ${risk.borderColor} border-2 rounded-xl px-4 py-3 text-center min-w-[140px]`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-4 h-4 rounded-full ${risk.color} animate-pulse shadow-lg`}></div>
              <Shield className={`w-4 h-4 ${risk.textColor}`} />
            </div>
            <div className={`text-lg font-bold ${risk.textColor}`}>{risk.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">Скоринг: {enterprise.riskScore}/100</div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <MapPin className="w-8 h-8 text-blue-500 bg-blue-100 rounded-lg p-1.5" />
            <div>
              <div className="text-xs text-gray-500">Регион / Район</div>
              <div className="text-sm font-semibold text-gray-800">{enterprise.district}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <DollarSign className="w-8 h-8 text-emerald-500 bg-emerald-100 rounded-lg p-1.5" />
            <div>
              <div className="text-xs text-gray-500">Выручка</div>
              <div className="text-sm font-semibold text-gray-800">{formatCurrency(enterprise.revenue)}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <Users className="w-8 h-8 text-purple-500 bg-purple-100 rounded-lg p-1.5" />
            <div>
              <div className="text-xs text-gray-500">Сотрудники</div>
              <div className="text-sm font-semibold text-gray-800">{enterprise.employees} чел.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <TrendingUp className="w-8 h-8 text-orange-500 bg-orange-100 rounded-lg p-1.5" />
            <div>
              <div className="text-xs text-gray-500">Субсидии</div>
              <div className="text-sm font-semibold text-gray-800">{formatCurrency(enterprise.subsidies)}</div>
            </div>
          </div>
        </div>

        {/* Financial summary */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-xs text-blue-600 mb-1">Активы</div>
            <div className="text-sm font-bold text-blue-900">{formatCurrency(enterprise.totalAssets)}</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
            <div className="text-xs text-green-600 mb-1">Собств. капитал</div>
            <div className="text-sm font-bold text-green-900">{formatCurrency(enterprise.equity)}</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-xl border border-red-100">
            <div className="text-xs text-red-600 mb-1">Кредиты (кр/ср)</div>
            <div className="text-sm font-bold text-red-900">{formatCurrency(enterprise.shortTermLoans + enterprise.longTermLoans)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
