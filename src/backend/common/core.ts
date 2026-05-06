import { Data } from "effect";

export const DOMAIN_ERROR_TYPE = "DomainError";

export type DomainErrorArgs<Context = never> = {
  readonly message: string;
  readonly context?: Context;
};

export type DomainErrorShape<Context = unknown> = {
  readonly type: typeof DOMAIN_ERROR_TYPE;
  readonly _tag: string;
  readonly code: string;
  readonly message: string;
  readonly context?: Context;
};

export const DomainError = <Code extends string, Context = never>(code: Code) =>
  class extends Data.TaggedError(code)<DomainErrorArgs<Context>> {
    readonly type = DOMAIN_ERROR_TYPE;
    readonly code: Code = code;
  };

export const isDomainError = (error: unknown): error is DomainErrorShape =>
  typeof error === "object" &&
  error !== null &&
  "type" in error &&
  error.type === DOMAIN_ERROR_TYPE;
