export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  location?: string;
  status: "En Venta" | "Vendido" | "Alquilado" | "Reservado";
  createdAt: string;
}
