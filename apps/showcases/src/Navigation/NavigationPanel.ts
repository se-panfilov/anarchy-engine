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

      const params = new URLSearchParams(window.location.search);
      if (option.value === params.get('path')) {
        // eslint-disable-next-line functional/immutable-data
        option.selected = true;
      }

      // eslint-disable-next-line functional/immutable-data
      option.textContent = routerConfig[routerConfigKey];
      selectBox.appendChild(option);
    }
  }

  selectBox.addEventListener('change', (event: Event): void => {
    const params = new URLSearchParams(window.location.search);
    params.set('path', (event?.target as HTMLSelectElement)?.value);
    window.history.pushState(null, '', '?' + params.toString());
    window.location.reload();
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
  label.textContent = 'Navigation: ';
  label.appendChild(selectBox);

  navPanel.appendChild(label);
  container.appendChild(navPanel);
}
