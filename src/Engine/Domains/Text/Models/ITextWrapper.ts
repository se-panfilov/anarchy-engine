import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { TextType } from '@/Engine/Domains/Text/Constants';
import type { IElementWithCssAccessors } from '@/Engine/Domains/Text/Models';
import type { IAbstractTextWrapper } from '@/Engine/Domains/Text/Models/IAbstractTextWrapper';

export type ITextWrapper<T extends CSS2DObject | CSS3DObject> = IWrapper<T> & Readonly<{ type: TextType }> & IElementWithCssAccessors & IAbstractTextWrapper;
