import { Company, ChartDataPoint, MetaLimiteData } from "@/types/company-types";

export const companyData: Company[] = [
  {
    id: 1,
    header: "Empresa A",
    type: "Simples Nacional",
    status: "Ativa",
    target: "R$ 1.000.000,00",
    limit: "R$ 500.000,00",
    reviewer: "João Silva",
  },
  {
    id: 2,
    header: "Empresa B",
    type: "Lucro Presumido",
    status: "Inativa",
    target: "R$ 500.000,00",
    limit: "R$ 250.000,00",
    reviewer: "Maria Santos",
  },
  {
    id: 3,
    header: "Empresa C",
    type: "Lucro Real",
    status: "Ativa",
    target: "R$ 2.000.000,00",
    limit: "R$ 1.000.000,00",
    reviewer: "Pedro Oliveira",
  },
  {
    id: 4,
    header: "Empresa D",
    type: "Simples Nacional",
    status: "Ativa",
    target: "R$ 750.000,00",
    limit: "R$ 375.000,00",
    reviewer: "João Silva",
  },
  {
    id: 5,
    header: "Empresa E",
    type: "Lucro Real",
    status: "Ativa",
    target: "R$ 3.000.000,00",
    limit: "R$ 1.500.000,00",
    reviewer: "Maria Santos",
  },
  {
    id: 6,
    header: "Empresa F",
    type: "Lucro Presumido",
    status: "Inativa",
    target: "R$ 1.200.000,00",
    limit: "R$ 600.000,00",
    reviewer: "Pedro Oliveira",
  },
  {
    id: 7,
    header: "Empresa G",
    type: "Simples Nacional",
    status: "Ativa",
    target: "R$ 900.000,00",
    limit: "R$ 450.000,00",
    reviewer: "João Silva",
  },
  {
    id: 8,
    header: "Empresa H",
    type: "Lucro Real",
    status: "Ativa",
    target: "R$ 2.500.000,00",
    limit: "R$ 1.250.000,00",
    reviewer: "Maria Santos",
  },
  {
    id: 9,
    header: "Empresa I",
    type: "Lucro Presumido",
    status: "Inativa",
    target: "R$ 800.000,00",
    limit: "R$ 400.000,00",
    reviewer: "Pedro Oliveira",
  },
  {
    id: 10,
    header: "Empresa J",
    type: "Simples Nacional",
    status: "Ativa",
    target: "R$ 1.500.000,00",
    limit: "R$ 750.000,00",
    reviewer: "João Silva",
  }
];

export const tipoEmpresaData: ChartDataPoint[] = [
  { name: "Simples Nacional", value: 4 },
  { name: "Lucro Presumido", value: 3 },
  { name: "Lucro Real", value: 3 },
];

export const statusData: ChartDataPoint[] = [
  { name: "Ativa", value: 7 },
  { name: "Inativa", value: 3 },
];

export const metaLimiteData: MetaLimiteData[] = companyData.map(empresa => ({
  name: empresa.header,
  meta: parseFloat(empresa.target.replace(/[^\d,]/g, '').replace(',', '.')),
  limite: parseFloat(empresa.limit.replace(/[^\d,]/g, '').replace(',', '.')),
}));

export const responsavelData: ChartDataPoint[] = [
  { name: "João Silva", value: 4 },
  { name: "Maria Santos", value: 3 },
  { name: "Pedro Oliveira", value: 3 },
];

export const COLORS = ['var(--primary)', '#00b894', '#00cec9', '#81ecec']; 