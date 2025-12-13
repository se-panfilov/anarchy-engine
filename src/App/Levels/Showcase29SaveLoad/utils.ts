import type { TSpace, TSpaceConfig } from '@/Engine';
import { createDomElement, isNotDefined } from '@/Engine';

export type TSpacesData = Readonly<{
  name: string;
  config: TSpaceConfig;
  container: string;
  onCreate?: (space: TSpace) => void;
  onChange?: (space: TSpace) => void;
  onUnload?: (space: TSpace) => void;
}>;

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
