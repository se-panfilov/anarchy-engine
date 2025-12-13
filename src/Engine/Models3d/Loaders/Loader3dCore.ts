import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { LoaderType, TAbstractLoader, TAbstractResourceAsyncRegistry, TAbstractResourceConfig, TProtectedRegistry } from '@/Engine/Abstract';
import { AbstractLoader } from '@/Engine/Abstract';

export function Loader3dCore<C extends TAbstractResourceConfig>(registry: TProtectedRegistry<TAbstractResourceAsyncRegistry<GLTF>>, type: LoaderType): TAbstractLoader<GLTF, C> {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  return AbstractLoader(models3dLoader, registry, type);
}
