import { AppState } from 'server/type';

declare global {
  interface Window {
    APP_STATE: AppState;
  }

  interface HotModule {
    dispose(cb: Function): void;
    accept(cb: Function): void;
  }

  interface NodeModule {
    hot: HotModule;
  }

  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
  /* eslint-enable @typescript-eslint/no-namespace */
}
