import type { WindowApi } from "../shared/window-api";

declare global {
  interface Window {
    readonly api: WindowApi;
  }
}

export {};
