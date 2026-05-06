import { Effect } from "effect";
import { DomainError } from "../common/core";

// == DATA ==

const EMPTY_PING_MESSAGE_ERROR = "EMPTY_PING_MESSAGE";

export type PingCommand = {
  readonly message: string;
};

export type PingResult = {
  readonly message: string;
};

// == ERRORS ==

export class EmptyPingMessageError extends DomainError<
  typeof EMPTY_PING_MESSAGE_ERROR,
  { readonly message: string }
>(EMPTY_PING_MESSAGE_ERROR) {}

// == CALCULATIONS ==

const normalizePingMessage = (
  message: PingCommand["message"],
): PingCommand["message"] => message.trim();

const buildPingValue = (message: PingCommand["message"]): PingResult => ({
  message: `pong: ${message}`,
});

// == ACTIONS ==

export const ping = (
  input: PingCommand,
): Effect.Effect<PingResult, EmptyPingMessageError> =>
  Effect.gen(function* () {
    const normalizedMessage = normalizePingMessage(input.message);

    if (normalizedMessage.length === 0) {
      return yield* Effect.fail(
        new EmptyPingMessageError({
          message: "Ping message must not be empty.",
          context: { message: input.message },
        }),
      );
    }

    return buildPingValue(normalizedMessage);
  });
