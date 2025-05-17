"use client";

import { AppSidebar } from "@/components/sidebar/sidebar-component";
import { SiteHeader } from "@/components/header/header-component";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/custom/card"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import { IconDownload, IconSearch, IconFolder, IconFile, IconPlus, IconUpload, IconDotsVertical, IconTrash, IconEdit } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/custom/dropdown-menu"
import { useState } from "react"

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  lastModified: string;
  parentId: string | null;
}

const initialFiles: FileItem[] = [
  {
    id: "1",
    name: "2024",
    type: "folder",
    lastModified: "2024-03-20",
    parentId: null
  },
  {
    id: "2",
    name: "2023",
    type: "folder",
    lastModified: "2024-03-20",
    parentId: null
  },
  {
    id: "3",
    name: "Janeiro",
    type: "folder",
    lastModified: "2024-03-20",
    parentId: "1"
  },
  {
    id: "4",
    name: "Fevereiro",
    type: "folder",
    lastModified: "2024-03-20",
    parentId: "1"
  },
  {
    id: "5",
    name: "NF-e 001.pdf",
    type: "file",
    size: "2.5 MB",
    lastModified: "2024-03-20",
    parentId: "3"
  },
  {
    id: "6",
    name: "NF-e 002.pdf",
    type: "file",
    size: "1.8 MB",
    lastModified: "2024-03-20",
    parentId: "3"
  },
  {
    id: "7",
    name: "CT-e 001.pdf",
    type: "file",
    size: "3.2 MB",
    lastModified: "2024-03-20",
    parentId: "4"
  }
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [newFolderName, setNewFolderName] = useState("")

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = file.parentId === currentFolder
    const isRootFolder = currentFolder === null && file.parentId === null
    return matchesSearch && (matchesFolder || isRootFolder)
  })

  const currentPath = () => {
    if (!currentFolder) return "Documentos Fiscais"
    const folder = files.find(f => f.id === currentFolder)
    return folder ? folder.name : "Documentos Fiscais"
  }

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return

    const newFolder: FileItem = {
      id: Date.now().toString(),
      name: newFolderName,
      type: "folder",
      lastModified: new Date().toISOString().split('T')[0],
      parentId: currentFolder
    }

    setFiles([...files, newFolder])
    setNewFolderName("")
  }

  const handleUploadFile = () => {
    // Simular upload de arquivo
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: "Novo Documento.pdf",
      type: "file",
      size: "1.0 MB",
      lastModified: new Date().toISOString().split('T')[0],
      parentId: currentFolder
    }

    setFiles([...files, newFile])
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter(file => file.id !== id))
  }

  const handleNavigate = (folderId: string | null) => {
    setCurrentFolder(folderId)
  }

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
                        <CardTitle>Documentos Fiscais</CardTitle>
                        <CardDescription>
                          Gerencie seus documentos fiscais
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleUploadFile}>
                          <IconUpload className="mr-2 h-4 w-4" />
                          Enviar Arquivo
                        </Button>
                        <Button size="sm" onClick={() => setNewFolderName("")}>
                          <IconPlus className="mr-2 h-4 w-4" />
                          Nova Pasta
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex-1">
                        <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Pesquisar documentos..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleNavigate(null)}
                          className="h-6 px-2"
                        >
                          Documentos Fiscais
                        </Button>
                        {currentFolder && (
                          <>
                            <span>/</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleNavigate(currentFolder)}
                              className="h-6 px-2"
                            >
                              {currentPath()}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {newFolderName !== "" && (
                      <div className="flex items-center gap-2 mb-4">
                        <Input
                          placeholder="Nome da nova pasta"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          className="max-w-xs"
                        />
                        <Button size="sm" onClick={handleCreateFolder}>
                          Criar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewFolderName("")}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer"
                          onClick={() => file.type === "folder" && handleNavigate(file.id)}
                        >
                          <div className="flex items-center gap-3">
                            {file.type === "folder" ? (
                              <IconFolder className="h-6 w-6 text-blue-500" />
                            ) : (
                              <IconFile className="h-6 w-6 text-gray-500" />
                            )}
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {file.type === "file" ? file.size : "Pasta"}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <IconDotsVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {file.type === "file" && (
                                <DropdownMenuItem>
                                  <IconDownload className="mr-2 h-4 w-4" />
                                  Baixar
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <IconEdit className="mr-2 h-4 w-4" />
                                Renomear
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDelete(file.id)}
                              >
                                <IconTrash className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
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