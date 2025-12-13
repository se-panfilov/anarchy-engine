import type { Mesh } from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TWrapper } from '@/Engine/Abstract';
import type { TextType } from '@/Engine/Text/Constants';
import type { TElementWithCssAccessors } from '@/Engine/Text/Models';
import type { TAbstractTextWrapper } from '@/Engine/Text/Models/TAbstractTextWrapper';

export type TTextWrapper<T extends CSS2DObject | CSS3DObject | Mesh> = TWrapper<T> & Readonly<{ type: TextType }> & TElementWithCssAccessors & TAbstractTextWrapper;
