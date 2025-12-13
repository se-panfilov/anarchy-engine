import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { IElement2dAccessors } from '@/Engine/Domains/Text/Models';
import type { IMovableXYZ, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type ITextWrapper = IWrapper<CSS2DObject> & IElement2dAccessors & IMovableXYZ & IRotatable & IScalable & IWithObject3d & IWithTags<TextTag>;
