import type { TObject3DProps } from './TObject3DProps';

export type TObject3dMoveData = Required<Pick<TObject3DProps, 'position' | 'rotation' | 'scale'>>;
