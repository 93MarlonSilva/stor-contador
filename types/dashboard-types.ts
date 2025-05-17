export interface DashboardCard {
  title: string;
  value: string | number;
  description: string;
  trend: 'up' | 'down';
  trendValue: string;
  footer: string;
  footerDescription: string;
} 