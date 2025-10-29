"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";

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
    stock: 11,
    categoria: "Frenos",
    status: "Done",
    price: 18500,
    supplier: "Brembo",
    lastUpdated: "14 Ene",
  },
  {
    id: 4,
    header: "Líquido Refrigerante Orgánico",
    stock: 7,
    categoria: "Fluidos",
    status: "Done",
    price: 21000,
    supplier: "Prestone",
    lastUpdated: "15 Ene",
  },
  {
    id: 5,
    header: "Batería AGM 12V 14Ah",
    stock: 2,
    categoria: "Eléctrico",
    status: "Pending",
    price: 155000,
    supplier: "Yuasa",
    lastUpdated: "13 Ene",
  },
  {
    id: 6,
    header: "Correa de Distribución",
    stock: 19,
    categoria: "Transmisión",
    status: "Done",
    price: 76000,
    supplier: "Gates",
    lastUpdated: "15 Ene",
  },
  {
    id: 7,
    header: "Sensor de Oxígeno OBD2",
    stock: 3,
    categoria: "Sensores",
    status: "Pending",
    price: 120000,
    supplier: "Denso",
    lastUpdated: "14 Ene",
  },
  {
    id: 8,
    header: "Juego de Bujías Iridium",
    stock: 16,
    categoria: "Encendido",
    status: "Done",
    price: 42000,
    supplier: "NGK",
    lastUpdated: "16 Ene",
  },
  {
    id: 9,
    header: "Kit de Embrague Sport",
    stock: 5,
    categoria: "Transmisión",
    status: "Done",
    price: 165000,
    supplier: "Sachs",
    lastUpdated: "12 Ene",
  },
  {
    id: 10,
    header: "Aceite de Caja 75W-90",
    stock: 10,
    categoria: "Lubricantes",
    status: "Done",
    price: 34000,
    supplier: "Liqui Moly",
    lastUpdated: "14 Ene",
  },
  {
    id: 11,
    header: "Filtro de Aire Deportivo",
    stock: 6,
    categoria: "Filtros",
    status: "Done",
    price: 51000,
    supplier: "K&N",
    lastUpdated: "16 Ene",
  },
  {
    id: 12,
    header: "Líquido de Frenos DOT-4",
    stock: 4,
    categoria: "Frenos",
    status: "Pending",
    price: 11500,
    supplier: "Castrol",
    lastUpdated: "15 Ene",
  },
  {
    id: 13,
    header: "Bobina de Encendido",
    stock: 9,
    categoria: "Encendido",
    status: "Done",
    price: 89000,
    supplier: "Denso",
    lastUpdated: "13 Ene",
  },
  {
    id: 14,
    header: "Kit de Cadena Reforzado",
    stock: 2,
    categoria: "Transmisión",
    status: "Pending",
    price: 190000,
    supplier: "RK Takasago",
    lastUpdated: "12 Ene",
  },
  {
    id: 15,
    header: "Batería de Gel 12V",
    stock: 12,
    categoria: "Eléctrico",
    status: "Done",
    price: 139000,
    supplier: "Motobatt",
    lastUpdated: "15 Ene",
  },
  {
    id: 16,
    header: "Tornillería Alta Resistencia",
    stock: 55,
    categoria: "Repuestos",
    status: "Done",
    price: 4500,
    supplier: "Truper",
    lastUpdated: "16 Ene",
  },
  {
    id: 17,
    header: "Aceite 2T Sintético",
    stock: 8,
    categoria: "Lubricantes",
    status: "Done",
    price: 27000,
    supplier: "Motul",
    lastUpdated: "14 Ene",
  },
  {
    id: 18,
    header: "Kit de Pastillas Traseras",
    stock: 1,
    categoria: "Frenos",
    status: "Pending",
    price: 16500,
    supplier: "Ferodo",
    lastUpdated: "11 Ene",
  },
  {
    id: 19,
    header: "Relé de Arranque",
    stock: 6,
    categoria: "Eléctrico",
    status: "Done",
    price: 59000,
    supplier: "Valeo",
    lastUpdated: "15 Ene",
  },
  {
    id: 20,
    header: "Amortiguador Trasero Regulable",
    stock: 3,
    categoria: "Suspensión",
    status: "Pending",
    price: 345000,
    supplier: "KYB",
    lastUpdated: "13 Ene",
  },
  {
    id: 21,
    header: "Lubricante de Cadenas",
    stock: 18,
    categoria: "Lubricantes",
    status: "Done",
    price: 28000,
    supplier: "Repsol",
    lastUpdated: "16 Ene",
  },
  {
    id: 22,
    header: "Módulo CDI Racing",
    stock: 2,
    categoria: "Electrónica",
    status: "Pending",
    price: 220000,
    supplier: "Mitsubishi",
    lastUpdated: "15 Ene",
  },
  {
    id: 23,
    header: "Filtro de Combustible",
    stock: 20,
    categoria: "Filtros",
    status: "Done",
    price: 9500,
    supplier: "Mahle",
    lastUpdated: "14 Ene",
  },
  {
    id: 24,
    header: "Juego de Valvulas Motor",
    stock: 4,
    categoria: "Motor",
    status: "Pending",
    price: 135000,
    supplier: "INA",
    lastUpdated: "12 Ene",
  },
  {
    id: 25,
    header: "Disco de Freno Ventilado",
    stock: 7,
    categoria: "Frenos",
    status: "Done",
    price: 285000,
    supplier: "Brembo",
    lastUpdated: "16 Ene",
  },
];

interface StockIndicatorProps {
  stock: number;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ stock }) => {
  if (stock < 10) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
        {stock} unid.
      </div>
    );
  }

  if (stock < 20) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
        <Clock className="h-3.5 w-3.5 flex-shrink-0" />
        {stock} unid.
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
      {stock} unid.
    </div>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr
      className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${isSelected ? "bg-blue-50" : ""} ${className}`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          className="h-4 w-4 rounded border-gray-300"
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
        <span className="text-sm text-gray-600">{item.categoria}</span>
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
        <span className="text-sm translate-x-[20px] block text-gray-600">
          {item.supplier}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm translate-x-[25px] block text-gray-500">
          {item.lastUpdated}
        </span>
      </td>
      <td className="relative px-4 py-3 text-right">
        <button
          className="rounded p-1.5 transition-colors hover:bg-gray-100"
          aria-label="Open actions menu"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
            <button
              type="button"
              onClick={() => {
                onEdit(item.id);
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 first:rounded-t-lg"
            >
              Editar
            </button>
            <div className="border-t border-gray-200" />
            <button
              type="button"
              onClick={() => {
                onDelete(item.id);
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 last:rounded-b-lg"
            >
              Eliminar
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const InventoryTable: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>(MOCK_DATA);
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

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

  const handleEdit = (id: number) => console.log("Edit:", id);
  const handleDelete = (id: number) => console.log("Delete:", id);

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
          <div className="flex gap-1">
            <button className="inline-flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              <Plus className="h-4 w-4" />
              Agregar Producto
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              <FileCheck className="h-4 w-4" />
              Export PDF
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              <FileText className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar producto o proveedor..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-500 transition-colors focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selected.size === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onChange={handleToggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300"
                    aria-label="Select all items"
                  />
                </th>
                <th className="px-4 py-3 text-center">
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
            <button
              type="button"
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
              className="rounded p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="rounded p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm font-medium text-gray-700">
              {currentPage + 1} de {totalPages}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="rounded p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={currentPage === totalPages - 1}
              className="rounded p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
