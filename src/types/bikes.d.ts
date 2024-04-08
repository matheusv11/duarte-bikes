export interface IBikeState {
  bikes: Product[] | [];
  bikeToEdit: Product | null;
  bikeToDelete: {
    id: string;
    name: string;
  } | null;
  openDrawer: boolean;
  loading: boolean;
  totalCount: number;
  errors: any; // Tipar
}
