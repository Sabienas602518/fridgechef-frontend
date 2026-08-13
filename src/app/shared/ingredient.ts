export interface Ingredient {
  _id?: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: Date;
}