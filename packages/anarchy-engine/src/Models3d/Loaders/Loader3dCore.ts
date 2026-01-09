import type { LoaderType, TAbstractLoader, TAbstractMetaInfoRegistry, TAbstractResourceAsyncRegistry, TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';
import { AbstractLoader } from '@Anarchy/Engine/Abstract';
import type { TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager';
import type { TDracoLoaderSettings } from '@Anarchy/Engine/ThreeLib';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Loader3dCore<T, RC extends TAbstractResourceConfig>(
  registry: TAbstractResourceAsyncRegistry<T>,
  metaInfoRegistry: TAbstractMetaInfoRegistry<RC>,
  type: LoaderType,
  loadingManagerWrapper: TLoadingManagerWrapper,
  settings: TDracoLoaderSettings
): TAbstractLoader<T, RC, TAbstractResourceAsyncRegistry<T>, TAbstractMetaInfoRegistry<RC>> {
  const models3dLoader = new GLTFLoader(loadingManagerWrapper.entity);
  const dracoLoader = new DRACOLoader(loadingManagerWrapper.entity);
  const { dracoLoaderDecoderPath, dracoLoaderDecoderType } = settings;
  dracoLoader.setDecoderPath(dracoLoaderDecoderPath ?? 'three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: dracoLoaderDecoderType ?? 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  return AbstractLoader(models3dLoader, registry, metaInfoRegistry, type);
}
