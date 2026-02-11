import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TextType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TAbstractTextWrapper, TElementWithCssAccessors } from '@hellpig/anarchy-engine/Text/Models';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export type TTextWrapper<T extends CSS2DObject | CSS3DObject> = TWrapper<T> & Readonly<{ type: TextType }> & TElementWithCssAccessors & TAbstractTextWrapper;
