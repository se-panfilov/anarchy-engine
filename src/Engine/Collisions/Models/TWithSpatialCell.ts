export type TWithSpatialCell = Readonly<{
  getCell: () => number;
  setCell: (cell: number) => void;
}>;
