import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import { BehaviorSubject, combineLatest, startWith, Subject } from 'rxjs';
import type { MeshPhysicalMaterial, MeshStandardMaterial } from 'three';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, IControlsRegistry, IOrbitControlsWrapper, ISpace, ISpaceConfig, IVector3Wrapper } from '@/Engine';
import { buildSpaceFromConfig, EulerWrapper, isDefined, isNotDefined, keyboardService, KeyCode, LookUpStrategy, TextType, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase-10.json';

//Showcase 10: Complex Materials
export function showcase(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();

  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { textService } = space.services;
  const { actorService, controlsService, envMapService } = space.services;
  const actorRegistry: IActorAsyncRegistry = actorService.getRegistry();
  const controlsRegistry: IControlsRegistry = controlsService.getRegistry();

  const currentActor$: Subject<IActorWrapperAsync> = new Subject();

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
  ]).subscribe(async ([material, type]: ReadonlyArray<string>): Promise<void> => {
    const actor: IActorWrapperAsync = await actorRegistry.findByTagsAsync([material, type], LookUpStrategy.Every);
    // console.log('material', material, 'type', type, actor.getTags());
    if (isNotDefined(actor)) throw new Error(`Actor with tag "${material}" is not found`);
    currentActor$.next(actor);
  });

  currentActor$.subscribe(moveCameraToActor);

  function addTextToActor(actor: IActorWrapperAsync): void {
    const position: IVector3Wrapper = actor.getPosition();
    const x: number = position.getX();
    const y: number = position.getY();
    const z: number = position.getZ();

    textService.create({
      type: TextType.Text3d,
      text: actor.getTags()[0],
      cssProps: { fontSize: '0.3px', color: 'red' },
      tags: [],
      position: Vector3Wrapper({ x: x, y: y - 0.5, z: z + 1.2 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 })
    });
  }

  keyboardService.onKey(KeyCode.D).pressing$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value + 1) % materials.length);
  });

  keyboardService.onKey(KeyCode.A).pressing$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value - 1 + materials.length) % materials.length);
  });

  keyboardService.onKey(KeyCode.W).pressing$.subscribe((): void => {
    currentMaterialTypeIndex$.next((currentMaterialTypeIndex$.value + 1) % materialType.length);
  });

  keyboardService.onKey(KeyCode.S).pressing$.subscribe((): void => {
    currentMaterialTypeIndex$.next((currentMaterialTypeIndex$.value - 1 + materialType.length) % materialType.length);
  });

  const state = {
    controllers: [] as ReadonlyArray<GUI | Controller>
  };

  function moveCameraToActor(actor: IActorWrapperAsync): void {
    state.controllers.forEach((controller: GUI | Controller): void => controller.destroy());
    // eslint-disable-next-line functional/immutable-data
    state.controllers = addGuiToActor(actor);
    const position: IVector3Wrapper = actor.getPosition();
    const orbitControls: IOrbitControlsWrapper | undefined = controlsRegistry.findByTag('orbit');
    if (isNotDefined(orbitControls)) throw new Error('Orbit controls are not found');
    orbitControls.setDamping(true);
    orbitControls.moveToTargetSmoothly(position);
  }

  void envMapService.load('/Showcase/hdr/urban_alley_01_4k.hdr');

  actorRegistry.added$.subscribe(addTextToActor);

  function addGuiToActor(actor: IActorWrapperAsync): ReadonlyArray<GUI | Controller> {
    let controllers: ReadonlyArray<GUI | Controller> = [];
    const isMetalness: boolean = isDefined((actor.entity.material as MeshStandardMaterial).metalness);
    const isRoughness: boolean = isDefined((actor.entity.material as MeshStandardMaterial).roughness);
    const isAoMap: boolean = isDefined((actor.entity.material as MeshStandardMaterial).aoMap);
    const isDisplacementMap: boolean = isDefined((actor.entity.material as MeshStandardMaterial).displacementMap);
    const isNormalMap: boolean = isDefined((actor.entity.material as MeshStandardMaterial).normalMap);
    const isClearCoat: boolean = isDefined((actor.entity.material as MeshPhysicalMaterial).clearcoat);
    const isSheen: boolean = isDefined((actor.entity.material as MeshPhysicalMaterial).sheen);
    const isIridescence: boolean = isDefined((actor.entity.material as MeshPhysicalMaterial).iridescence);
    const isTransmission: boolean = isDefined((actor.entity.material as MeshPhysicalMaterial).transmission);

    if (isMetalness) controllers = [...controllers, gui.add(actor.entity.material, 'metalness').min(0).max(1).step(0.0001)];
    if (isRoughness) controllers = [...controllers, gui.add(actor.entity.material, 'roughness').min(0).max(1).step(0.0001)];
    if (isAoMap) controllers = [...controllers, gui.add(actor.entity.material, 'aoMapIntensity').min(0).max(1).step(0.0001)];
    if (isDisplacementMap) controllers = [...controllers, gui.add(actor.entity.material, 'displacementScale').min(0).max(1).step(0.0001)];
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
            (actor.entity.material as MeshStandardMaterial).normalScale.set(value, value);
          })
      ];
    }
    if (isClearCoat) {
      controllers = [...controllers, gui.add(actor.entity.material, 'clearcoat').min(0).max(1).step(0.0001)];
      controllers = [...controllers, gui.add(actor.entity.material, 'clearcoatRoughness').min(0).max(1).step(0.0001)];
    }

    if (isSheen) {
      controllers = [...controllers, gui.add(actor.entity.material, 'sheen').min(0).max(1).step(0.0001)];
      controllers = [...controllers, gui.add(actor.entity.material, 'sheenRoughness').min(0).max(1).step(0.0001)];
      controllers = [...controllers, gui.addColor(actor.entity.material, 'sheenColor')];
    }

    if (isIridescence) {
      controllers = [...controllers, gui.add(actor.entity.material, 'iridescence').min(0).max(1).step(0.0001)];
      controllers = [...controllers, gui.add(actor.entity.material, 'iridescenceIOR').min(0).max(2.333).step(0.0001)];
      controllers = [
        ...controllers,
        gui
          .add((actor.entity.material as MeshPhysicalMaterial).iridescenceThicknessRange, '0')
          .min(0)
          .max(1000)
          .step(1)
      ];
      controllers = [
        ...controllers,
        gui
          .add((actor.entity.material as MeshPhysicalMaterial).iridescenceThicknessRange, '1')
          .min(0)
          .max(1000)
          .step(1)
      ];
    }

    if (isTransmission) {
      controllers = [...controllers, gui.add(actor.entity.material, 'transmission').min(0).max(1).step(0.0001)];
      controllers = [...controllers, gui.add(actor.entity.material, 'ior').min(1).max(10).step(0.0001)]; //diamond ior 2.417, water 1.333, glass 1.5, air 1.0003
      controllers = [...controllers, gui.add(actor.entity.material, 'thickness').min(0).max(1).step(0.0001)];
    }

    return controllers;
  }

  function start(): void {
    space.start();
  }

  return { start, space };
}
