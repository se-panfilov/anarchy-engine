import { isDefined, isNotDefined } from '@/Engine';

export function addBtn(
  text: string,
  containerId: string | undefined,
  cb: (...rest: ReadonlyArray<any>) => void,
  params?: {
    right?: string;
    left?: string;
    top?: string;
  }
): void {
  const { right, left, top } = params ?? {};

  const newContainerId: string = containerId ?? 'btn-container';
  let container: HTMLDivElement | null = document.querySelector('#' + newContainerId);
  if (isNotDefined(container)) {
    container = document.createElement('div');
    // eslint-disable-next-line functional/immutable-data
    container.id = newContainerId;
    // eslint-disable-next-line functional/immutable-data
    container.style.position = 'absolute';
    // eslint-disable-next-line functional/immutable-data
    container.style.top = top ?? '10px';
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(right)) container.style.right = right;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(left)) container.style.left = left;
    // eslint-disable-next-line functional/immutable-data
    container.style.display = 'flex';
    // eslint-disable-next-line functional/immutable-data
    container.style.gap = '8px';
    document.body.appendChild(container);
  }

  const button: HTMLButtonElement = document.createElement('button');
  // eslint-disable-next-line functional/immutable-data
  button.textContent = text;

  button.addEventListener('click', cb);
  container.appendChild(button);
}
