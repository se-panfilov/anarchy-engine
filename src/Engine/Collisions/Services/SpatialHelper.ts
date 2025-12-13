import { EdgesGeometry, LineBasicMaterial, LineSegments } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';

export function createOutline(actorW: TActorWrapperAsync): LineSegments {
  const edges = new EdgesGeometry(actorW.entity.geometry);
  const outlineMaterial = new LineBasicMaterial({ color: 0xff0000, linewidth: 1 });
  const outline = new LineSegments(edges, outlineMaterial);
  outline.position.copy(actorW.getPosition().getCoords());
  outline.rotation.copy(actorW.entity.rotation);
  outline.scale.copy(actorW.entity.scale);
  return outline;
}
