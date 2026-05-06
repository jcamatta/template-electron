import type { ErrorShape } from "../ipc-result";

export type PingInput = {
  readonly message: string;
};

export type PingValue = {
  readonly message: string;
};

export type EmptyPingMessageError = ErrorShape<{
  readonly message: string;
}> & {
  readonly code: "EMPTY_PING_MESSAGE";
};

export type PingError = EmptyPingMessageError;

export const pingContract = {
  endpoint: "ping",
  request: undefined as unknown as PingInput,
  response: undefined as unknown as PingValue,
  error: undefined as unknown as PingError,
} as const;
