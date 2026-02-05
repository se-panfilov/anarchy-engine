import type { TMaterialConfigOptions, TPhysicalMaterialWrapper, TSpace, TSpaceConfig } from '@hellpig/anarchy-engine';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';
import { BehaviorSubject } from 'rxjs';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceMaterials.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceMaterialsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onChange: (space: TSpace): void => {
    adjustMaterial(space, 'surface_material', {
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      displacementScale: 0.2,
      ior: 2.5,
      iridescence: 1.655,
      iridescenceIOR: 2,
      metalness: 0.97,
      roughness: 0.8,
      thickness: 0,
      transmission: 0.66
    });

    adjustMaterial(space, 'standard_metal', { displacementScale: 0.2 });

    adjustMaterial(space, 'physics_metal', {
      clearcoat: 1.1,
      clearcoatRoughness: 0.13,
      displacementScale: 0.2,
      ior: 2.2,
      iridescence: 0.7,
      iridescenceIOR: 1.7,
      metalness: 1,
      roughness: 0.9,
      thickness: 0.1,
      transmission: 0.1
    });

    adjustMaterial(space, 'basic_metal', {});

    adjustMaterial(space, 'phong_metal', { displacementScale: 0.2 });

    adjustMaterial(space, 'lambert_metal', { displacementScale: 0.2 });
    adjustMaterial(space, 'toon_metal', { displacementScale: 0.2 });
    adjustMaterial(space, 'matcap_metal', { displacementScale: 0.2 });
    adjustMaterial(space, 'standard_wood', { displacementScale: 0.2 });
    adjustMaterial(space, 'physics_wood', { displacementScale: 0.2 });
    adjustMaterial(space, 'basic_wood', {});
    adjustMaterial(space, 'phong_wood', { displacementScale: 0.2 });
    adjustMaterial(space, 'lambert_wood', { displacementScale: 0.2 });
    adjustMaterial(space, 'toon_wood', { displacementScale: 0.2 });
    adjustMaterial(space, 'matcap_wood', { displacementScale: 0.2 });
    adjustMaterial(space, 'standard_glass', {
      metalness: 0.5,
      roughness: 0.5
    });

    adjustMaterial(space, 'physics_glass', {
      clearcoat: 0.8,
      clearcoatRoughness: 0.09,
      displacementScale: 0.2,
      ior: 1.76,
      iridescence: 1,
      iridescenceIOR: 1.44,
      metalness: 0.1,
      roughness: 0.1,
      thickness: 0.1,
      transmission: 0.6
    });

    adjustMaterial(space, 'basic_glass', {});
    adjustMaterial(space, 'phong_glass', { displacementScale: 0.2 });
    adjustMaterial(space, 'lambert_glass', { displacementScale: 0.2 });
    adjustMaterial(space, 'toon_glass', { displacementScale: 0.2 });
    adjustMaterial(space, 'matcap_glass', { displacementScale: 0.2 });
    adjustMaterial(space, 'standard_textile', { displacementScale: 0.2 });
    adjustMaterial(space, 'physics_textile', { displacementScale: 0.2 });
    adjustMaterial(space, 'basic_textile', {});
    adjustMaterial(space, 'phong_textile', { displacementScale: 0.2 });
    adjustMaterial(space, 'lambert_textile', { displacementScale: 0.2 });
    adjustMaterial(space, 'toon_textile', { displacementScale: 0.2 });
    adjustMaterial(space, 'matcap_textile', { displacementScale: 0.2 });
  }
};

function adjustMaterial(space: TSpace, materialName: string, options: TMaterialConfigOptions): void | never {
  const materialW: TPhysicalMaterialWrapper = space.services.materialService.getRegistry().getByName(materialName) as TPhysicalMaterialWrapper;

  Object.entries(options).forEach(([key, value]): void => {
    if (isNotDefined(value)) return;

    // eslint-disable-next-line functional/immutable-data
    (materialW as any).entity[key] = value;
  });
}
