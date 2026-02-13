export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: "En Venta" | "Vendido" | "Alquilado" | "Reservado";
  createdAt: string;
}
