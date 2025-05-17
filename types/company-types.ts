export interface Company {
  id: number;
  header: string;
  type: 'Simples Nacional' | 'Lucro Presumido' | 'Lucro Real';
  status: 'Ativa' | 'Inativa';
  target: string;
  limit: string;
  reviewer: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface MetaLimiteData {
  name: string;
  meta: number;
  limite: number;
} 