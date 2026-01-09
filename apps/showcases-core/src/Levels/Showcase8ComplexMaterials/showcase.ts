import type {
  TActor,
  TActorRegistry,
  TAnyControlsWrapper,
  TControlsRegistry,
  TReadonlyVector3,
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
} from '@Anarchy/Engine';
import { ControlsType, getTags, isOrbitControls, KeyCode, LookUpStrategy, onKey, spaceService, TextType } from '@Anarchy/Engine';
import { asRecord, isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import { BehaviorSubject, combineLatest, startWith, Subject } from 'rxjs';
import type { Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from 'three';
import { Euler, Vector3 } from 'three';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter, watchActiveRendererReady, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);
  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  watchActiveRendererReady(space);
  const gui: GUI = new GUI();
  const { textService, keyboardService } = space.services;

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const { actorService, controlsService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const controlsRegistry: TControlsRegistry = controlsService.getRegistry();

  const currentActor$: Subject<TActor> = new Subject();

  const materials: ReadonlyArray<string> = ['standard', 'physics', 'basic', 'phong', 'lambert', 'toon', 'matcap'];
  const currentMaterialIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  const currentMaterial$: Subject<string> = new Subject();

  currentMaterialIndex$.subscribe((index: number): void => currentMaterial$.next(materials[index]));

  const materialType: ReadonlyArray<string> = ['textile', 'glass', 'wood', 'metal'];
  const currentMaterialTypeIndex$: BehaviorSubject<number> = new BehaviorSubject(3);
  const currentMaterialType$: Subject<string> = new Subject();
  currentMaterialTypeIndex$.subscribe((index: number): void => currentMaterialType$.next(materialType[index]));

  combineLatest([currentMaterial$.pipe(startWith(materials[0])), currentMaterialType$.pipe(startWith(materialType[3]))]).subscribe(([material, type]: ReadonlyArray<string>): void => {
    const actor: TActor = actorRegistry.getByTags([material, type], LookUpStrategy.Every);
    currentActor$.next(actor);
  });

  currentActor$.subscribe(moveCameraToActor);

  let textCounter: number = 0;

  function addTextToActor(pack: TRegistryPack<TActor>): void {
    const actor: TActor = pack.value;
    const position: TReadonlyVector3 = actor.drive.position$.value;
    const { x, y, z } = position;

    textService.create({
      name: `${actor.getName()}_text_${textCounter++}`,
      type: TextType.Text3d,
      text: getTags(actor)[0],
      cssProps: { fontSize: '0.3px', color: 'red' },
      position: new Vector3(x, y - 0.5, z + 1.2),
      rotation: new Euler(-1.57, 0, 0)
    });
  }

  keyboardService.keys$.pipe(onKey(KeyCode.D)).subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value + 1) % materials.length);
  });

  keyboardService.keys$.pipe(onKey(KeyCode.A)).subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value - 1 + materials.length) % materials.length);
  });

  keyboardService.keys$.pipe(onKey(KeyCode.W)).subscribe((): void => {
    currentMaterialTypeIndex$.next((currentMaterialTypeIndex$.value + 1) % materialType.length);
  });

  keyboardService.keys$.pipe(onKey(KeyCode.S)).subscribe((): void => {
    currentMaterialTypeIndex$.next((currentMaterialTypeIndex$.value - 1 + materialType.length) % materialType.length);
  });

  const state = {
    controllers: [] as ReadonlyArray<GUI | Controller>
  };

  function moveCameraToActor(actor: TActor): void {
    state.controllers.forEach((controller: GUI | Controller): void => controller.destroy());

    state.controllers = addGuiToActor(actor);
    const position: TReadonlyVector3 = actor.drive.position$.value;
    const orbitControls: TAnyControlsWrapper = controlsRegistry.getByName('orbit_controls');
    if (!isOrbitControls(orbitControls)) throw new Error(`Active controls are not of type "${ControlsType.OrbitControls}", but ${orbitControls.getType()}`);
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
    const isClearcoatRoughness: boolean = isDefined((model3d.material as MeshPhysicalMaterial).clearcoatRoughness);
    const isSheen: boolean = isDefined((model3d.material as MeshPhysicalMaterial).sheen);
    const isIridescence: boolean = isDefined((model3d.material as MeshPhysicalMaterial).iridescence);
    const isIridescenceIOR: boolean = isDefined((model3d.material as MeshPhysicalMaterial).iridescenceIOR);
    const isTransmission: boolean = isDefined((model3d.material as MeshPhysicalMaterial).transmission);
    const isIor: boolean = isDefined((model3d.material as MeshPhysicalMaterial).ior);
    const isThickness: boolean = isDefined((model3d.material as MeshPhysicalMaterial).thickness);

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
    }

    if (isClearcoatRoughness) {
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
    }

    if (isIridescenceIOR) {
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
    }

    if (isIor) {
      controllers = [
        ...controllers,
        gui
          .add(model3d.material as TWithIOR, 'ior')
          .min(1)
          .max(10)
          .step(0.0001)
      ]; //diamond ior 2.417, water 1.333, glass 1.5, air 1.0003
    }

    if (isThickness) {
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

  space.start$.next(true);
}
