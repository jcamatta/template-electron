import { Effect } from "effect";
import { toResult } from "../shared/handler";
import type { PingInput, PingValue } from "../../shared/ipc-contract/ping";
import type { PingResult } from "./core";
import { ping } from "./core";

const toPingCommand = (input: PingInput) => ({
  message: input.message,
});

const toPingValue = (result: PingResult): PingValue => ({
  message: result.message,
});

export const pingHandler = (input: PingInput) =>
  toResult(Effect.map(ping(toPingCommand(input)), toPingValue));
