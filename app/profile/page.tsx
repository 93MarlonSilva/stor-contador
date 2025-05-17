import { AppSidebar } from "@/components/sidebar/sidebar-component";
import { SiteHeader } from "@/components/header/header-component";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/custom/avatar"
import { Button } from "@/components/custom/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/custom/card"
import { Input } from "@/components/custom/input"
import { Label } from "@/components/custom/label"

export default function ProfilePage() {
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
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>
                      Gerencie suas informações pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Alterar foto</Button>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" defaultValue="Nome do Usuário" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="usuario@exemplo.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" defaultValue="********" />
                      </div>
                    </div>
                    <Button>Salvar alterações</Button>
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