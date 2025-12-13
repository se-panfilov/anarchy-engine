import type { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IElement2dAccessors } from '@/Engine/Domains/Text/Models';

import type { IAbstractTextWrapper } from './IAbstractTextWrapper';

// TODO (S.Panfilov) IElement2dAccessors?
export type IText3dWrapper = IWrapper<CSS3DObject> & IElement2dAccessors & IAbstractTextWrapper;
