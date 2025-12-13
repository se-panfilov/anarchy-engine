import type { TContainerDecorator } from '@Engine/Global';
import type { TRenderLoop } from '@Engine/Space';

export type TRendererWrapperDependencies = Readonly<{
  container: TContainerDecorator;
  renderLoop: TRenderLoop;
}>;
