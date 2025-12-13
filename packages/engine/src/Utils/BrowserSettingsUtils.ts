export type TBrowserSafeguardsSettings = Readonly<{
  shouldBlockDragAndDrop?: boolean;
  shouldBlockContextMenu?: boolean;
  shouldBlockBackspaceKey?: boolean;
}>;

export const defaultBrowserSafeguardsSettings: TBrowserSafeguardsSettings = {
  shouldBlockDragAndDrop: true,
  shouldBlockContextMenu: true,
  shouldBlockBackspaceKey: true
};

export function setBrowserSafeguards(window: Window, { shouldBlockDragAndDrop, shouldBlockContextMenu, shouldBlockBackspaceKey }: TBrowserSafeguardsSettings = defaultBrowserSafeguardsSettings): void {
  if (shouldBlockDragAndDrop) {
    // Block drag and drop
    window.addEventListener('dragover', (e: DragEvent): void => e.preventDefault());
    window.addEventListener('drop', (e: DragEvent): void => e.preventDefault());
  }

  if (shouldBlockContextMenu) {
    //Block context menu (right click, etc.)
    window.addEventListener('contextmenu', (e: MouseEvent): void => e.preventDefault());
  }

  if (shouldBlockBackspaceKey) {
    //Block backspace key (outside of input elements) to prevent navigation
    window.addEventListener('keydown', (e: KeyboardEvent): void => {
      if (e.key === 'Backspace' && !(e.target instanceof HTMLInputElement)) e.preventDefault();
    });
  }
}
