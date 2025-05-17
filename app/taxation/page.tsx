"use client";

import { AppSidebar } from "@/components/sidebar/sidebar-component";
import { SiteHeader } from "@/components/header/header-component";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/custom/card"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/custom/select"
import { IconDownload, IconSearch } from "@tabler/icons-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/table"
import { useState } from "react"

const taxes = [
  {
    id: 1,
    product: "Notebook Dell XPS 13",
    ncm: "8471.30.00",
    ipi: "0%",
    icms: "18%",
    pis: "1.65%",
    cofins: "7.6%",
    total: "27.25%"
  },
  {
    id: 2,
    product: "Monitor LG 27\"",
    ncm: "8528.52.00",
    ipi: "0%",
    icms: "18%",
    pis: "1.65%",
    cofins: "7.6%",
    total: "27.25%"
  },
  {
    id: 3,
    product: "Teclado Mecânico",
    ncm: "8471.60.00",
    ipi: "0%",
    icms: "18%",
    pis: "1.65%",
    cofins: "7.6%",
    total: "27.25%"
  },
  {
    id: 4,
    product: "Mouse Gamer",
    ncm: "8471.60.00",
    ipi: "0%",
    icms: "18%",
    pis: "1.65%",
    cofins: "7.6%",
    total: "27.25%"
  },
  {
    id: 5,
    product: "Headset Bluetooth",
    ncm: "8518.30.00",
    ipi: "0%",
    icms: "18%",
    pis: "1.65%",
    cofins: "7.6%",
    total: "27.25%"
  }
]

export default function TaxationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("product")

  const filteredAndSortedTaxes = taxes
    .filter(tax => 
      tax.product.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "product":
          return a.product.localeCompare(b.product)
        case "ncm":
          return a.ncm.localeCompare(b.ncm)
        case "ipi":
          return parseFloat(a.ipi) - parseFloat(b.ipi)
        case "icms":
          return parseFloat(a.icms) - parseFloat(b.icms)
        case "pis":
          return parseFloat(a.pis) - parseFloat(b.pis)
        case "cofins":
          return parseFloat(a.cofins) - parseFloat(b.cofins)
        case "total":
          return parseFloat(a.total) - parseFloat(b.total)
        default:
          return 0
      }
    })

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
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Tributação</CardTitle>
                        <CardDescription>
                          Visualize e gerencie as alíquotas de impostos
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <IconDownload className="mr-2 h-4 w-4" />
                        Exportar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Pesquisar por produto..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">Produto</SelectItem>
                          <SelectItem value="ncm">NCM</SelectItem>
                          <SelectItem value="ipi">IPI</SelectItem>
                          <SelectItem value="icms">ICMS</SelectItem>
                          <SelectItem value="pis">PIS</SelectItem>
                          <SelectItem value="cofins">COFINS</SelectItem>
                          <SelectItem value="total">Total</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>NCM</TableHead>
                          <TableHead className="text-right">IPI</TableHead>
                          <TableHead className="text-right">ICMS</TableHead>
                          <TableHead className="text-right">PIS</TableHead>
                          <TableHead className="text-right">COFINS</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAndSortedTaxes.map((tax) => (
                          <TableRow key={tax.id}>
                            <TableCell className="font-medium">{tax.product}</TableCell>
                            <TableCell>{tax.ncm}</TableCell>
                            <TableCell className="text-right">{tax.ipi}</TableCell>
                            <TableCell className="text-right">{tax.icms}</TableCell>
                            <TableCell className="text-right">{tax.pis}</TableCell>
                            <TableCell className="text-right">{tax.cofins}</TableCell>
                            <TableCell className="text-right font-semibold">{tax.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 