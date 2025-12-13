import type { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IElement3dAccessors } from '@/Engine/Domains/Text/Models';

import type { IAbstractTextWrapper } from './IAbstractTextWrapper';

export type IText3dWrapper = IWrapper<CSS3DObject> & IElement3dAccessors & IAbstractTextWrapper;
