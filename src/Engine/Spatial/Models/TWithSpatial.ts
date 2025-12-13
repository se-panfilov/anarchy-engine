import type { TSpatialData } from './TSpatialData';
import type { TSpatialMethods } from './TSpatialMethods';

export type TWithSpatial = Readonly<{
  spatial: Readonly<{ data: TSpatialData }> & TSpatialMethods;
}>;
