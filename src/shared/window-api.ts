import type { IpcContract, IpcResult } from "./ipc-contract";

export type WindowApi = {
  readonly invoke: <Endpoint extends keyof IpcContract>(
    endpoint: Endpoint,
    ...args: IpcContract[Endpoint]["request"] extends void
      ? []
      : [payload: IpcContract[Endpoint]["request"]]
  ) => Promise<IpcResult<Endpoint>>;
};
