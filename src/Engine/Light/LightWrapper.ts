import { AmbientLight, DirectionalLight } from 'three';
import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { LightParams } from '@Engine/Light/Models/LightParams';
import type { WrappedLight } from '@Engine/Light/Models/WrappedLight';

export function LightWrapper(params: LightParams): WrappedLight {
  let light: AmbientLight | DirectionalLight | undefined = getLight(params);
  const destroyed$ = new Subject<void>();

  function destroy() {
    light = undefined;
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `light_wrapper_${nanoid()}`, light, destroy, destroyed$ };
}

function getLight({ type, color, intensity }: LightParams): AmbientLight | DirectionalLight | never {
  switch (type) {
    case 'ambient':
      return new AmbientLight(color, intensity);
    case 'directional':
      return new DirectionalLight(color, intensity);
    default:
      throw new Error('Unknown light type');
  }
}
