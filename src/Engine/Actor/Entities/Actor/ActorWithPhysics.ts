// import type { TActorParams, TActorWithPhysics, TActorWithPhysicsDependencies } from '@/Engine/Actor/Models';
// import type { TPhysicsBody, TPhysicsBodyService, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TActorWithPhysics } from '@/Engine/Actor/Models';

// TODO 8.0.0. MODELS: remove (use PhysicsTransformAgent instead)
export function ActorWithPhysics(): TActorWithPhysics | void {
  //   params: TActorParams,
  //   deps: TActorWithPhysicsDependencies,
  //   customCreatePhysicsBodyFn?: (physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService, additionalParams?: Record<string, any>) => TPhysicsBody,
  //   additionalParams?: Record<string, any>
  // ): TActorWithPhysics | never {
  //   if (isNotDefined(params.physics)) throw new Error('Cannot create Actor with Physics: physics params are missing');
  //   const actor: TActor = Actor(params, deps);
  //   const actorPhysicalW: TActorWithPhysics = makeWrapperWithPhysicsBody(actor, params.physics, deps.physicsBodyService, customCreatePhysicsBodyFn, additionalParams);
  //
  //   const sub$: Subscription = deps.physicsLoopService.tick$.subscribe((): void => {
  //     updateActorByPhysicalBody(actorPhysicalW);
  //     updateMovementInfo(actorPhysicalW, deps.physicsBodyService);
  //   });
  //
  //   actorPhysicalW.destroy$.subscribe(() => sub$.unsubscribe());
  //
  //   return actorPhysicalW;
}

// function updateActorByPhysicalBody(actorPhysicalW: TActorWithPhysics): void | never {
//   if (actorPhysicalW.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
//   const rigidBody: RigidBody | undefined = actorPhysicalW.physicsBody.getRigidBody();
//   if (isNotDefined(rigidBody)) throw new Error('Cannot update Actor with Physics: rigidBody is missing');
//
//   const vector: Vector = rigidBody.translation();
//   actorPhysicalW.setPosition(new Vector3(vector.x, vector.y, vector.z));
//   const { x, y, z, w }: Rotation = rigidBody.rotation();
//   actorPhysicalW.model3d.getRawModel3d().quaternion.set(x, y, z, w);
// }
//
// function updateMovementInfo(actorPhysicalW: TActorWithPhysics, physicsBodyService: TPhysicsBodyService): void | never {
//   if (!actorPhysicalW.physicsBody.shouldUpdateKinematic()) return;
//   if (actorPhysicalW.physicsBody.getPhysicsBodyType() === RigidBodyTypesNames.Fixed) return;
//   actorPhysicalW.drive.kinematic.setData(physicsBodyService.getKinematicDataFromPhysics(actorPhysicalW.physicsBody));
// }
