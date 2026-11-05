export interface Enterprise {
  id: string;
  name: string;
  region: string;
  district: string;
  revenue: number;
  employees: number;
  riskClass: 'green' | 'yellow' | 'red';
  riskScore: number;
  coefficients: {
    currentLiquidity: number;
    autonomy: number;
    profitability: number;
    turnover: number;
  };
  factors: {
    name: string;
    impact: number;
    direction: 'positive' | 'negative';
  }[];
  subsidies: number;
  shortTermLoans: number;
  longTermLoans: number;
  equity: number;
  totalAssets: number;
}

export const enterprises: Enterprise[] = [
  {
    id: '1',
    name: 'ООО "БурятАгроПром"',
    region: 'Республика Бурятия',
    district: 'Иволгинский район',
    revenue: 245000000,
    employees: 127,
    riskClass: 'green',
    riskScore: 82,
    coefficients: {
      currentLiquidity: 2.1,
      autonomy: 0.65,
      profitability: 12.4,
      turnover: 1.8,
    },
    factors: [
      { name: 'Доля субсидий в выручке', impact: 18, direction: 'positive' },
      { name: 'Коэфф. текущей ликвидности', impact: 15, direction: 'positive' },
      { name: 'Рентабельность продаж', impact: 14, direction: 'positive' },
      { name: 'Коэфф. автономии', impact: 12, direction: 'positive' },
      { name: 'Оборачиваемость активов', impact: 10, direction: 'positive' },
      { name: 'Доля краткосрочных кредитов', impact: 8, direction: 'negative' },
      { name: 'Задолженность по налогам', impact: 5, direction: 'negative' },
      { name: 'Изменение поголовья КРС', impact: 4, direction: 'negative' },
    ],
    subsidies: 38500000,
    shortTermLoans: 15000000,
    longTermLoans: 42000000,
    equity: 185000000,
    totalAssets: 320000000,
  },
  {
    id: '2',
    name: 'СПК "Кабанский"',
    region: 'Республика Бурятия',
    district: 'Кабанский район',
    revenue: 89000000,
    employees: 54,
    riskClass: 'yellow',
    riskScore: 55,
    coefficients: {
      currentLiquidity: 1.3,
      autonomy: 0.42,
      profitability: 4.2,
      turnover: 0.9,
    },
    factors: [
      { name: 'Доля субсидий в выручке', impact: 22, direction: 'positive' },
      { name: 'Коэфф. автономии', impact: 16, direction: 'negative' },
      { name: 'Доля краткосрочных кредитов', impact: 18, direction: 'negative' },
      { name: 'Рентабельность продаж', impact: 12, direction: 'negative' },
      { name: 'Оборачиваемость активов', impact: 10, direction: 'negative' },
      { name: 'Коэфф. текущей ликвидности', impact: 9, direction: 'negative' },
      { name: 'Задолженность по налогам', impact: 7, direction: 'negative' },
      { name: 'Изменение поголовья КРС', impact: 6, direction: 'positive' },
    ],
    subsidies: 19500000,
    shortTermLoans: 32000000,
    longTermLoans: 18000000,
    equity: 45000000,
    totalAssets: 107000000,
  },
  {
    id: '3',
    name: 'АО "Селенгинское"',
    region: 'Республика Бурятия',
    district: 'Селенгинский район',
    revenue: 34000000,
    employees: 28,
    riskClass: 'red',
    riskScore: 23,
    coefficients: {
      currentLiquidity: 0.7,
      autonomy: 0.22,
      profitability: -3.8,
      turnover: 0.4,
    },
    factors: [
      { name: 'Доля краткосрочных кредитов', impact: 24, direction: 'negative' },
      { name: 'Коэфф. автономии', impact: 20, direction: 'negative' },
      { name: 'Рентабельность продаж', impact: 18, direction: 'negative' },
      { name: 'Задолженность по налогам', impact: 14, direction: 'negative' },
      { name: 'Коэфф. текущей ликвидности', impact: 10, direction: 'negative' },
      { name: 'Оборачиваемость активов', impact: 8, direction: 'negative' },
      { name: 'Доля субсидий в выручке', impact: 4, direction: 'positive' },
      { name: 'Изменение поголовья КРС', impact: 2, direction: 'positive' },
    ],
    subsidies: 5200000,
    shortTermLoans: 28000000,
    longTermLoans: 8000000,
    equity: 12000000,
    totalAssets: 54000000,
  },
  {
    id: '4',
    name: 'КФХ "Тункинское"',
    region: 'Республика Бурятия',
    district: 'Тункинский район',
    revenue: 156000000,
    employees: 42,
    riskClass: 'green',
    riskScore: 76,
    coefficients: {
      currentLiquidity: 1.9,
      autonomy: 0.58,
      profitability: 9.8,
      turnover: 1.5,
    },
    factors: [
      { name: 'Рентабельность продаж', impact: 17, direction: 'positive' },
      { name: 'Коэфф. текущей ликвидности', impact: 15, direction: 'positive' },
      { name: 'Доля субсидий в выручке', impact: 14, direction: 'positive' },
      { name: 'Оборачиваемость активов', impact: 13, direction: 'positive' },
      { name: 'Коэфф. автономии', impact: 11, direction: 'positive' },
      { name: 'Доля краткосрочных кредитов', impact: 12, direction: 'negative' },
      { name: 'Задолженность по налогам', impact: 5, direction: 'negative' },
      { name: 'Изменение поголовья КРС', impact: 3, direction: 'positive' },
    ],
    subsidies: 22000000,
    shortTermLoans: 20000000,
    longTermLoans: 35000000,
    equity: 120000000,
    totalAssets: 210000000,
  },
  {
    id: '5',
    name: 'ООО "Баргузинское"',
    region: 'Республика Бурятия',
    district: 'Баргузинский район',
    revenue: 67000000,
    employees: 38,
    riskClass: 'yellow',
    riskScore: 48,
    coefficients: {
      currentLiquidity: 1.1,
      autonomy: 0.38,
      profitability: 2.1,
      turnover: 0.7,
    },
    factors: [
      { name: 'Доля краткосрочных кредитов', impact: 20, direction: 'negative' },
      { name: 'Коэфф. автономии', impact: 16, direction: 'negative' },
      { name: 'Оборачиваемость активов', impact: 14, direction: 'negative' },
      { name: 'Рентабельность продаж', impact: 12, direction: 'negative' },
      { name: 'Доля субсидий в выручке', impact: 15, direction: 'positive' },
      { name: 'Коэфф. текущей ликвидности', impact: 10, direction: 'negative' },
      { name: 'Задолженность по налогам', impact: 8, direction: 'negative' },
      { name: 'Изменение поголовья КРС', impact: 5, direction: 'positive' },
    ],
    subsidies: 14000000,
    shortTermLoans: 25000000,
    longTermLoans: 12000000,
    equity: 32000000,
    totalAssets: 84000000,
  },
];

// Нормативы Минсельхоза (зеленая зона)
export const minAgroNorms = {
  currentLiquidity: 2.0,
  autonomy: 0.5,
  profitability: 8.0,
  turnover: 1.5,
};

export const radarData = [
  { metric: 'Ликвидность', greenZone: 2.0, fullMark: 3.0 },
  { metric: 'Автономия', greenZone: 0.5, fullMark: 1.0 },
  { metric: 'Рентабельность', greenZone: 8.0, fullMark: 15.0 },
  { metric: 'Оборачиваемость', greenZone: 1.5, fullMark: 2.5 },
];
