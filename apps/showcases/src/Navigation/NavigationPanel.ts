import { routerConfig } from '@/router';

export function addNavigationPanel(container: HTMLElement): void {
  const navPanel: HTMLElement = document.createElement('div');
  // eslint-disable-next-line functional/immutable-data
  navPanel.className = 'navigation-panel ui';
  const selectBox: HTMLSelectElement = document.createElement('select');
  // eslint-disable-next-line functional/immutable-data
  selectBox.name = 'navigation-select';
  // eslint-disable-next-line functional/immutable-data
  selectBox.className = 'select';
  // eslint-disable-next-line functional/immutable-data
  selectBox.id = 'navigation-select';

  // eslint-disable-next-line functional/no-loop-statements
  for (const routerConfigKey in routerConfig) {
    if (Object.prototype.hasOwnProperty.call(routerConfig, routerConfigKey)) {
      const option: HTMLOptionElement = document.createElement('option');
      // eslint-disable-next-line functional/immutable-data
      option.value = routerConfigKey;

      // eslint-disable-next-line spellcheck/spell-checker
      if (option.value === window.location.pathname) {
        // eslint-disable-next-line functional/immutable-data
        option.selected = true;
      }

      // eslint-disable-next-line functional/immutable-data
      option.textContent = routerConfig[routerConfigKey];
      selectBox.appendChild(option);
    }
  }

  selectBox.addEventListener('change', (event: Event): void => {
    // eslint-disable-next-line functional/immutable-data,spellcheck/spell-checker
    window.location.pathname = (event?.target as any)?.value;
  });

  // eslint-disable-next-line functional/immutable-data
  navPanel.style.zIndex = '10000';
  // eslint-disable-next-line functional/immutable-data
  navPanel.style.position = 'absolute';
  // eslint-disable-next-line functional/immutable-data
  navPanel.style.bottom = '0';
  // eslint-disable-next-line functional/immutable-data
  navPanel.style.left = '0';
  // eslint-disable-next-line functional/immutable-data
  navPanel.style.display = 'flex';

  const label: HTMLLabelElement = document.createElement('label');
  // eslint-disable-next-line functional/immutable-data
  label.textContent = 'textXXX';
  label.appendChild(selectBox);

  navPanel.appendChild(label);
  container.appendChild(navPanel);
}
