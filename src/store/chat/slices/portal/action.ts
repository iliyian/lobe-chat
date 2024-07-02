import { StateCreator } from 'zustand/vanilla';

import { ChatStore } from '@/store/chat/store';

export interface ChatPortalAction {
  closeToolUI: () => void;
  openToolUI: (messageId: string, identifier: string) => void;
  toggleDock: (open?: boolean) => void;
}

export const chatPortalSlice: StateCreator<
  ChatStore,
  [['zustand/devtools', never]],
  [],
  ChatPortalAction
> = (set, get) => ({
  closeToolUI: () => {
    set({ portalToolMessage: undefined }, false, 'openToolUI');
  },
  openToolUI: (id, identifier) => {
    if (!get().showPortal) {
      get().toggleDock(true);
    }

    set({ portalToolMessage: { id, identifier } }, false, 'openToolUI');
  },
  toggleDock: (open) => {
    const showInspector = open === undefined ? !get().showPortal : open;
    set({ showPortal: showInspector }, false, 'toggleInspector');
  },
});
