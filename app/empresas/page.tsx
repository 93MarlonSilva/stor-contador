"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

const data = [
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

// Dados para os gráficos
const tipoEmpresaData = [
  { name: "Simples Nacional", value: 4 },
  { name: "Lucro Presumido", value: 3 },
  { name: "Lucro Real", value: 3 },
];

const statusData = [
  { name: "Ativa", value: 7 },
  { name: "Inativa", value: 3 },
];

const metaLimiteData = data.map(empresa => ({
  name: empresa.header,
  meta: parseFloat(empresa.target.replace(/[^\d,]/g, '').replace(',', '.')),
  limite: parseFloat(empresa.limit.replace(/[^\d,]/g, '').replace(',', '.')),
}));

const responsavelData = [
  { name: "João Silva", value: 4 },
  { name: "Maria Santos", value: 3 },
  { name: "Pedro Oliveira", value: 3 },
];

const COLORS = ['#008c6e', '#00b894', '#00cec9', '#81ecec'];

export default function EmpresasPage() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [showList, setShowList] = useState(false);

  // Reset showList when a new company is selected
  useEffect(() => {
    setShowList(false);
  }, [selectedCompany]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-8">
                    <DataTable 
                      data={data} 
                      onCompanySelect={setSelectedCompany}
                      selectedCompany={selectedCompany}
                      onShowListChange={setShowList}
                    />
                  </div>
                </div>
              </div>
              
              {/* Seção de Gráficos */}
              {selectedCompany && !showList && (
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2">
                  {/* Gráfico 1: Distribuição por Tipo */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Tipo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={tipoEmpresaData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {tipoEmpresaData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico 2: Status das Empresas */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Status das Empresas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico 3: Meta vs Limite */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Meta vs Limite</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={metaLimiteData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="meta" fill="#008c6e" name="Meta" />
                            <Bar dataKey="limite" fill="#00b894" name="Limite" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico 4: Distribuição por Responsável */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Responsável</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={responsavelData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {responsavelData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 