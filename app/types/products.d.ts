export type Product = {
  id: string;
  description: string | null;
  name: string;
  buyed_value: number;
  sold_value: number;
  quantity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}