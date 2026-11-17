import React from 'react';
import { Enterprise, minAgroNorms } from '../data/enterprises';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Target } from 'lucide-react';

interface Props {
  enterprise: Enterprise;
}

// Нормализуем значения для радарной диаграммы (0-100%)
const normalizeValue = (value: number, max: number) => Math.min((value / max) * 100, 100);

export const ScoringRadar: React.FC<Props> = ({ enterprise }) => {
  const data = [
    {
      metric: 'Ликвидность',
      enterprise: normalizeValue(enterprise.coefficients.currentLiquidity, 3.0),
      norm: normalizeValue(minAgroNorms.currentLiquidity, 3.0),
      rawValue: enterprise.coefficients.currentLiquidity.toFixed(2),
      normValue: minAgroNorms.currentLiquidity.toFixed(1),
    },
    {
      metric: 'Автономия',
      enterprise: normalizeValue(enterprise.coefficients.autonomy, 1.0),
      norm: normalizeValue(minAgroNorms.autonomy, 1.0),
      rawValue: (enterprise.coefficients.autonomy * 100).toFixed(1) + '%',
      normValue: (minAgroNorms.autonomy * 100).toFixed(0) + '%',
    },
    {
      metric: 'Рентабельность',
      enterprise: normalizeValue(Math.max(enterprise.coefficients.profitability, 0), 15.0),
      norm: normalizeValue(minAgroNorms.profitability, 15.0),
      rawValue: enterprise.coefficients.profitability.toFixed(1) + '%',
      normValue: minAgroNorms.profitability.toFixed(1) + '%',
    },
    {
      metric: 'Оборачиваемость',
      enterprise: normalizeValue(enterprise.coefficients.turnover, 2.5),
      norm: normalizeValue(minAgroNorms.turnover, 2.5),
      rawValue: enterprise.coefficients.turnover.toFixed(2),
      normValue: minAgroNorms.turnover.toFixed(1),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-800">Блок скоринга</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Радарная диаграмма показателей vs. нормативы Минсельхоза
        </p>
      </div>

      <div className="p-4">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Норматив (зелёная зона)"
              dataKey="norm"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.15}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Radar
              name="Предприятие"
              dataKey="enterprise"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.3}
              strokeWidth={2.5}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0]?.payload;
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-200">
                      <p className="font-semibold text-gray-800 mb-1">{item?.metric}</p>
                      <p className="text-sm text-indigo-600">Предприятие: {item?.rawValue}</p>
                      <p className="text-sm text-green-600">Норматив: {item?.normValue}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Coefficient details */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.map((item) => {
            const isAbove = item.enterprise >= item.norm;
            return (
              <div
                key={item.metric}
                className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                  isAbove ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                }`}
              >
                <span className="font-medium text-gray-700">{item.metric}</span>
                <div className="flex items-center gap-1">
                  <span className={`font-bold ${isAbove ? 'text-green-700' : 'text-red-700'}`}>
                    {item.rawValue}
                  </span>
                  <span className="text-gray-400">/ {item.normValue}</span>
                  {isAbove ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
