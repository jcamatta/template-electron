import { Effect } from "effect";
import { toResult } from "../common/handler";
import type { PingInput, PingValue } from "../../contract/ipc-contract/ping";
import type { PingResult } from "./core";
import { ping } from "./core";

const toPingCommand = (input: PingInput) => ({
  message: input.message,
});

const toPingValue = (result: PingResult): PingValue => ({
  message: result.message,
});

export const pingHandler = (input: PingInput) =>
  toResult(
    Effect.gen(function* () {
      const result = yield* ping(toPingCommand(input));

      return toPingValue(result);
    }),
  );
