"use client"

import * as React from "react"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconLayoutColumns,
} from "@tabler/icons-react"
import {
  ColumnDef,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { z } from "zod"
import { ArrowUpDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

interface RowData {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

interface DataTableProps {
  data: {
    id: number;
    header: string;
    type: string;
    status: string;
    target: string;
    limit: string;
    reviewer: string;
  }[];
  onCompanySelect?: (id: number | null) => void;
  selectedCompany?: number | null;
  onShowListChange?: (show: boolean) => void;
}

export function DataTable({ data: initialData, onCompanySelect, selectedCompany, onShowListChange }: DataTableProps) {
  const [data] = React.useState(() => initialData)
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showList, setShowList] = React.useState(false)
  const [sortBy, setSortBy] = React.useState<string>("header")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")

  // Reset showList when selectedCompany changes
  React.useEffect(() => {
    setShowList(false);
    onShowListChange?.(false);
  }, [selectedCompany, onShowListChange]);

  const handleShowListChange = (show: boolean) => {
    setShowList(show);
    onShowListChange?.(show);
    if (show) {
      onCompanySelect?.(null); // Remove a seleção da empresa quando mostrar a listagem
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Filter and sort data based on search term and sort criteria
  const filteredData = React.useMemo(() => {
    let result = [...data];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.header.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "header":
          comparison = a.header.localeCompare(b.header);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "target":
          comparison = Number(a.target.replace(/[^\d,]/g, '').replace(',', '.')) - 
                      Number(b.target.replace(/[^\d,]/g, '').replace(',', '.'));
          break;
        case "limit":
          comparison = Number(a.limit.replace(/[^\d,]/g, '').replace(',', '.')) - 
                      Number(b.limit.replace(/[^\d,]/g, '').replace(',', '.'));
          break;
        case "reviewer":
          comparison = a.reviewer.localeCompare(b.reviewer);
          break;
        default:
          comparison = a.header.localeCompare(b.header);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [data, searchTerm, sortBy, sortOrder]);

  const columns: ColumnDef<RowData>[] = [
    {
      id: "icon",
      header: () => null,
      cell: () => (
        <div className="flex items-center justify-center">
          <IconCircleCheckFilled className="text-muted-foreground size-4" />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "header",
      header: "Empresa",
      cell: ({ row }: { row: { original: RowData; getValue: (key: string) => string } }) => {
        const isSelected = selectedCompany === row.original.id;
        return (
          <div className={isSelected ? 'font-bold' : ''}>
            {row.getValue("header")}
          </div>
        );
      },
      enableHiding: false,
      size: 400,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }: { row: { original: RowData } }) => <div className="capitalize">{row.original.type}</div>,
      size: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: RowData } }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={status === "Ativa" ? "default" : "secondary"}
            className="capitalize"
          >
            {status}
          </Badge>
        );
      },
      size: 200,
    },
    {
      accessorKey: "target",
      header: "Meta",
      cell: ({ row }: { row: { original: RowData } }) => <div>{row.original.target}</div>,
      size: 200,
    },
    {
      accessorKey: "limit",
      header: "Limite",
      cell: ({ row }: { row: { original: RowData } }) => <div>{row.original.limit}</div>,
      size: 200,
    },
    {
      accessorKey: "reviewer",
      header: "Responsável",
      cell: ({ row }: { row: { original: RowData } }) => <div className="capitalize">{row.original.reviewer}</div>,
      size: 200,
    },
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-8"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar empresa"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 w-full"
                disabled={!showList && selectedCompany !== null}
              />
            </div>
            <div className="flex items-center gap-2">
              {selectedCompany && !showList && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShowListChange(true)}
                  className="flex items-center gap-2"
                >
                  <IconLayoutColumns />
                  <span>Mostrar Listagem</span>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    disabled={!showList && selectedCompany !== null}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    Ordenar por
                    <IconChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => handleSort("header")}>
                    Nome {sortBy === "header" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("type")}>
                    Tipo {sortBy === "type" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("status")}>
                    Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("target")}>
                    Meta {sortBy === "target" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("limit")}>
                    Limite {sortBy === "limit" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("reviewer")}>
                    Responsável {sortBy === "reviewer" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {selectedCompany && !showList && (
            <div className="text-center text-lg font-semibold">
              {data.find(company => company.id === selectedCompany)?.header}
            </div>
          )}
        </div>
      </div>
      {(!selectedCompany || showList) && (
        <TabsContent
          value="outline"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} onCompanySelect={onCompanySelect} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
              {table.getFilteredRowModel().rows.length} empresas no total
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Exibir
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <IconChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <IconChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <IconChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <IconChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      )}
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  )
}

function DraggableRow({ row, onCompanySelect }: { row: Row<z.infer<typeof schema>>; onCompanySelect?: (id: number | null) => void }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 cursor-pointer hover:bg-muted/50 py-4"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      onClick={() => onCompanySelect?.(row.original.id)}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell 
          key={cell.id} 
          className={`py-4 ${cell.column.id === "header" ? "w-[40%]" : "w-[12%]"}`}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
