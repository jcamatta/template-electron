import { Effect } from "effect";
import { ipcMain } from "electron";
import { pingContract } from "../contract/ipc-contract/ping";
import type { PingInput } from "../contract/ipc-contract/ping";
import { pingHandler } from "./ping/handler";

export const registerHandlers = () => {
  ipcMain.handle(pingContract.endpoint, (_event, input: PingInput) =>
    Effect.runPromise(pingHandler(input)),
  );
};

export const disposeHandlers = () => {
  ipcMain.removeHandler(pingContract.endpoint);
};
