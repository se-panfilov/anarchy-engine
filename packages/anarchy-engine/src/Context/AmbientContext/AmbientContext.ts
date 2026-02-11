import { ContainerDecorator } from '@Anarchy/Engine/Global';

import type { TAmbientContext } from './Models';

export const ambientContext: TAmbientContext = { globalContainer: ContainerDecorator(window) };
