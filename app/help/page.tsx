import { AppSidebar } from "@/components/sidebar/sidebar-component";
import { SiteHeader } from "@/components/header/header-component";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/custom/card"
import { Button } from "@/components/custom/button"
import { IconMail, IconPhone, IconBrandWhatsapp } from "@tabler/icons-react"

export default function HelpPage() {
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
                    <CardTitle>Suporte</CardTitle>
                    <CardDescription>
                      Entre em contato conosco para obter ajuda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                        <IconMail className="h-8 w-8 text-muted-foreground" />
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-sm text-muted-foreground">suporte@storcontador.com.br</p>
                        <Button variant="outline" className="mt-2">
                          Enviar email
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                        <IconPhone className="h-8 w-8 text-muted-foreground" />
                        <h3 className="font-semibold">Telefone</h3>
                        <p className="text-sm text-muted-foreground">(11) 1234-5678</p>
                        <Button variant="outline" className="mt-2">
                          Ligar
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                        <IconBrandWhatsapp className="h-8 w-8 text-muted-foreground" />
                        <h3 className="font-semibold">WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">(11) 98765-4321</p>
                        <Button variant="outline" className="mt-2">
                          Iniciar chat
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-semibold">Horário de Atendimento</h3>
                      <p className="text-sm text-muted-foreground">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 9h às 13h
                      </p>
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