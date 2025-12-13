import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActorAsyncRegistry,
  TActorWrapperAsync,
  TAnimationParams,
  TAppCanvas,
  TCameraRegistry,
  TControlsRegistry,
  TEngine,
  TMoverService,
  TSpace,
  TSpaceConfig,
  TText2dWrapper,
  TTextAnyWrapper,
  TWithCoordsXZ
} from '@/Engine';
import { buildSpaceFromConfig, createCirclePathXZ, defaultMoverServiceConfig, Easing, Engine, EulerWrapper, generateAnglesForCircle, isNotDefined, TextType, Vector3Wrapper } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  async function init(): Promise<void> {
    const { actorService, cameraService, controlsService, textService, loopService, mouseService } = space.services;
    const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();
    const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
    const controlsRegistry: TControlsRegistry = controlsService.getRegistry();
    const { text2dRegistry } = textService.getRegistries();

    controlsRegistry.getAll()[0]?.entity.target.set(6, 0, 0);
    cameraRegistry.getAll()[0]?.setPosition(Vector3Wrapper({ x: 6, y: 30, z: 0 }));

    const redActor: TActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('red');
    const blueActor: TActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('blue');
    const greenActor: TActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('green');
    if (isNotDefined(redActor) || isNotDefined(blueActor) || isNotDefined(greenActor)) throw new Error('Actors are not defined');

    const redText: TText2dWrapper | undefined = text2dRegistry.findByTag('red');
    const blueText: TText2dWrapper | undefined = text2dRegistry.findByTag('blue');
    const greenText: TText2dWrapper | undefined = text2dRegistry.findByTag('green');
    if (isNotDefined(redText) || isNotDefined(blueText) || isNotDefined(greenText)) throw new Error('Texts are not defined');

    let isClickBlocked: boolean = false;

    const animationParams: TAnimationParams = {
      duration: 2000,
      direction: 'normal'
    };

    const numberOfPoints: number = 160;
    const numberOfCircles: number = 1;
    const startAngle: number = 100;
    const radius: number = 15;
    const angleArray: ReadonlyArray<number> = generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle);

    const redPath: ReadonlyArray<TWithCoordsXZ> = createCirclePathXZ(angleArray, radius, { x: 0, z: 0 });
    const greenPath: ReadonlyArray<TWithCoordsXZ> = createCirclePathXZ(angleArray, radius - 2, { x: 0, z: 0 });
    const bluePath: ReadonlyArray<TWithCoordsXZ> = createCirclePathXZ(angleArray, radius - 4, { x: 0, z: 0 });

    let followersCb: Record<string, (() => void) | undefined> = {
      red: undefined,
      green: undefined,
      blue: undefined
    };

    const moverService: TMoverService = MoverService(loopService, defaultMoverServiceConfig);

    function follow(): void {
      if (isNotDefined(redText) || isNotDefined(blueText) || isNotDefined(greenText)) throw new Error('Texts are not defined');
      if (isNotDefined(redActor) || isNotDefined(blueActor) || isNotDefined(greenActor)) throw new Error('Actors are not defined');
      followersCb = { ...followersCb, red: moverService.followTarget(redText, redActor, { x: 1 }) };
      followersCb = { ...followersCb, blue: moverService.followTarget(blueText, blueActor, { x: 1 }) };
      followersCb = { ...followersCb, green: moverService.followTarget(greenText, greenActor, { x: 1 }) };
    }

    function stopFollowing(): void {
      followersCb.red?.();
      followersCb.green?.();
      followersCb.blue?.();
    }

    const notification: TTextAnyWrapper = textService.create({
      type: TextType.Text2d,
      text: 'Click is blocked',
      cssProps: {
        fontSize: '12px'
      },
      position: Vector3Wrapper({ x: 0, y: 0, z: 1 }),
      rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
      visible: false,
      tags: []
    });

    mouseService.clickLeftRelease$.subscribe(() => {
      if (isClickBlocked) {
        redActor.setVisible(false);
        notification.setVisible(true);
        // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
        setTimeout(() => notification.setVisible(false), 1000);
        return;
      }
      isClickBlocked = true;
      follow();

      void Promise.all([
        moverService.goByPath(redActor, redPath, { ...animationParams, easing: Easing.Linear }).then(() => console.log('red done')),
        moverService.goByPath(greenActor, greenPath, { ...animationParams, easing: Easing.EaseInCirc }).then(() => console.log('green done')),
        moverService.goByPath(blueActor, bluePath, { ...animationParams, easing: Easing.EaseInBack }).then(() => console.log('blue done'))
      ]).then(() => {
        isClickBlocked = false;
        stopFollowing();
      });
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
