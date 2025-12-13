import { Euler, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { addGizmo } from '@/App/Levels/Utils';
import type {
  TActor,
  TActorRegistry,
  TAnimationParams,
  TCameraRegistry,
  TControlsRegistry,
  TControlsWrapper,
  TMeters,
  TMoverService,
  TRadians,
  TSpace,
  TSpaceConfig,
  TText2dWrapper,
  TTextAnyWrapper
} from '@/Engine';
import { asRecord, ControlsType, createCirclePathXZ, defaultMoverServiceConfig, Easing, generateAnglesForCircle, isNotDefined, isOrbitControls, spaceService, TextType } from '@/Engine';
import { meters, radians } from '@/Engine/Measurements/Utils';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, cameraService, controlsService, textService, mouseService } = space.services;
  const { transformLoop } = space.loops;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  const controlsRegistry: TControlsRegistry = controlsService.getRegistry();
  const { text2dRegistry } = textService.getRegistries();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const orbitControls: TControlsWrapper | undefined = controlsRegistry.asArray()[0];
  if (isNotDefined(orbitControls)) throw new Error('Orbit controls are not defined');
  if (!isOrbitControls(orbitControls)) throw new Error(`Active controls are not of type "${ControlsType.OrbitControls}", but ${orbitControls.getType()}`);
  orbitControls.entity.target.set(6, 0, 0);
  cameraRegistry.asArray()[0]?.drive.position$.next(new Vector3(6, 30, 0));

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
    name: 'text-blocked-click',
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
      // TODO setTimeout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
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

  space.start$.next(true);
}
