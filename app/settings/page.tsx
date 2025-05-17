import { AppSidebar } from "@/components/sidebar/sidebar-component";
import { SiteHeader } from "@/components/header/header-component";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/custom/card"
import { Button } from "@/components/custom/button"
import { Switch } from "@/components/custom/switch"
import { Label } from "@/components/custom/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/custom/select"
import { IconLayoutGrid, IconLayoutList, IconFolder, IconLanguage, IconBell, IconPalette } from "@tabler/icons-react"

export default function SettingsPage() {
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
                    <CardTitle>Configurações</CardTitle>
                    <CardDescription>
                      Personalize sua experiência no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {/* Visualização de Documentos */}
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <IconLayoutGrid className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">Visualização de Documentos</h3>
                            <p className="text-sm text-muted-foreground">
                              Escolha como deseja visualizar seus documentos
                            </p>
                          </div>
                        </div>
                        <Select defaultValue="grid">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grid">Grade</SelectItem>
                            <SelectItem value="list">Lista</SelectItem>
                            <SelectItem value="table">Tabela</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Organização de Pastas */}
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <IconFolder className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">Organização de Pastas</h3>
                            <p className="text-sm text-muted-foreground">
                              Defina a estrutura padrão de pastas
                            </p>
                          </div>
                        </div>
                        <Select defaultValue="year">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="year">Por Ano</SelectItem>
                            <SelectItem value="month">Por Mês</SelectItem>
                            <SelectItem value="type">Por Tipo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Idioma */}
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <IconLanguage className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">Idioma</h3>
                            <p className="text-sm text-muted-foreground">
                              Escolha o idioma do sistema
                            </p>
                          </div>
                        </div>
                        <Select defaultValue="pt-BR">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-BR">Português (BR)</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Notificações */}
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <IconBell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">Notificações</h3>
                            <p className="text-sm text-muted-foreground">
                              Receba alertas sobre documentos e prazos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="notifications" />
                          <Label htmlFor="notifications">Ativar</Label>
                        </div>
                      </div>

                      {/* Tema */}
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <IconPalette className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">Tema</h3>
                            <p className="text-sm text-muted-foreground">
                              Escolha entre tema claro ou escuro
                            </p>
                          </div>
                        </div>
                        <Select defaultValue="system">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Claro</SelectItem>
                            <SelectItem value="dark">Escuro</SelectItem>
                            <SelectItem value="system">Sistema</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Modo Compacto */}
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <IconLayoutList className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold">Modo Compacto</h3>
                            <p className="text-sm text-muted-foreground">
                              Reduz o espaçamento entre elementos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch id="compact-mode" />
                          <Label htmlFor="compact-mode">Ativar</Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>Salvar Alterações</Button>
                    </div>
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