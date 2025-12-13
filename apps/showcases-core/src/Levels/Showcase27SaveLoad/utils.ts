import type { TModel3d, TSpace, TSpaceConfig, TText2dRegistry, TText2dWrapper, TText3dRegistry, TText3dTextureRegistry, TText3dTextureWrapper, TText3dWrapper } from '@Anarchy/Engine';
import { ambientContext, createDomElement, TextType } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { BehaviorSubject } from 'rxjs';
import { Euler, Vector3 } from 'three';

import type { TSpacesData } from './ShowcaseTypes';

export function createContainersDivs(spacesDataList: ReadonlyArray<TSpacesData>): void {
  spacesDataList.forEach(({ container }): HTMLElement => createDomElement(ambientContext, 'div', undefined, ['container'], container));
}

export function setContainerVisibility(name: string, isVisible: boolean, spacesDataList: ReadonlyArray<TSpacesData>): void {
  const spaceData: TSpacesData | undefined = spacesDataList.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[APP] Space data is not found for space "${name}"`);
  const containerElement: HTMLElement | null = document.querySelector(`#${spaceData.container}`);
  if (isNotDefined(containerElement)) throw new Error(`[APP] Cannot find the container element for showcase "${name}"`);
  // eslint-disable-next-line functional/immutable-data
  containerElement.style.display = isVisible ? 'block' : 'none';
}

export function download(space: TSpace): void {
  const serialized: TSpaceConfig = space.serialize() as TSpaceConfig;

  const blob: Blob = new Blob([JSON.stringify(serialized, undefined, 2)], { type: 'application/json' });
  const url: string = URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement('a');
  // eslint-disable-next-line functional/immutable-data
  a.href = url;
  const date = new Date();
  const dateStr: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  // eslint-disable-next-line functional/immutable-data
  a.download = `${space.name}_${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

export function changeText(name: string, registry: TText2dRegistry | TText3dRegistry | TText3dTextureRegistry): void {
  const text: TText2dWrapper | TText3dWrapper | TText3dTextureWrapper = registry.getByName(name);

  //Text3dTexture texts don't support a runtime text changing
  if (text.type !== TextType.Text3dTexture) text.setText(text.getText() + ' Changed!');
  const position: Vector3 = text.drive.position$.value.clone();
  text.drive.position$.next(new Vector3(position.x * -1, position.y * -1, position.z * -1));
  text.drive.rotation$.next(text.drive.rotation$.value.clone().setFromEuler(new Euler(0, 0, Math.PI / 4)));
}

export const getContainer = (canvasSelector: string): string => canvasSelector.split('#')[1].trim();

export function setButtonsDisabledInContainer(selector: string, disabled: boolean): void | never {
  const container: Element | null = document.querySelector(selector);
  if (!container) throw new Error(`[APP] Container with selector "${selector}" is not found`);

  const buttons = container.querySelectorAll<HTMLButtonElement>('button');
  buttons.forEach((button): void => {
    // eslint-disable-next-line functional/immutable-data
    button.disabled = disabled;
  });
}

export function toggleElementClass(selector: string, className: string): void | never {
  const elem: Element | null = document.querySelector(selector);
  if (!elem) throw new Error(`[APP] Element with selector "${selector}" is not found`);

  if (elem.classList.contains(className)) {
    return elem.classList.remove(className);
  } else {
    return elem.classList.add(className);
  }
}

export function addAwait(id: string, awaits$: BehaviorSubject<ReadonlySet<string>>): void {
  awaits$.next(new Set(awaits$.value).add(id));
}

export function removeAwait(id: string, awaits$: BehaviorSubject<ReadonlySet<string>>): void {
  const next = new Set(awaits$.value);
  next.delete(id);
  awaits$.next(next);
}

export function addModel3dToScene(space: TSpace, modelName: string): void | never {
  const model3d: TModel3d = space.services.models3dService.getRegistry().getByName(modelName);
  space.services.scenesService.getActive().addModel3d(model3d);
}

export function getParticlesDeterministicPositions(count: number, areaSize: number): Float32Array {
  // Calculate the approximate step of the grid
  const gridSize: number = Math.ceil(Math.cbrt(count)); // Number of particles per side
  const step: number = areaSize / gridSize;

  const positions: Float32Array = new Float32Array(count * 3);

  let index: number = 0;
  // eslint-disable-next-line functional/no-loop-statements
  for (let xi: number = 0; xi < gridSize; xi++) {
    // eslint-disable-next-line functional/no-loop-statements
    for (let yi: number = 0; yi < gridSize; yi++) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let zi: number = 0; zi < gridSize; zi++) {
        if (index >= count) break;

        const x: number = (xi + 0.5) * step - areaSize / 2;
        const y: number = (yi + 0.5) * step - areaSize / 2;
        const z: number = (zi + 0.5) * step - areaSize / 2;

        // eslint-disable-next-line functional/immutable-data
        positions[index * 3 + 0] = x;
        // eslint-disable-next-line functional/immutable-data
        positions[index * 3 + 1] = y;
        // eslint-disable-next-line functional/immutable-data
        positions[index * 3 + 2] = z;

        index++;
      }
    }
  }

  return positions;
}
