import type { Result, UnknownError } from "../ipc-result";
import { pingContract } from "./ping";

export type IpcOperation<
  Endpoint extends string = string,
  Request = void,
  Response = never,
  Error = never,
> = {
  readonly endpoint: Endpoint;
  readonly request: Request;
  readonly response: Response;
  readonly error: Error;
};

export type IpcContract = {
  readonly ping: typeof pingContract;
};

export type IpcInput<Endpoint extends keyof IpcContract> =
  IpcContract[Endpoint]["request"];

export type IpcSuccess<Endpoint extends keyof IpcContract> =
  IpcContract[Endpoint]["response"];

export type IpcError<Endpoint extends keyof IpcContract> =
  | IpcContract[Endpoint]["error"]
  | UnknownError;

export type IpcResult<Endpoint extends keyof IpcContract> = Result<
  IpcSuccess<Endpoint>,
  IpcError<Endpoint>
>;
