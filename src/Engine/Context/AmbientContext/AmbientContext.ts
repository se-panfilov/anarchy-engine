import type { TContainerDecorator } from '@/Engine/Global';
import { ContainerDecorator } from '@/Engine/Global';

import type { TAmbientContext } from './Models';

const container: TContainerDecorator = ContainerDecorator(window);

export const ambientContext: TAmbientContext = { container };
