import GUI from 'lil-gui';
import { BehaviorSubject, Subject } from 'rxjs';
import type { MeshStandardMaterial } from 'three';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ILevel, ILevelConfig, IOrbitControlsWrapper, IVector3Wrapper } from '@/Engine';
import { buildLevelFromConfig, envMapService, EulerWrapper, isDefined, isNotDefined, keyboardService, KeyCode, TextType, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-10-complex-materials.config.json';

//Showcase 10: Complex Materials
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();

  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory, actorRegistry, controlsRegistry } = level.entities;

  const materials: ReadonlyArray<string> = ['standard', 'basic', 'phong', 'lambert', 'toon', 'physical', 'matcap'];
  const currentMaterialIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  const currentMaterial$: Subject<string> = new Subject();
  const currentActor$: Subject<IActorWrapperAsync> = new Subject();
  currentMaterialIndex$.subscribe((index: number): void => currentMaterial$.next(materials[index]));
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  currentMaterial$.subscribe(async (material: string): Promise<void> => {
    const actor: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync(material);
    if (isNotDefined(actor)) throw new Error(`Actor with tag "${material}" is not found`);
    currentActor$.next(actor);
  });

  currentActor$.subscribe(moveCameraToActor);
  actorRegistry.getAll().forEach(addTextToActor);

  function addTextToActor(actor: IActorWrapperAsync): void {
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

  keyboardService.onKey(KeyCode.D).pressing$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value + 1) % materials.length);
  });

  keyboardService.onKey(KeyCode.A).pressing$.subscribe((): void => {
    currentMaterialIndex$.next((currentMaterialIndex$.value - 1 + materials.length) % materials.length);
  });

  function moveCameraToActor(actor: IActorWrapperAsync): void {
    const position: IVector3Wrapper = actor.getPosition();
    const orbitControls: IOrbitControlsWrapper | undefined = controlsRegistry.getUniqByTag('orbit');
    if (isNotDefined(orbitControls)) throw new Error('Orbit controls are not found');
    orbitControls.setDamping(true);
    orbitControls.moveToTargetSmoothly(position);
  }

  void envMapService.load('/Showcase/hdr/urban_alley_01_4k.hdr').then((envMap) => {
    console.log('envMap', envMap);
  });

  actorRegistry.added$.subscribe((actor: IActorWrapperAsync) => {
    const isMetalness: boolean = isDefined((actor.entity.material as MeshStandardMaterial).metalness);
    const isRoughness: boolean = isDefined((actor.entity.material as MeshStandardMaterial).roughness);
    const hasTunableProps = isMetalness || isRoughness;
    if (hasTunableProps) gui.addFolder(actor.getTags()[0]);
    if (isMetalness) gui.add(actor.entity.material, 'metalness').min(0).max(1).step(0.0001);
    if (isRoughness) gui.add(actor.entity.material, 'roughness').min(0).max(1).step(0.0001);
  });

  function start(): void {
    level.start();
  }

  return { start, level };
}
