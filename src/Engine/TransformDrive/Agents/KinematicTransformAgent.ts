import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, switchMap } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TKinematicData, TKinematicState, TKinematicTarget, TKinematicWritableData } from '@/Engine/Kinematic/Models';
import type { TMeters, TMetersPerSecond, TMilliseconds, TRadians } from '@/Engine/Math';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TKinematicAgentDependencies, TKinematicTransformAgent, TKinematicTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function KinematicTransformAgent(params: TKinematicTransformAgentParams, { kinematicLoopService }: TKinematicAgentDependencies): TKinematicTransformAgent {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.isAutoUpdate ?? false);
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Kinematic);

  let kinematicSub$: Subscription | undefined = undefined;

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    kinematicSub$?.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  const agent: Omit<TKinematicTransformAgent, 'data'> & Readonly<{ data: TKinematicWritableData }> = {
    ...abstractTransformAgent,
    data: {
      state: {
        linearSpeed: params.state.linearSpeed ?? 0,
        linearDirection: params.state.linearDirection?.clone() ?? new Vector3(),
        angularSpeed: params.state.angularSpeed ?? 0,
        angularDirection: params.state.angularDirection?.clone() ?? new Quaternion()
      },
      target: {
        positionThreshold: 0.01,
        position: undefined,
        rotationThreshold: 0.0001,
        // TODO 8.0.0. MODELS: rename "rotation" to "angularDirection"
        rotation: undefined
      }
    },
    setData({ state, target }: TKinematicData): void {
      const { linearSpeed, linearDirection, angularSpeed, angularDirection } = state;
      const { positionThreshold, position, rotationThreshold, rotation } = target ?? {};

      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearSpeed = linearSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearDirection.copy(linearDirection);
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = angularSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularDirection.copy(angularDirection);

      if (isNotDefined(target)) return;

      // eslint-disable-next-line functional/immutable-data
      if (isDefined(positionThreshold)) agent.data.target.positionThreshold = positionThreshold;
      // eslint-disable-next-line functional/immutable-data
      agent.data.target.position = position;
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(rotationThreshold)) agent.data.target.rotationThreshold = rotationThreshold;
      // eslint-disable-next-line functional/immutable-data
      agent.data.target.rotation = rotation;
    },
    getData(): TKinematicData {
      return agent.data;
    },
    moveTo(targetPosition: Vector3, speed: TMetersPerSecond): void | never {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setLinearSpeed(0);

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.position = targetPosition;

      // If the agent is already at the target, do not move
      if (targetPosition.equals(abstractTransformAgent.position$.value)) return agent.setLinearSpeed(0);

      agent.setLinearDirection(targetPosition.clone().sub(abstractTransformAgent.position$.value).normalize());
      agent.setLinearSpeed(speed);
      return undefined;
    },
    lookAt(targetPosition: Vector3, speed: TMetersPerSecond, radius: TMeters): void | never {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');

      const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;
      const currentPos = agent.position$.value;

      if (currentPos.distanceToSquared(targetPosition) < 1e-12) return undefined;
      const direction = new Vector3().subVectors(targetPosition, currentPos).normalize();
      const forward = new Vector3(0, 0, 1);
      // const targetRotation = new Quaternion().setFromUnitVectors(forward, direction);

      const euler = getLookAtEuler(agent.position$.value, targetPosition);
      console.log('XXX1', radToDeg(euler.x), radToDeg(euler.y), radToDeg(euler.z));
      // TODO debug
      const targetRotation = new Quaternion().setFromEuler(getLookAtEuler(agent.position$.value, targetPosition));

      function getLookAtEuler(currentPosition: Vector3, targetPosition: Vector3): Euler {
        const direction = new Vector3().subVectors(targetPosition, currentPosition).normalize();
        const yaw = Math.atan2(direction.x, direction.z); // Азимут (по Y)
        const pitch = Math.asin(direction.y); // Угол наклона (по X)
        return new Euler(pitch, yaw, 0, 'YXZ'); // 'YXZ' учитывает, что сначала идёт наклон, потом поворот
      }

      return agent.rotateTo(targetRotation, angularSpeed, radius);

      // TODO debug
      // return agent.rotateTo(new Quaternion(-0.03249683454126656, 0.8379150212015493, 0.050191339367435285, 0.5425156241456166), angularSpeed, radius);
      // return agent.rotateTo(new Quaternion(-0.006081307355407782, 0.9722270324534193, 0.02542147116485208, 0.23257550144304018), angularSpeed, radius);
    },
    // lookAt(targetPosition: Vector3, speed: TMetersPerSecond, radius: TMeters): void {
    //   if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
    //   if (speed === 0) return agent.setAngularSpeed(0);
    //   if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
    //   const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;
    //
    //   const lookAtMatrix = new Matrix4().lookAt(agent.position$.value, targetPosition, new Vector3(0, 1, 0));
    //   const targetRotation = new Quaternion().setFromRotationMatrix(lookAtMatrix);
    //
    //   // eslint-disable-next-line functional/immutable-data
    //   agent.data.target.rotation = targetRotation;
    //
    //   // Calculate angle to the target using dot product
    //   const dot: number = agent.data.state.angularDirection.dot(targetRotation);
    //   const angleToTarget: number = Math.acos(2 * dot * dot - 1);
    //   if (angleToTarget < agent.data.target.rotationThreshold) return agent.setAngularSpeed(0);
    //
    //   agent.setAngularSpeed(angularSpeed);
    //
    //   return undefined;
    // },
    // Rotates agent to "look" at the target position (e.g. mouse click position, other actor, etc.)
    // lookAt(targetPosition: Vector3, speed: TMetersPerSecond, radius: TMeters): void | never {
    //   if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
    //   if (speed === 0) return agent.setAngularSpeed(0);
    //   if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
    //
    //   // Создаём временный объект для правильного расчёта кватерниона
    //   const tempObject = new Object3D();
    //   tempObject.position.copy(abstractTransformAgent.position$.value);
    //
    //   // Устанавливаем направление "вверх" по Y-оси
    //   tempObject.up.set(0, 1, 0);
    //
    //   // Вычисляем целевое вращение
    //   tempObject.lookAt(targetPosition);
    //   const targetRotation = tempObject.quaternion.clone().normalize();
    //
    //   // Используем существующую логику поворота
    //   agent.rotateTo(targetRotation, speed, radius);
    //
    //   return undefined;
    // },
    // lookAt(targetPosition: Vector3, speed: TMetersPerSecond, radius: TMeters): void | never {
    //   if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
    //   if (speed === 0) return agent.setAngularSpeed(0);
    //   if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
    //   const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;
    //
    //   const currentPos = agent.position$.value;
    //   const distSq = currentPos.distanceToSquared(targetPosition);
    //   if (distSq < 1e-12) {
    //     // Нечего смотреть, цель совпадает с агентом
    //     return undefined;
    //   }
    //
    //   // Создаем матрицу вида. ВНИМАНИЕ: решите, что у вас "нос" - +Z или -Z
    //   // Если агент должен смотреть вдоль -Z, оставляйте lookAt(agentPos, targetPos, up).
    //   // Если агент должен смотреть вдоль +Z, меняйте порядок eye/target или домножайте на Math.PI.
    //
    //   // Пример, если нужно, чтобы +Z агента "смотрел" на targetPosition:
    //   const lookAtMatrix = new Matrix4().lookAt(
    //     targetPosition, // 1) "eye"
    //     currentPos, // 2) "target"
    //     new Vector3(0, 1, 0) // 3) "up"
    //   );
    //
    //   // Иногда нужно повернуть на π (180 градусов) вокруг Y, если получается "задом наперёд":
    //   // lookAtMatrix.multiply(new Matrix4().makeRotationY(Math.PI));
    //
    //   const targetRotation = new Quaternion().setFromRotationMatrix(lookAtMatrix);
    //
    //   // Можно посмотреть, какой угол в Эйлерах получился, для отладки:
    //   // console.log('Debug eulers:', new Euler().setFromQuaternion(targetRotation, 'YXZ').toVector3());
    //
    //   // Используем ваш rotateTo c `targetRotation`.
    //   agent.rotateTo(targetRotation, angularSpeed, radius);
    //   return undefined;
    // },
    // Rotates agent as provided Quaternion (useful when you want to rotate as someone else already rotated)
    // rotateTo(targetRotation: Quaternion, speed: TMetersPerSecond, radius: TMeters): void | never {
    //   if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
    //   if (speed === 0) return agent.setAngularSpeed(0);
    //   if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
    //   // const angularSpeed: TRadiansPerSecond = (speed / radius) as TRadiansPerSecond;
    //   const angularSpeed: number = speed / radius;
    //
    //   // Используем встроенный метод для расчёта угла
    //   const angleToTarget = abstractTransformAgent.rotation$.value.angleTo(targetRotation);
    //
    //   if (angleToTarget < agent.data.target.rotationThreshold) return agent.setAngularSpeed(0);
    //
    //   // Устанавливаем направление вращения
    //   const relativeRotation = targetRotation.clone().multiply(abstractTransformAgent.rotation$.value.clone().invert());
    //   agent.setAngularDirection(relativeRotation);
    //
    //   agent.setAngularSpeed(angularSpeed);
    //   // eslint-disable-next-line functional/immutable-data
    //   agent.data.target.rotation = targetRotation;
    //   return undefined;
    // },
    rotateTo(targetRotation: Quaternion, speed: TMetersPerSecond, radius: TMeters): void | never {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
      const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.rotation = targetRotation;

      // Calculate angle to the target using dot product
      // const dot: number = agent.rotation$.value.dot(targetRotation);
      // const angleToTarget: number = Math.acos(2 * dot * dot - 1);
      // if (angleToTarget < agent.data.target.rotationThreshold) return agent.setAngularSpeed(0);

      // agent.setAngularDirection(targetRotation);
      agent.setAngularSpeed(angularSpeed);

      return undefined;
    },
    getLinearSpeed(): TMetersPerSecond {
      return agent.data.state.linearSpeed;
    },
    setLinearSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearSpeed = speed;
    },
    getLinearDirection(): Vector3 {
      return agent.data.state.linearDirection;
    },
    setLinearDirection(direction: Vector3Like): void {
      agent.data.state.linearDirection.copy(direction);
    },
    resetLinear(resetSpeed: boolean, resetDirection: boolean): void {
      if (resetSpeed) agent.setLinearSpeed(0);
      if (resetDirection) agent.setLinearDirection(new Vector3());
    },
    getAngularSpeed(): TMetersPerSecond {
      return agent.data.state.angularSpeed;
    },
    setAngularSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = speed;
    },
    getAngularDirection(): Quaternion {
      return agent.data.state.angularDirection.clone();
    },
    setAngularDirection(direction: QuaternionLike): void {
      agent.data.state.angularDirection.copy(direction);
    },
    resetAngular(resetSpeed: boolean, resetDirection: boolean): void {
      if (resetSpeed) agent.setAngularSpeed(0);
      if (resetDirection) agent.setAngularDirection(new Quaternion());
    },
    autoUpdate$
  };

  // TODO 8.0.0. MODELS: Destroy subscriptions linearDirection & displacement on agent destroy
  const linearDirection = new Vector3();
  const displacement = new Vector3();

  // TODO 8.0.0. MODELS: Implement infinite move when no target (undefined)
  function doKinematicMove(delta: TMilliseconds): void {
    if (agent.data.state.linearSpeed <= 0) return;

    if (isPointReached(agent.data.target, abstractTransformAgent.position$.value, agent.data.state)) return;

    linearDirection.copy(agent.data.state.linearDirection).normalize();
    displacement.copy(linearDirection).multiplyScalar(agent.data.state.linearSpeed * delta);

    abstractTransformAgent.position$.next(abstractTransformAgent.position$.value.clone().add(displacement));
  }

  // TODO 8.0.0. MODELS: Implement infinite rotation when no target (undefined)
  function doKinematicRotation(delta: TMilliseconds): void {
    if (agent.data.state.angularSpeed <= 0) return;

    // TODO debug
    if (isRotationReached(agent.data.target, agent.rotation$.value, agent.data.state)) return;

    const rotationStep: number = agent.data.state.angularSpeed * delta;
    const stepRotation: Quaternion | undefined = getStepRotation(agent, rotationStep);
    if (isNotDefined(stepRotation)) return;

    agent.data.state.angularDirection.multiply(stepRotation).normalize();
    agent.rotation$.next(agent.data.state.angularDirection);
  }

  kinematicSub$ = combineLatest([agent.enabled$, agent.autoUpdate$])
    .pipe(
      //Do not update if agent is disabled or autoUpdate is turned off
      switchMap(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>): Observable<TMilliseconds> => (isEnabled && isAutoUpdate ? kinematicLoopService.tick$ : EMPTY))
    )
    .subscribe((delta: TMilliseconds): void => {
      doKinematicRotation(delta);
      doKinematicMove(delta);
    });

  return agent;
}

// function getStepRotation(agent: TKinematicTransformAgent, rotationStep: number): Quaternion | undefined {
//   if (!agent.data.target?.rotation) return undefined;
//
//   // Вычисляем относительное вращение (target * current⁻¹)
//   const relativeRotation = agent.data.target.rotation.clone().multiply(agent.rotation$.value.clone().invert());
//
//   // Вычисляем угол поворота
//   const angleToTarget: TRadians = (2 * Math.acos(Math.max(-1, Math.min(1, relativeRotation.w)))) as TRadians;
//
//   // Если угол слишком мал, можно остановиться
//   if (angleToTarget < 1e-6) return undefined;
//
//   // Вычисляем ось вращения
//   const axis = new Vector3(relativeRotation.x, relativeRotation.y, relativeRotation.z);
//   const scaleFactor = Math.sqrt(1 - relativeRotation.w * relativeRotation.w);
//
//   if (scaleFactor > 1e-6) {
//     axis.divideScalar(scaleFactor).normalize();
//   } else {
//     // Если ось вращения не определена, выбираем направление, максимально близкое к требуемому
//     axis.set(1, 0, 0);
//   }
//
//   // Ограничиваем шаг вращения, чтобы не проскочить цель
//   const stepAngle = Math.min(rotationStep, angleToTarget);
//
//   return new Quaternion().setFromAxisAngle(axis, stepAngle);
// }

// function getStepRotation(agent: TKinematicTransformAgent, rotationStep: number): Quaternion | undefined {
//   if (!agent.data.target?.rotation) return undefined;
//
//   // 🔹 Получаем текущий и целевой кватернион
//   const currentRotation = agent.rotation$.value;
//   const targetRotation = agent.data.target.rotation;
//
//   // 🔹 Вычисляем относительное вращение (разницу между текущим и целевым)
//   const relativeRotation = new Quaternion().copy(targetRotation).multiply(currentRotation.clone().invert());
//
//   // 🔹 Получаем угол вращения между кватернионами
//   const angleToTarget = 2 * Math.acos(Math.max(-1, Math.min(1, relativeRotation.w))); // Защита от артефактов
//   if (angleToTarget < 1e-6) return undefined; // Если угол очень мал — уже на месте
//
//   // 🔹 Нормализуем направление оси (если угол мал, может быть проблема)
//   const axis = new Vector3(relativeRotation.x, relativeRotation.y, relativeRotation.z);
//   if (axis.lengthSq() < 1e-6) return undefined; // Малый вектор — вращения нет
//   axis.normalize();
//
//   // 🔹 Ограничиваем шаг вращения
//   const stepFactor = Math.min(1, rotationStep / angleToTarget);
//   const stepRotation = new Quaternion().setFromAxisAngle(axis, angleToTarget * stepFactor);
//
//   return stepRotation;
// }

function getStepRotation(agent: TKinematicTransformAgent, rotationStep: number): Quaternion | undefined {
  if (!agent.data.target?.rotation) return undefined;

  // Получаем текущий и целевой поворот в формате Euler (YXZ — порядок three.js)
  const currentEuler = new Euler().setFromQuaternion(agent.rotation$.value, 'YXZ');
  const targetEuler = new Euler().setFromQuaternion(agent.data.target.rotation, 'YXZ');

  // Вычисляем разницу углов
  const deltaX = targetEuler.x - currentEuler.x;
  const deltaY = targetEuler.y - currentEuler.y;
  const deltaZ = targetEuler.z - currentEuler.z;

  // Ограничиваем шаг вращения, чтобы не проскочить цель
  const stepEuler = new Euler(
    Math.sign(deltaX) * Math.min(rotationStep, Math.abs(deltaX)),
    Math.sign(deltaY) * Math.min(rotationStep, Math.abs(deltaY)),
    Math.sign(deltaZ) * Math.min(rotationStep, Math.abs(deltaZ)),
    'YXZ'
  );

  // Преобразуем обратно в кватернион
  return new Quaternion().setFromEuler(stepEuler);
}

function isPointReached(target: TKinematicTarget | undefined, position: Vector3, state: TKinematicState): boolean {
  if (isNotDefined(target)) return false;
  const { position: targetPosition, positionThreshold } = target;
  if (isNotDefined(targetPosition)) return false;

  const { linearSpeed, linearDirection } = state;

  // If the agent is already at the target, do not move
  if (linearSpeed === 0) return true;

  const vectorToTarget: Vector3 = targetPosition.clone().sub(position);
  const distanceSquared: TMeters = vectorToTarget.lengthSq() as TMeters;

  // If the agent is close enough to the target, stop
  if (distanceSquared < positionThreshold * positionThreshold) return true;

  const crossedTarget: boolean = vectorToTarget.dot(linearDirection) < 0;
  // If the agent has passed the target, stop
  if (crossedTarget) return true;

  return false;
}

function isRotationReached(target: TKinematicTarget | undefined, rotation: Quaternion, state: TKinematicState): boolean {
  if (isNotDefined(target)) return false;
  const { rotation: targetRotation, rotationThreshold } = target;

  if (isNotDefined(targetRotation)) return false;

  const { angularSpeed } = state;

  // If the speed is 0, do nothing
  if (angularSpeed === 0) return true;

  // Calculate the current angle to the target
  const angleToTarget: TRadians = rotation.angleTo(targetRotation) as TRadians;

  // If the agent is close enough to the target, stop
  if (angleToTarget < rotationThreshold) return true;

  return false;
}
