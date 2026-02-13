import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

interface PropertyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property | null;
  onSave: (property: Omit<Property, "id" | "createdAt">) => void;
}

export function PropertyModal({ open, onOpenChange, property, onSave }: PropertyModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<Property["status"]>("En Venta");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setDescription(property.description);
      setPrice(property.price.toString());
      setLocation(property.location);
      setStatus(property.status);
    } else {
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setStatus("En Venta");
    }
    setErrors({});
  }, [property, open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "El título es obligatorio";
    if (!description.trim()) e.description = "La descripción es obligatoria";
    if (!price || isNaN(Number(price)) || Number(price) <= 0) e.price = "Ingrese un precio válido";
    if (!location.trim()) e.location = "La ubicación es obligatoria";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ title: title.trim(), description: description.trim(), price: Number(price), location: location.trim(), status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">{property ? "Editar Inmueble" : "Agregar Inmueble"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Apartamento en zona centro" className={errors.title ? "border-destructive" : ""} />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe el inmueble..." rows={3} className={errors.description ? "border-destructive" : ""} />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Precio (USD)</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="250000" className={errors.price ? "border-destructive" : ""} />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Property["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En Venta">En Venta</SelectItem>
                  <SelectItem value="Vendido">Vendido</SelectItem>
                  <SelectItem value="Alquilado">Alquilado</SelectItem>
                  <SelectItem value="Reservado">Reservado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ej: Ciudad de México, CDMX" className={errors.location ? "border-destructive" : ""} />
            {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">{property ? "Guardar Cambios" : "Agregar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
