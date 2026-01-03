import type { LoaderType, TAbstractLoader, TAbstractMetaInfoRegistry, TAbstractResourceAsyncRegistry, TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';
import { AbstractLoader } from '@Anarchy/Engine/Abstract';
import type { TDracoLoaderSettings } from '@Anarchy/Engine/ThreeLib';
import type { LoadingManager } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Loader3dCore<T, RC extends TAbstractResourceConfig>(
  registry: TAbstractResourceAsyncRegistry<T>,
  metaInfoRegistry: TAbstractMetaInfoRegistry<RC>,
  type: LoaderType,
  loadingManager: LoadingManager,
  settings: TDracoLoaderSettings
): TAbstractLoader<T, RC, TAbstractResourceAsyncRegistry<T>, TAbstractMetaInfoRegistry<RC>> {
  const models3dLoader = new GLTFLoader(loadingManager);
  const dracoLoader = new DRACOLoader(loadingManager);
  const { dracoLoaderDecoderPath, dracoLoaderDecoderType } = settings;
  dracoLoader.setDecoderPath(dracoLoaderDecoderPath ?? 'three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: dracoLoaderDecoderType ?? 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  return AbstractLoader(models3dLoader, registry, metaInfoRegistry, type);
}
