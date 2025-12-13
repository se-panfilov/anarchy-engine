import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import { BehaviorSubject, combineLatest, startWith, Subject } from 'rxjs';
import type { Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';
import { Euler } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type {
  TActor,
  TActorRegistry,
  TAppCanvas,
  TControlsRegistry,
  TEngine,
  TOrbitControlsWrapper,
  TRegistryPack,
  TSpace,
  TSpaceConfig,
  TWithAoIntensity,
  TWithClearcoat,
  TWithClearcoatRoughness,
  TWithDisplacementScale,
  TWithIOR,
  TWithIridescence,
  TWithIridescenceIOR,
  TWithMetalness,
  TWithRoughness,
  TWithSheen,
  TWithSheenColor,
  TWithSheenRoughness,
  TWithThickness,
  TWithTransmission
} from '@/Engine';
import { ambientContext, Engine, getTags, isDefined, isNotDefined, KeyCode, LookUpStrategy, spaceService, TextType } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();

  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const { textService } = space.services;

  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;

  addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

  const { actorService, controlsService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const controlsRegistry: TControlsRegistry = controlsService.getRegistry();

  const currentActor$: Subject<TActor> = new Subject();

  const materials: ReadonlyArray<string> = ['standard', 'physical', 'basic', 'phong', 'lambert', 'toon', 'matcap'];
  const currentMaterialIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  const currentMaterial$: Subject<string> = new Subject();

  currentMaterialIndex$.subscribe((index: number): void => currentMaterial$.next(materials[index]));

  const materialType: ReadonlyArray<string> = ['textile', 'glass', 'wood', 'metal'];
  const currentMaterialTypeIndex$: BehaviorSubject<number> = new BehaviorSubject(3);
  const currentMaterialType$: Subject<string> = new Subject();
  currentMaterialTypeIndex$.subscribe((index: number): void => currentMaterialType$.next(materialType[index]));

  combineLatest([
    currentMaterial$.pipe(startWith(materials[0])),
    currentMaterialType$.pipe(startWith(materialType[3]))
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ]).subscribe(([material, type]: ReadonlyArray<string>): void => {
    const actor: TActor | undefined = actorRegistry.findByTags([material, type], LookUpStrategy.Every);
    if (isNotDefined(actor)) throw new Error(`Actor with tag "${material}" is not found`);
    currentActor$.next(actor);
  });

  currentActor$.subscribe(moveCameraToActor);

  function addTextToActor(pack: TRegistryPack<TActor>): void {
    const actor: TActor = pack.value;
    const position: Vector3 = actor.drive.position$.value;
    const { x, y, z } = position;

    textService.create({
      type: TextType.Text3d,
      text: getTags(actor)[0],
      cssProps: { fontSize: '0.3px', color: 'red' },
      position: new Vector3(x, y - 0.5, z + 1.2),
      rotation: new Euler(-1.57, 0, 0)
    });
  }

  keyboardService.onKey(KeyCode.D).pressed$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value + 1) % materials.length);
  });

  keyboardService.onKey(KeyCode.A).pressed$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value - 1 + materials.length) % materials.length);
  });

  keyboardService.onKey(KeyCode.W).pressed$.subscribe((): void => {
    currentMaterialTypeIndex$.next((currentMaterialTypeIndex$.value + 1) % materialType.length);
  });

  keyboardService.onKey(KeyCode.S).pressed$.subscribe((): void => {
    currentMaterialTypeIndex$.next((currentMaterialTypeIndex$.value - 1 + materialType.length) % materialType.length);
  });

  const state = {
    controllers: [] as ReadonlyArray<GUI | Controller>
  };

  function moveCameraToActor(actor: TActor): void {
    state.controllers.forEach((controller: GUI | Controller): void => controller.destroy());
    // eslint-disable-next-line functional/immutable-data
    state.controllers = addGuiToActor(actor);
    const position: Vector3 = actor.drive.position$.value;
    const orbitControls: TOrbitControlsWrapper | undefined = controlsRegistry.findByTag('orbit');
    if (isNotDefined(orbitControls)) throw new Error('Orbit controls are not found');
    orbitControls.setDamping(true);
    orbitControls.moveToTargetSmoothly(position);
  }

  actorRegistry.added$.subscribe(addTextToActor);

  function addGuiToActor(actor: TActor): ReadonlyArray<GUI | Controller> {
    let controllers: ReadonlyArray<GUI | Controller> = [];
    const model3d: Mesh = actor.model3d.getRawModel3d() as Mesh;
    const isMetalness: boolean = isDefined((model3d.material as MeshStandardMaterial).metalness);
    const isRoughness: boolean = isDefined((model3d.material as MeshStandardMaterial).roughness);
    const isAoMap: boolean = isDefined((model3d.material as MeshStandardMaterial).aoMap);
    const isDisplacementMap: boolean = isDefined((model3d.material as MeshStandardMaterial).displacementMap);
    const isNormalMap: boolean = isDefined((model3d.material as MeshStandardMaterial).normalMap);
    const isClearCoat: boolean = isDefined((model3d.material as MeshPhysicalMaterial).clearcoat);
    const isSheen: boolean = isDefined((model3d.material as MeshPhysicalMaterial).sheen);
    const isIridescence: boolean = isDefined((model3d.material as MeshPhysicalMaterial).iridescence);
    const isTransmission: boolean = isDefined((model3d.material as MeshPhysicalMaterial).transmission);

    if (isMetalness)
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithMetalness, 'metalness')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
    if (isRoughness)
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithRoughness, 'roughness')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
    if (isAoMap)
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithAoIntensity, 'aoMapIntensity')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
    if (isDisplacementMap)
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithDisplacementScale, 'displacementScale')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
    if (isNormalMap) {
      const scale = { normalScale: 1 };
      controllers = [
        ...controllers,
        gui
          .add(scale, 'normalScale')
          .min(0)
          .max(1)
          .step(0.0001)
          .onChange((value: number): void => {
            (model3d.material as MeshStandardMaterial).normalScale.set(value, value);
          })
      ];
    }
    if (isClearCoat) {
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithClearcoat, 'clearcoat')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithClearcoatRoughness, 'clearcoatRoughness')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
    }

    if (isSheen) {
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithSheen, 'sheen')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithSheenRoughness, 'sheenRoughness')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
      controllers = [...controllers, gui.addColor(model3d.material as TWithSheenColor, 'sheenColor')];
    }

    if (isIridescence) {
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithIridescence, 'iridescence')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithIridescenceIOR, 'iridescenceIOR')
          .min(0)
          .max(2.333)
          .step(0.0001)
      ];
      controllers = [
        ...controllers,
        gui
          .add((model3d.material as MeshPhysicalMaterial).iridescenceThicknessRange, '0')
          .min(0)
          .max(1000)
          .step(1)
      ];
      controllers = [
        ...controllers,
        gui
          .add((model3d.material as MeshPhysicalMaterial).iridescenceThicknessRange, '1')
          .min(0)
          .max(1000)
          .step(1)
      ];
    }

    if (isTransmission) {
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithTransmission, 'transmission')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithIOR, 'ior')
          .min(1)
          .max(10)
          .step(0.0001)
      ]; //diamond ior 2.417, water 1.333, glass 1.5, air 1.0003
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithThickness, 'thickness')
          .min(0)
          .max(1)
          .step(0.0001)
      ];
    }

    return controllers;
  }

  function start(): void {
    engine.start();
  }

  return { start, space };
}
