import type { BehaviorSubject } from 'rxjs';
import { Euler, Vector3 } from 'three';

import type { TModel3d, TSpace, TSpaceConfig, TText2dRegistry, TText2dWrapper, TText3dRegistry, TText3dTextureRegistry, TText3dTextureWrapper, TText3dWrapper } from '@/Engine';
import { createDomElement, isNotDefined, TextType } from '@/Engine';

import type { TSpacesData } from './ShowcaseTypes';

export function createContainersDivs(spacesDataList: ReadonlyArray<TSpacesData>): void {
  spacesDataList.forEach(({ container }): HTMLElement => createDomElement('div', undefined, ['container'], container));
}

export function setContainerVisibility(name: string, isVisible: boolean, spacesDataList: ReadonlyArray<TSpacesData>): void {
  const spaceData: TSpacesData | undefined = spacesDataList.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);
  const containerElement: HTMLElement | null = document.querySelector(`#${spaceData.container}`);
  if (isNotDefined(containerElement)) throw new Error(`[Showcase]: Cannot find the container element for showcase "${name}"`);
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
  const text: TText2dWrapper | TText3dWrapper | TText3dTextureWrapper | undefined = registry.findByName(name);
  if (isNotDefined(text)) throw new Error(`[Showcase]: Text with name "${name}" is not found`);

  //Text3dTexture texts don't support a runtime text changing
  if (text.type !== TextType.Text3dTexture) text.setText(text.getText() + ' Changed!');
  const position: Vector3 = text.drive.position$.value.clone();
  text.drive.position$.next(new Vector3(position.x * -1, position.y * -1, position.z * -1));
  text.drive.rotation$.next(text.drive.rotation$.value.clone().setFromEuler(new Euler(0, 0, Math.PI / 4)));
}

export const getContainer = (canvasSelector: string): string => canvasSelector.split('#')[1].trim();

export function setButtonsDisabledInContainer(selector: string, disabled: boolean): void | never {
  const container: Element | null = document.querySelector(selector);
  if (!container) throw new Error(`[Showcase]: Container with selector "${selector}" is not found`);

  const buttons = container.querySelectorAll<HTMLButtonElement>('button');
  buttons.forEach((button): void => {
    // eslint-disable-next-line functional/immutable-data
    button.disabled = disabled;
  });
}

export function toggleElementClass(selector: string, className: string): void | never {
  const elem: Element | null = document.querySelector(selector);
  if (!elem) throw new Error(`[Showcase]: Element with selector "${selector}" is not found`);

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
  const model3d: TModel3d | undefined = space.services.models3dService.getRegistry().findByName(modelName);
  if (isNotDefined(model3d)) throw new Error(`[Showcase]: Model3d "${modelName}" not found`);
  space.services.scenesService.findActive()?.addModel3d(model3d);
}
