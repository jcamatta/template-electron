import { pingContract } from "../../shared/ipc-contract/ping";
import type { IpcResult } from "../../shared/ipc-contract";
import type { PingInput } from "../../shared/ipc-contract/ping";

export const ping = (input: PingInput): Promise<IpcResult<"ping">> =>
  window.api.invoke(pingContract.endpoint, input);
