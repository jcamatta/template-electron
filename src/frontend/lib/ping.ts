import { pingContract } from "../../contract/ipc-contract/ping";
import type { IpcResult } from "../../contract/ipc-contract";
import type { PingInput } from "../../contract/ipc-contract/ping";

export const ping = (input: PingInput): Promise<IpcResult<"ping">> =>
  window.api.invoke(pingContract.endpoint, input);
