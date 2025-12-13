export function createMouseDebugOverlay(container: HTMLElement): void {
  const overlay = document.createElement('div');
  // eslint-disable-next-line functional/immutable-data
  Object.assign(overlay.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '6px 12px',
    fontSize: '12px',
    fontFamily: '"Roboto", sans-serif',
    background: 'rgba(0, 0, 0, 0.6)',
    color: 'lime',
    zIndex: '9999',
    pointerEvents: 'none',
    whiteSpace: 'pre'
  });

  // eslint-disable-next-line functional/immutable-data
  container.style.position = container.style.position || 'relative';
  container.appendChild(overlay);

  const updateOverlay = (event: MouseEvent): void => {
    const rect = container.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const normX = ((mouseX / rect.width) * 2 - 1).toFixed(2);
    const normY = (-(mouseY / rect.height) * 2 + 1).toFixed(2);

    // eslint-disable-next-line functional/immutable-data
    overlay.textContent = `Mouse:  x=${mouseX.toFixed(0)}, y=${mouseY.toFixed(0)}\nNormalized: x=${normX}, y=${normY}`;
  };

  container.addEventListener('mousemove', updateOverlay);
}

//Usage example:
// let container = document.querySelector('#right_bottom_container')!;
// const idx = setInterval(() => {
//   if (container) {
//     createMouseDebugOverlay(container);
//     console.log('XXX overlay!');
//     clearInterval(idx);
//   } else {
//     container = document.querySelector('#right_bottom_container')!;
//   }
// }, 500);
