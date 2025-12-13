import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IElement2dAccessors } from '@/Engine/Domains/Text/Models';
import type { IAbstractTextWrapper } from '@/Engine/Domains/Text/Models/IAbstractTextWrapper';

export type IText2dWrapper = IWrapper<CSS2DObject> & IElement2dAccessors & IAbstractTextWrapper;
