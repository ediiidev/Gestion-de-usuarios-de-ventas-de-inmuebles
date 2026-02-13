import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { PropertyModal } from "@/components/PropertyModal";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2, Building2, DollarSign, TrendingUp, Home } from "lucide-react";

const initialProperties: Property[] = [
  { id: "1", title: "Penthouse Vista al Mar", description: "Amplio penthouse con terraza", price: 450000, location: "Cancún, QR", status: "En Venta", createdAt: "2025-12-01" },
  { id: "2", title: "Casa Colonial Centro", description: "Casa restaurada del siglo XIX", price: 320000, location: "Mérida, YUC", status: "Vendido", createdAt: "2025-11-15" },
  { id: "3", title: "Departamento Polanco", description: "2 recámaras, acabados de lujo", price: 280000, location: "CDMX", status: "En Venta", createdAt: "2026-01-10" },
  { id: "4", title: "Loft Industrial Roma", description: "Espacios abiertos, doble altura", price: 195000, location: "CDMX", status: "Alquilado", createdAt: "2026-01-20" },
  { id: "5", title: "Villa Campestre", description: "Jardín de 500m², alberca", price: 520000, location: "Valle de Bravo, MEX", status: "Reservado", createdAt: "2026-02-05" },
];

const statusColors: Record<Property["status"], string> = {
  "En Venta": "bg-accent/15 text-accent border-accent/30",
  "Vendido": "bg-muted text-muted-foreground border-border",
  "Alquilado": "bg-warning/15 text-warning border-warning/30",
  "Reservado": "bg-primary/10 text-primary border-primary/20",
};

const Index = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [properties, search, statusFilter]);

  const handleSave = (data: Omit<Property, "id" | "createdAt">) => {
    if (editingProperty) {
      setProperties((prev) => prev.map((p) => (p.id === editingProperty.id ? { ...p, ...data } : p)));
    } else {
      const newProp: Property = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString().slice(0, 10) };
      setProperties((prev) => [...prev, newProp]);
    }
    setEditingProperty(null);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const totalValue = properties.reduce((s, p) => s + p.price, 0);
  const forSale = properties.filter((p) => p.status === "En Venta").length;

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Inmuebles", value: properties.length, icon: Building2, accent: false },
            { label: "En Venta", value: forSale, icon: Home, accent: true },
            { label: "Valor Total", value: `$${(totalValue / 1000).toFixed(0)}K`, icon: DollarSign, accent: false },
            { label: "Este Mes", value: properties.filter((p) => p.createdAt.startsWith("2026-02")).length, icon: TrendingUp, accent: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${stat.accent ? "bg-accent/15 text-accent" : "bg-secondary text-foreground"}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table section */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-4 lg:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border">
            <h2 className="text-lg font-display font-bold text-foreground">Inmuebles</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." className="pl-10 w-48" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="En Venta">En Venta</SelectItem>
                  <SelectItem value="Vendido">Vendido</SelectItem>
                  <SelectItem value="Alquilado">Alquilado</SelectItem>
                  <SelectItem value="Reservado">Reservado</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => { setEditingProperty(null); setModalOpen(true); }} className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" /> Agregar Inmueble
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Título</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No se encontraron inmuebles</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium text-foreground">{p.title}</TableCell>
                      <TableCell className="text-muted-foreground">{p.location}</TableCell>
                      <TableCell className="font-medium text-foreground">${p.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[p.status]}>{p.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{p.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(p)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <PropertyModal open={modalOpen} onOpenChange={setModalOpen} property={editingProperty} onSave={handleSave} />
    </AppLayout>
  );
};

export default Index;
