// import GUI from 'lil-gui';
import { BehaviorSubject } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig, IOrbitControlsWrapper, IVector3Wrapper } from '@/Engine';
import { ambientContext, buildLevelFromConfig, CameraTag, envMapService, EulerWrapper, isNotDefined, TextType, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-10-complex-materials.config.json';

const { mouseClickWatcher } = ambientContext;

//Showcase 10: Complex Materials
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  // const gui = new GUI();

  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory, actorRegistry, cameraRegistry, controlsRegistry } = level.entities;
  const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Active);
  if (isNotDefined(camera)) throw new Error('Camera is not found');

  const materials: ReadonlyArray<string> = ['standard', 'basic', 'phong', 'lambert', 'toon', 'physical', 'matcap'];
  const currentMaterialIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  const currentMaterial$: BehaviorSubject<string> = new BehaviorSubject(materials[currentMaterialIndex$.value]);
  const initialActor: IActorWrapper | undefined = actorRegistry.getUniqByTag(currentMaterial$.value);
  if (isNotDefined(initialActor)) throw new Error(`Actor with tag "${currentMaterialIndex$.value}" is not found`);
  const currentActor$: BehaviorSubject<IActorWrapper> = new BehaviorSubject(initialActor);
  currentMaterialIndex$.subscribe((index: number): void => currentMaterial$.next(materials[index]));
  currentMaterial$.subscribe((material: string): void => {
    const actor: IActorWrapper | undefined = actorRegistry.getUniqByTag(material);
    if (isNotDefined(actor)) throw new Error(`Actor with tag "${material}" is not found`);
    currentActor$.next(actor);
  });

  currentActor$.subscribe(moveCameraToActor);
  actorRegistry.getAll().forEach(addTextToActor);

  function addTextToActor(actor: IActorWrapper): void {
    const position: IVector3Wrapper = actor.getPosition();
    const x: number = position.getX();
    const y: number = position.getY();
    const z: number = position.getZ();

    textFactory.create({
      type: TextType.Text3d,
      text: actor.getTags()[0] + ' material',
      cssProps: { fontSize: '0.3px', color: 'red' },
      tags: [],
      position: Vector3Wrapper({ x: x, y: y - 0.5, z: z + 1.2 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 })
    });
  }

  mouseClickWatcher.value$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value + 1) % materials.length);
  });

  function moveCameraToActor(actor: IActorWrapper): void {
    const position: IVector3Wrapper = actor.getPosition();
    const orbitControls: IOrbitControlsWrapper | undefined = controlsRegistry.getUniqByTag('orbit');
    if (isNotDefined(orbitControls)) throw new Error('Orbit controls are not found');
    orbitControls.setDamping(true);
    orbitControls.moveToTargetSmoothly(position);
  }

  void envMapService.load('/Showcase/hdr/urban_alley_01_4k.hdr').then((envMap) => {
    console.log('envMap', envMap);
  });

  function start(): void {
    level.start();

    const actor = actorRegistry.getUniqByTag('standard');
    // console.log('standard', actor);
    // console.log('standard entity', actor?.entity);
    console.log('standard entity', actor?.entity.material);
    // setTimeout(() => {
    //   console.log('standard entity material', actor?.entity.material);
    //   gui.add(actor.entity.material, 'metalness').min(0).max(1).step(0.0001)
    //   // gui.add(material, 'roughness').min(0).max(1).step(0.0001)
    // }, 1000)
  }

  return { start, level };
}
