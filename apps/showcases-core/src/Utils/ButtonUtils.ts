import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';

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

  button.classList.add('btn');
  // eslint-disable-next-line functional/immutable-data
  button.style.background = 'oklch(0.66 0.1 204.08)';
  // eslint-disable-next-line functional/immutable-data
  button.style.color = 'white';
  // eslint-disable-next-line functional/immutable-data
  button.style.border = '1px solid oklch(0.55 0.09 166.31)';
  // eslint-disable-next-line functional/immutable-data
  button.style.cursor = 'pointer';
  // eslint-disable-next-line functional/immutable-data
  button.style.outline = 'none';

  button.addEventListener('click', cb);
  container.appendChild(button);
}

export function addDropdown(
  text: string,
  containerId: string | undefined,
  cb: (...rest: ReadonlyArray<any>) => void,
  options: ReadonlyArray<string>,
  selectedOption?: string,
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

  const select: HTMLSelectElement = document.createElement('select');

  select.addEventListener('change', () => {
    const selectedValue: string = (select as HTMLSelectElement).value;
    cb(selectedValue);
  });

  options.forEach((option: string): void => {
    const opt: HTMLOptionElement = document.createElement('option');
    // eslint-disable-next-line functional/immutable-data
    opt.value = option;
    if (isDefined(selectedOption) && selectedOption === option) {
      // eslint-disable-next-line functional/immutable-data
      opt.selected = true;
    }
    // eslint-disable-next-line functional/immutable-data
    opt.textContent = option;
    select.appendChild(opt);
  });

  const label: HTMLLabelElement = document.createElement('label');
  // eslint-disable-next-line functional/immutable-data
  label.textContent = text;
  label.appendChild(select);

  container.appendChild(label);
}
