import type { TSpatialCell } from './TSpatialCell';
import type { TSpatialCellId } from './TSpatialCellId';

export type TSpatialCellSerializedData = Omit<TSpatialCell, 'id' | 'objects'> & Readonly<{ id: TSpatialCellId; objects: ReadonlyArray<string> }>;
