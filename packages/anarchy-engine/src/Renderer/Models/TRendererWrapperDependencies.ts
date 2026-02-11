import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TRenderLoop } from '@Anarchy/Engine/Space';

export type TRendererWrapperDependencies = Readonly<{
  container: TContainerDecorator;
  renderLoop: TRenderLoop;
}>;
