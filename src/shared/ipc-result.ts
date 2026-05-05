export type ErrorShape<Context = unknown> = {
  readonly code: string;
  readonly message: string;
  readonly context?: Context;
};

export type UnknownError = ErrorShape<{
  readonly cause: unknown;
}> & {
  readonly code: "UNKNOWN_ERROR";
};

export type Result<Value, Error = ErrorShape> =
  | {
      readonly ok: true;
      readonly value: Value;
    }
  | {
      readonly ok: false;
      readonly error: Error;
    };
