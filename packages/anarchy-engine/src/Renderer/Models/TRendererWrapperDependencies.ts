import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import type { TRenderLoop } from '@hellpig/anarchy-engine/Space';

export type TRendererWrapperDependencies = Readonly<{
  container: TContainerDecorator;
  renderLoop: TRenderLoop;
}>;
