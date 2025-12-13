import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TWrapper } from '@/Abstract';
import type { TextType } from '@/Text/Constants';
import type { TElementWithCssAccessors } from '@/Text/Models';
import type { TAbstractTextWrapper } from '@/Text/Models/TAbstractTextWrapper';

export type TTextWrapper<T extends CSS2DObject | CSS3DObject> = TWrapper<T> & Readonly<{ type: TextType }> & TElementWithCssAccessors & TAbstractTextWrapper;
