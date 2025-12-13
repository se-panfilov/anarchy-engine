import type { TSpatialCell, TSpatialCellId } from './TSpatialCell';

export type TSpatialCellSerializedData = Omit<TSpatialCell, 'id' | 'objects'> & Readonly<{ id: TSpatialCellId; objects: ReadonlyArray<string> }>;
