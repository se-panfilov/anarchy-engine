import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { LoaderType, TAbstractLoader, TAbstractMetaInfoRegistry, TAbstractResourceAsyncRegistry, TAbstractResourceConfig } from '@/Abstract';
import { AbstractLoader } from '@/Abstract';

export function Loader3dCore<T, RC extends TAbstractResourceConfig>(
  registry: TAbstractResourceAsyncRegistry<T>,
  metaInfoRegistry: TAbstractMetaInfoRegistry<RC>,
  type: LoaderType
): TAbstractLoader<T, RC, TAbstractResourceAsyncRegistry<T>, TAbstractMetaInfoRegistry<RC>> {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  return AbstractLoader(models3dLoader, registry, metaInfoRegistry, type);
}
