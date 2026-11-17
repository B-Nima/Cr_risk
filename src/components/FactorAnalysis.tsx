import React from 'react';
import { Enterprise } from '../data/enterprises';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface Props {
  enterprise: Enterprise;
}

export const FactorAnalysis: React.FC<Props> = ({ enterprise }) => {
  // Sort factors by impact descending
  const sortedFactors = [...enterprise.factors].sort((a, b) => b.impact - a.impact);

  const chartData = sortedFactors.map((f) => ({
    name: f.name.length > 25 ? f.name.substring(0, 25) + '...' : f.name,
    fullName: f.name,
    impact: f.direction === 'negative' ? -f.impact : f.impact,
    direction: f.direction,
    rawImpact: f.impact,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-800">Влияние факторов на риск</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Feature Importance — интерпретация модели (SHAP-значения)
        </p>
      </div>

      <div className="p-4">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              domain={[-30, 30]}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(value) => `${Math.abs(value)}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fontSize: 11, fill: '#374151' }}
            />
            <ReferenceLine x={0} stroke="#6b7280" strokeWidth={1.5} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0]?.payload;
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-200">
                      <p className="font-semibold text-gray-800 text-sm mb-1">{data?.fullName}</p>
                      <p className={`text-sm font-bold ${data?.direction === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        Влияние: {data?.direction === 'positive' ? '+' : '-'}{data?.rawImpact}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {data?.direction === 'positive' ? 'Снижает риск' : 'Повышает риск'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]} barSize={20}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.direction === 'positive' ? '#22c55e' : '#ef4444'}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500 opacity-85"></div>
            <span className="text-xs text-gray-600">Позитивное влияние (снижает риск)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500 opacity-85"></div>
            <span className="text-xs text-gray-600">Негативное влияние (повышает риск)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
