import { routerConfig } from '@/router';

export function addNavigationPanel(container: HTMLElement, onNavigate: (path: string) => void): void {
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

      option.addEventListener('click', (event) => {
        event.preventDefault();
        onNavigate(routerConfigKey);
      });
      selectBox.appendChild(option);
    }
  }

  navPanel.appendChild(selectBox);
  container.appendChild(navPanel);

  // eslint-disable-next-line functional/immutable-data
  navPanel.style.zIndex = '10000';
  // eslint-disable-next-line functional/immutable-data
  navPanel.style.position = 'absolute';
  // eslint-disable-next-line functional/immutable-data
  navPanel.style.bottom = '0';
  // eslint-disable-next-line functional/immutable-data
  navPanel.style.left = '0';
}
