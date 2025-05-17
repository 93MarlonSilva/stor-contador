"use client"

import { AppSidebar } from "@/components/sidebar/sidebar-component";
import { DataTable } from "@/components/pages/company/data-table-companies-list-component";
import { SiteHeader } from "@/components/header/header-component";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-ui";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { companyData, tipoEmpresaData, statusData, metaLimiteData, responsavelData, COLORS } from "@/components/pages/company/charts/chart-company-data";

export default function EmpresasPage() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [showList, setShowList] = useState<boolean>(false);

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
                      data={companyData} 
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
                              label={({ name, percent }: { name: string; percent: number }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
                              label={({ name, percent }: { name: string; percent: number }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
                              label={({ name, percent }: { name: string; percent: number }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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