import { contextBridge, ipcRenderer } from "electron";
import type { IpcContract, IpcResult } from "../contract/ipc-contract";
import type { WindowApi } from "../contract/window-api";

const invoke = <Endpoint extends keyof IpcContract>(
  endpoint: Endpoint,
  ...args: IpcContract[Endpoint]["request"] extends void
    ? []
    : [payload: IpcContract[Endpoint]["request"]]
): Promise<IpcResult<Endpoint>> =>
  ipcRenderer.invoke(endpoint as string, ...args) as Promise<
    IpcResult<Endpoint>
  >;

const api: WindowApi = {
  invoke,
};

contextBridge.exposeInMainWorld("api", api);
