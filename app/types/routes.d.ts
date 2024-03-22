export type Routes = Array<{
  name: string;
  href: string;
  action?: () => void;
  icon?: React.ReactNode;
  children?: Routes
}>