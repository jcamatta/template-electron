import type { WindowApi } from "../contract/window-api";

declare global {
  interface Window {
    readonly api: WindowApi;
  }
}

export {};
