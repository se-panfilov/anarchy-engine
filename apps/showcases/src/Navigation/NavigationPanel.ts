import { routerConfig } from '@/router';

export function addNavigationPanel(container: HTMLElement): void {
  const navPanel: HTMLElement = document.createElement('nav');
  // eslint-disable-next-line functional/immutable-data
  navPanel.className = 'navigation-panel -dev';
  const selectBox: HTMLSelectElement = document.createElement('select');
  // eslint-disable-next-line functional/immutable-data
  selectBox.name = 'navigation-select';
  // eslint-disable-next-line functional/immutable-data
  selectBox.id = 'navigation-select';

  // eslint-disable-next-line functional/no-loop-statements
  for (const routerConfigKey in routerConfig) {
    if (Object.prototype.hasOwnProperty.call(routerConfig, routerConfigKey)) {
      const option: HTMLOptionElement = document.createElement('option');
      // eslint-disable-next-line functional/immutable-data
      option.value = routerConfigKey;
      // eslint-disable-next-line functional/immutable-data
      option.textContent = routerConfig[routerConfigKey];
      selectBox.appendChild(option);
    }
  }

  navPanel.appendChild(selectBox);
  container.appendChild(navPanel);

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
  navPanel.style.right = '0';
}
