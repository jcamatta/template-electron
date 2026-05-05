import { useState } from "react";
import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { usePing } from "../hooks/usePing";

export function PingPanel() {
  const [message, setMessage] = useState("hello");
  const { ping, result, isPending, errorMessage } = usePing();

  const handlePing = async () => {
    await ping({ message });
  };

  return (
    <section className="grid w-full max-w-md gap-4 rounded-2xl border border-surface-2 bg-surface-3 p-6">
      <div className="grid gap-2">
        <h1 className="m-0 text-2xl leading-none font-semibold text-text-primary">
          Ping Example
        </h1>
        <p className="m-0 text-sm text-text-secondary">
          This component calls the backend through the shared IPC contract.
        </p>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-text-primary">Message</span>
        <Input
          className="box-border w-full rounded-xl border border-surface-2 bg-surface-1 px-4 py-3 text-text-primary"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message"
        />
      </label>

      <Button
        className="cursor-pointer rounded-xl bg-action-primary px-4 py-3 font-semibold text-surface-3 transition duration-150 ease-out hover:brightness-110 active:translate-y-px active:brightness-95 data-disabled:cursor-progress data-disabled:opacity-70"
        disabled={isPending}
        focusableWhenDisabled
        onClick={handlePing}
      >
        {isPending ? "Pinging..." : "Ping"}
      </Button>

      {result?.ok ? (
        <p className="m-0 text-sm text-feedback-success">
          {result.value.message}
        </p>
      ) : null}

      {result && !result.ok ? (
        <p className="m-0 text-sm text-action-destructive">{errorMessage}</p>
      ) : null}
    </section>
  );
}
