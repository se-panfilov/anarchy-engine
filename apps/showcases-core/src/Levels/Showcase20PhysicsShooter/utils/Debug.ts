import type { TActorService } from '@hellpig/anarchy-engine';
import { GridHelper } from 'three';

export function initGridHelper(actorService: TActorService, size: number, divisions: number): void {
  const gridHelper: GridHelper = new GridHelper(size, divisions, '#03A062', '#03A062');
  actorService.getScene().entity.add(gridHelper);
}
