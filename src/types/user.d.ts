export interface User {
  id: string;
  name: string;
  cellphone: string;
  kind: string;
  password: string;
}

export interface IUserState {
  customers: any[] | [];
  userToEdit: Product | null;
  userToDelete: {
    id: string;
    name: string;
  } | null;
  openDrawer: boolean;
  loading: boolean;
  totalCount: number;
  errors: any; // Tipar
}