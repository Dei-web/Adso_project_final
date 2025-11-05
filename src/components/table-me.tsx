"use client";

import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  FileCheck,
  GripVertical,
  Search,
  Download,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface InventoryItem {
  id: number;
  header: string;
  stock: number;
  categoria: string;
  status: "Done" | "Pending";
  price: number;
  supplier: string;
  lastUpdated: string;
}

const MOCK_DATA: InventoryItem[] = [
  {
    id: 1,
    header: "Aceite Sintético 5W-30",
    stock: 32,
    categoria: "Lubricantes",
    status: "Done",
    price: 9200,
    supplier: "Mobil",
    lastUpdated: "16 Ene",
  },
  {
    id: 2,
    header: "Filtro de Aceite Premium",
    stock: 4,
    categoria: "Filtros",
    status: "Pending",
    price: 3800,
    supplier: "Bosch",
    lastUpdated: "15 Ene",
  },
  {
    id: 3,
    header: "Pastillas de Freno Delanteras",
    stock: 15,
    categoria: "Frenos",
    status: "Done",
    price: 12500,
    supplier: "Brembo",
    lastUpdated: "14 Ene",
  },
  {
    id: 4,
    header: "Batería 12V 60Ah",
    stock: 8,
    categoria: "Eléctricos",
    status: "Pending",
    price: 45000,
    supplier: "Bosch",
    lastUpdated: "13 Ene",
  },
  {
    id: 5,
    header: "Filtro de Aire Deportivo",
    stock: 22,
    categoria: "Filtros",
    status: "Done",
    price: 8900,
    supplier: "K&N",
    lastUpdated: "12 Ene",
  },
  {
    id: 6,
    header: "Bujías de Platino (Set 4)",
    stock: 18,
    categoria: "Encendido",
    status: "Done",
    price: 15600,
    supplier: "NGK",
    lastUpdated: "11 Ene",
  },
  {
    id: 7,
    header: "Amortiguador Trasero Izquierdo",
    stock: 6,
    categoria: "Suspensión",
    status: "Pending",
    price: 28000,
    supplier: "Monroe",
    lastUpdated: "10 Ene",
  },
  {
    id: 8,
    header: "Correa de Distribución",
    stock: 12,
    categoria: "Motor",
    status: "Done",
    price: 18500,
    supplier: "Gates",
    lastUpdated: "09 Ene",
  },
  {
    id: 9,
    header: "Refrigerante Anticongelante 1L",
    stock: 45,
    categoria: "Lubricantes",
    status: "Done",
    price: 4200,
    supplier: "Castrol",
    lastUpdated: "08 Ene",
  },
  {
    id: 10,
    header: "Sensor de Oxígeno",
    stock: 3,
    categoria: "Eléctricos",
    status: "Pending",
    price: 35000,
    supplier: "Bosch",
    lastUpdated: "07 Ene",
  },
  {
    id: 11,
    header: "Discos de Freno Ventilados",
    stock: 10,
    categoria: "Frenos",
    status: "Done",
    price: 32000,
    supplier: "Brembo",
    lastUpdated: "06 Ene",
  },
  {
    id: 12,
    header: "Filtro de Combustible",
    stock: 28,
    categoria: "Filtros",
    status: "Done",
    price: 6700,
    supplier: "Mann",
    lastUpdated: "05 Ene",
  },
  {
    id: 13,
    header: "Alternador 90A",
    stock: 5,
    categoria: "Eléctricos",
    status: "Pending",
    price: 58000,
    supplier: "Valeo",
    lastUpdated: "04 Ene",
  },
  {
    id: 14,
    header: "Bomba de Agua",
    stock: 14,
    categoria: "Motor",
    status: "Done",
    price: 22000,
    supplier: "Gates",
    lastUpdated: "03 Ene",
  },
  {
    id: 15,
    header: "Aceite de Transmisión ATF",
    stock: 25,
    categoria: "Lubricantes",
    status: "Done",
    price: 11200,
    supplier: "Mobil",
    lastUpdated: "02 Ene",
  },
  {
    id: 16,
    header: "Espejo Retrovisor Derecho",
    stock: 7,
    categoria: "Carrocería",
    status: "Pending",
    price: 42000,
    supplier: "OEM",
    lastUpdated: "01 Ene",
  },
  {
    id: 17,
    header: "Faro Delantero LED",
    stock: 9,
    categoria: "Iluminación",
    status: "Pending",
    price: 65000,
    supplier: "Philips",
    lastUpdated: "31 Dic",
  },
  {
    id: 18,
    header: "Tensor de Correa",
    stock: 16,
    categoria: "Motor",
    status: "Done",
    price: 14500,
    supplier: "Gates",
    lastUpdated: "30 Dic",
  },
  {
    id: 19,
    header: "Radiador Aluminio",
    stock: 4,
    categoria: "Refrigeración",
    status: "Pending",
    price: 85000,
    supplier: "Denso",
    lastUpdated: "29 Dic",
  },
  {
    id: 20,
    header: "Cable de Acelerador",
    stock: 20,
    categoria: "Transmisión",
    status: "Done",
    price: 8500,
    supplier: "OEM",
    lastUpdated: "28 Dic",
  },
  {
    id: 21,
    header: "Empaquetadura de Culata",
    stock: 11,
    categoria: "Motor",
    status: "Done",
    price: 25000,
    supplier: "Elring",
    lastUpdated: "27 Dic",
  },
  {
    id: 22,
    header: "Manguera Superior Radiador",
    stock: 30,
    categoria: "Refrigeración",
    status: "Done",
    price: 5200,
    supplier: "Gates",
    lastUpdated: "26 Dic",
  },
  {
    id: 23,
    header: "Brazo de Suspensión Inferior",
    stock: 8,
    categoria: "Suspensión",
    status: "Pending",
    price: 38000,
    supplier: "TRW",
    lastUpdated: "25 Dic",
  },
  {
    id: 24,
    header: "Termostato Motor",
    stock: 24,
    categoria: "Refrigeración",
    status: "Done",
    price: 7800,
    supplier: "Wahler",
    lastUpdated: "24 Dic",
  },
  {
    id: 25,
    header: "Motor de Arranque",
    stock: 6,
    categoria: "Eléctricos",
    status: "Pending",
    price: 72000,
    supplier: "Valeo",
    lastUpdated: "23 Dic",
  },
  {
    id: 26,
    header: "Rodamiento Rueda Delantera",
    stock: 13,
    categoria: "Suspensión",
    status: "Done",
    price: 19500,
    supplier: "SKF",
    lastUpdated: "22 Dic",
  },
  {
    id: 27,
    header: "Sensor de Velocidad ABS",
    stock: 9,
    categoria: "Eléctricos",
    status: "Pending",
    price: 28500,
    supplier: "Bosch",
    lastUpdated: "21 Dic",
  },
  {
    id: 28,
    header: "Filtro Habitáculo Polen",
    stock: 35,
    categoria: "Filtros",
    status: "Done",
    price: 4500,
    supplier: "Mann",
    lastUpdated: "20 Dic",
  },
  {
    id: 29,
    header: "Bomba de Combustible Eléctrica",
    stock: 5,
    categoria: "Motor",
    status: "Pending",
    price: 62000,
    supplier: "Bosch",
    lastUpdated: "19 Dic",
  },
  {
    id: 30,
    header: "Silenciador Escape",
    stock: 7,
    categoria: "Escape",
    status: "Pending",
    price: 48000,
    supplier: "Walker",
    lastUpdated: "18 Dic",
  },
  {
    id: 31,
    header: "Aceite Motor 10W-40 Mineral",
    stock: 40,
    categoria: "Lubricantes",
    status: "Done",
    price: 6800,
    supplier: "Shell",
    lastUpdated: "17 Dic",
  },
  {
    id: 32,
    header: "Bobina de Encendido",
    stock: 12,
    categoria: "Encendido",
    status: "Done",
    price: 24000,
    supplier: "NGK",
    lastUpdated: "16 Dic",
  },
  {
    id: 33,
    header: "Retén Cigüeñal Delantero",
    stock: 27,
    categoria: "Motor",
    status: "Done",
    price: 3200,
    supplier: "Corteco",
    lastUpdated: "15 Dic",
  },
  {
    id: 34,
    header: "Cilindro Maestro Freno",
    stock: 4,
    categoria: "Frenos",
    status: "Pending",
    price: 55000,
    supplier: "TRW",
    lastUpdated: "14 Dic",
  },
  {
    id: 35,
    header: "Lámpara H7 12V 55W",
    stock: 50,
    categoria: "Iluminación",
    status: "Done",
    price: 2500,
    supplier: "Osram",
    lastUpdated: "13 Dic",
  },
  {
    id: 36,
    header: "Rótula Dirección",
    stock: 15,
    categoria: "Dirección",
    status: "Done",
    price: 16500,
    supplier: "TRW",
    lastUpdated: "12 Dic",
  },
  {
    id: 37,
    header: "Ventilador Radiador",
    stock: 6,
    categoria: "Refrigeración",
    status: "Pending",
    price: 38000,
    supplier: "Denso",
    lastUpdated: "11 Dic",
  },
  {
    id: 38,
    header: "Cable Freno de Mano",
    stock: 18,
    categoria: "Frenos",
    status: "Done",
    price: 12000,
    supplier: "Ferodo",
    lastUpdated: "10 Dic",
  },
  {
    id: 39,
    header: "Junta Homocinética",
    stock: 8,
    categoria: "Transmisión",
    status: "Pending",
    price: 45000,
    supplier: "GKN",
    lastUpdated: "09 Dic",
  },
  {
    id: 40,
    header: "Líquido de Frenos DOT4",
    stock: 38,
    categoria: "Lubricantes",
    status: "Done",
    price: 5500,
    supplier: "Castrol",
    lastUpdated: "08 Dic",
  },
  {
    id: 41,
    header: "Switch de Encendido",
    stock: 10,
    categoria: "Eléctricos",
    status: "Done",
    price: 18000,
    supplier: "OEM",
    lastUpdated: "07 Dic",
  },
  {
    id: 42,
    header: "Catalizador Universal",
    stock: 3,
    categoria: "Escape",
    status: "Pending",
    price: 125000,
    supplier: "Walker",
    lastUpdated: "06 Dic",
  },
  {
    id: 43,
    header: "Balata Freno Trasera",
    stock: 21,
    categoria: "Frenos",
    status: "Done",
    price: 9800,
    supplier: "Ferodo",
    lastUpdated: "05 Dic",
  },
  {
    id: 44,
    header: "Sensor Temperatura Motor",
    stock: 14,
    categoria: "Eléctricos",
    status: "Done",
    price: 8200,
    supplier: "Bosch",
    lastUpdated: "04 Dic",
  },
  {
    id: 45,
    header: "Cremallera Dirección",
    stock: 2,
    categoria: "Dirección",
    status: "Pending",
    price: 95000,
    supplier: "TRW",
    lastUpdated: "03 Dic",
  },
  {
    id: 46,
    header: "Tapa Radiador 1.1 Bar",
    stock: 42,
    categoria: "Refrigeración",
    status: "Done",
    price: 3800,
    supplier: "Stant",
    lastUpdated: "02 Dic",
  },
  {
    id: 47,
    header: "Resorte Suspensión Trasero",
    stock: 11,
    categoria: "Suspensión",
    status: "Done",
    price: 22000,
    supplier: "Monroe",
    lastUpdated: "01 Dic",
  },
  {
    id: 48,
    header: "Fusibles Mini Set 10 Pzas",
    stock: 60,
    categoria: "Eléctricos",
    status: "Done",
    price: 1500,
    supplier: "Littelfuse",
    lastUpdated: "30 Nov",
  },
  {
    id: 49,
    header: "Válvula PCV",
    stock: 19,
    categoria: "Motor",
    status: "Done",
    price: 6200,
    supplier: "OEM",
    lastUpdated: "29 Nov",
  },
  {
    id: 50,
    header: "Manguera Inferior Radiador",
    stock: 26,
    categoria: "Refrigeración",
    status: "Done",
    price: 4900,
    supplier: "Gates",
    lastUpdated: "28 Nov",
  },
];

interface StockIndicatorProps {
  stock: number;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ stock }) => {
  if (stock < 10) {
    return (
      <Badge variant="destructive" className="gap-1.5">
        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
        {stock} unid.
      </Badge>
    );
  }

  if (stock < 20) {
    return (
      <Badge
        variant="destructive"
        className="gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100"
      >
        <Clock className="h-3.5 w-3.5 flex-shrink-0" />
        {stock} unid.
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="gap-1.5 bg-green-100 text-green-800 hover:bg-green-100"
    >
      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
      {stock} unid.
    </Badge>
  );
};

interface TableRowProps {
  item: InventoryItem;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  className = "",
}) => {
  return (
    <tr
      className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${isSelected ? "bg-blue-50" : ""} ${className}`}
    >
      <td className="px-4 py-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(item.id)}
          aria-label={`Select ${item.header}`}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 flex-shrink-0 text-gray-300" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {item.header}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline" className="text-xs">
          {item.categoria}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <StockIndicator stock={item.stock} />
      </td>
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-gray-900">
          ${item.price.toLocaleString()}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600">{item.supplier}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-500">{item.lastUpdated}</span>
      </td>
      <td className="px-4 py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item.id)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(item.id)}
              className="text-red-600 focus:text-red-600"
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

// Product Modal Component
interface ProductFormValues {
  id?: number;
  header: string;
  stock: number;
  categoria: string;
  status: "Done" | "Pending";
  price: number;
  supplier: string;
  lastUpdated: string;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: ProductFormValues) => void;
  item?: InventoryItem | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  onSave,
  item,
}) => {
  const [form, setForm] = useState<ProductFormValues>({
    header: "",
    stock: 0,
    categoria: "",
    status: "Pending",
    price: 0,
    supplier: "",
    lastUpdated: "Hoy",
  });

  React.useEffect(() => {
    if (item) setForm(item);
    else
      setForm({
        header: "",
        stock: 0,
        categoria: "",
        status: "Pending",
        price: 0,
        supplier: "",
        lastUpdated: "Hoy",
      });
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      // Remover todo excepto números
      const numericValue = value.replace(/\D/g, "");
      setForm((prev) => ({
        ...prev,
        price: numericValue ? Number(numericValue) : 0,
      }));
    } else if (name === "stock") {
      setForm((prev) => ({
        ...prev,
        stock: Number(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: String(value),
      }));
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-CO");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {item ? "Editar Producto" : "Agregar Producto"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>Nombre</Label>
            <Input
              name="header"
              value={form.header}
              onChange={handleChange}
              placeholder="Ej: Filtro de aire"
            />
          </div>
          <div>
            <Label>Categoría</Label>
            <Input
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Ej: Filtros"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Stock</Label>
              <Input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Precio</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  name="price"
                  type="text"
                  value={formatPrice(form.price)}
                  onChange={handleChange}
                  placeholder="0"
                  className="pl-7"
                />
              </div>
            </div>
          </div>
          <div>
            <Label>Proveedor</Label>
            <Input
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              placeholder="Ej: Bosch"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(form)}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InventoryTable: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>(MOCK_DATA);
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;
      const matchesCategory =
        filterCategory === "all" || item.categoria === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [data, searchTerm, filterStatus, filterCategory]);

  const categories = useMemo(
    () => [...new Set(data.map((item) => item.categoria))],
    [data],
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleEdit = (id: number) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setEditingItem(item);
      setModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      setData(data.filter((item) => item.id !== id));
      setSelected((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleSaveProduct = (product: ProductFormValues) => {
    if (editingItem) {
      // Editar producto existente
      setData(
        data.map((item) =>
          item.id === editingItem.id
            ? ({ ...product, id: item.id } as InventoryItem)
            : item,
        ),
      );
    } else {
      // Agregar nuevo producto
      const newId = Math.max(...data.map((item) => item.id), 0) + 1;
      setData([...data, { ...product, id: newId } as InventoryItem]);
    }
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleToggleSelectAll = () => {
    if (selected.size === paginatedData.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginatedData.map((item) => item.id)));
    }
  };

  const handleToggleSelect = (id: number) => {
    const newSet = new Set(selected);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelected(newSet);
  };

  const handlePageChange = (page: number) =>
    setCurrentPage(Math.max(0, Math.min(totalPages - 1, page)));

  const handleExportExcel = () => {
    // Preparar los datos para exportar
    const exportData = filteredData.map((item) => ({
      Producto: item.header,
      Categoría: item.categoria,
      Stock: item.stock,
      Precio: item.price,
      Proveedor: item.supplier,
      Estado: item.status === "Done" ? "Completado" : "Pendiente",
      "Última Actualización": item.lastUpdated,
    }));

    // Crear un nuevo libro de trabajo
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");

    // Ajustar el ancho de las columnas
    const colWidths = [
      { wch: 30 }, // Producto
      { wch: 15 }, // Categoría
      { wch: 10 }, // Stock
      { wch: 12 }, // Precio
      { wch: 20 }, // Proveedor
      { wch: 15 }, // Estado
      { wch: 18 }, // Última Actualización
    ];
    ws["!cols"] = colWidths;

    // Generar el archivo y descargarlo
    const fecha = new Date().toISOString().split("T")[0];
    XLSX.writeFile(wb, `inventario_${fecha}.xlsx`);
  };

  return (
    <div className="w-full min-h-screen bg-white p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Inventario</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona tu stock de repuestos
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-1" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Agregar Producto
            </Button>
            <Button
              variant="outline"
              className="gap-1"
              onClick={handleExportExcel}
            >
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
            <Button variant="outline" className="gap-1">
              <FileCheck className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-1">
              <FileText className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar producto o proveedor..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(0);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="w-full sm:w-48">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Estado
                </label>
                <Select
                  value={filterStatus}
                  onValueChange={(value) => {
                    setFilterStatus(value);
                    setCurrentPage(0);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="Done">Completado</SelectItem>
                    <SelectItem value="Pending">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="w-full sm:w-48">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Categoría
                </label>
                <Select
                  value={filterCategory}
                  onValueChange={(value) => {
                    setFilterCategory(value);
                    setCurrentPage(0);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              <div className="w-full sm:w-auto">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2 opacity-0">
                  Limpiar
                </label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterCategory("all");
                    setCurrentPage(0);
                  }}
                  className="w-full sm:w-auto"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={
                      selected.size === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onCheckedChange={handleToggleSelectAll}
                    aria-label="Select all items"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Producto
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Categoría
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Stock
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Precio
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Proveedor
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase text-gray-600">
                    Actualización
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Acciones
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  isSelected={selected.has(item.id)}
                  onToggleSelect={handleToggleSelect}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selected.size} de {data.length} seleccionados
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-2 text-sm font-medium text-gray-700">
              {currentPage + 1} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        item={editingItem}
      />
    </div>
  );
};

export default InventoryTable;
