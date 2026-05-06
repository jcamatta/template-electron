import { Effect } from "effect";
import type { ErrorShape, Result } from "../../contract/ipc-result";
import { isDomainError } from "./core";

export const toErrorShape = (error: unknown): ErrorShape => {
  if (isDomainError(error)) {
    return {
      code: error.code,
      message: error.message,
      context: error.context,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "An unknown error occurred.",
    context: { cause: error },
  };
};

export const toErrorResult = (error: unknown): Result<never> => ({
  ok: false,
  error: toErrorShape(error),
});

export const toResult = <Value, Requirements>(
  effect: Effect.Effect<Value, unknown, Requirements>,
): Effect.Effect<Result<Value>, never, Requirements> =>
  Effect.match(effect, {
    onSuccess: (value) => ({
      ok: true as const,
      value,
    }),
    onFailure: (error) => toErrorResult(error),
  });
