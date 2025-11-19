export {};

declare global {
  interface Window {
    yandexContextAsyncCallbacks?: (() => void)[];
    Ya?: {
      Context: {
        AdvManager: {
          render: (params: {
            blockId: string;
            renderTo: string;
            async?: boolean;
          }) => void;
        };
      };
    };
  }
}