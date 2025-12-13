import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { LoaderType, TAbstractLoader, TAbstractResourceAsyncRegistry, TAbstractResourceConfig } from '@/Engine/Abstract';
import { AbstractLoader } from '@/Engine/Abstract';

export function Loader3dCore<T, C extends TAbstractResourceConfig>(registry: TAbstractResourceAsyncRegistry<T>, type: LoaderType): TAbstractLoader<T, C> {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  return AbstractLoader(models3dLoader, registry, type);
}
