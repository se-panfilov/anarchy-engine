export type TNavOption = Readonly<{
  id: number;
  label: string;
  condition?: boolean;
  disabled?: boolean;
  action: () => void;
}>;
