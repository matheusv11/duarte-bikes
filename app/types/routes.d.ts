export type Routes = Array<{
  name: string;
  href: string;
  icon?: React.ReactNode;
  children?: Routes
}>