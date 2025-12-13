import { Euler, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type {
  TActor,
  TActorRegistry,
  TAnimationParams,
  TAppCanvas,
  TCameraRegistry,
  TControlsRegistry,
  TEngine,
  TMeters,
  TMoverService,
  TRadians,
  TSpace,
  TSpaceConfig,
  TText2dWrapper,
  TTextAnyWrapper
} from '@/Engine';
import { ambientContext, createCirclePathXZ, defaultMoverServiceConfig, Easing, Engine, generateAnglesForCircle, isNotDefined, spaceService, TextType } from '@/Engine';
import { meters, radians } from '@/Engine/Measurements/Utils';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  function init(): void {
    const { actorService, cameraService, controlsService, textService, mouseService } = space.services;
    const { transformLoop } = space.loops;
    const actorRegistry: TActorRegistry = actorService.getRegistry();
    const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
    const controlsRegistry: TControlsRegistry = controlsService.getRegistry();
    const { text2dRegistry } = textService.getRegistries();

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    controlsRegistry.getAll()[0]?.entity.target.set(6, 0, 0);
    cameraRegistry.getAll()[0]?.drive.position$.next(new Vector3(6, 30, 0));

    const redActor: TActor | undefined = actorRegistry.findByTag('red');
    const blueActor: TActor | undefined = actorRegistry.findByTag('blue');
    const greenActor: TActor | undefined = actorRegistry.findByTag('green');
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
    const startAngle: TRadians = radians(degToRad(100));
    const radius: TMeters = meters(15);
    const angleArray: ReadonlyArray<TRadians> = generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle);

    const redPath: ReadonlyArray<Vector3> = createCirclePathXZ(angleArray, radius, new Vector3(0, 0, 0));
    const greenPath: ReadonlyArray<Vector3> = createCirclePathXZ(angleArray, (radius - meters(2)) as TMeters, new Vector3(0, 0, 0));
    const bluePath: ReadonlyArray<Vector3> = createCirclePathXZ(angleArray, (radius - meters(4)) as TMeters, new Vector3(0, 0, 0));

    let followersCb: Record<string, (() => void) | undefined> = {
      red: undefined,
      green: undefined,
      blue: undefined
    };

    const moverService: TMoverService = MoverService(transformLoop, defaultMoverServiceConfig);

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
      position: new Vector3(0, 0, 1),
      rotation: new Euler(-1.57, 0, 0),
      visible: false
    });

    mouseService.clickLeftRelease$.subscribe(() => {
      if (isClickBlocked) {
        redActor.model3d.setVisible(false);
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
