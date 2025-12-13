import type { TGlobalContainerDecorator } from '@/Engine/Global';
import { ContainerDecorator } from '@/Engine/Global';

import type { TAmbientContext } from './Models';

const container: TGlobalContainerDecorator = ContainerDecorator(window);

export const ambientContext: TAmbientContext = { container };
