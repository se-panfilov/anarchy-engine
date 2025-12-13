export type TNavOption = Readonly<{
  id: number;
  name: string;
  label: string;
  condition?: boolean;
  disabled?: boolean;
  action: () => void;
}>;
