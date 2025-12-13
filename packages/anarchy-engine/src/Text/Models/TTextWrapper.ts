import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TextType } from '@Anarchy/Engine/Text/Constants';
import type { TElementWithCssAccessors } from '@Anarchy/Engine/Text/Models';
import type { TAbstractTextWrapper } from '@Anarchy/Engine/Text/Models/TAbstractTextWrapper';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export type TTextWrapper<T extends CSS2DObject | CSS3DObject> = TWrapper<T> & Readonly<{ type: TextType }> & TElementWithCssAccessors & TAbstractTextWrapper;
