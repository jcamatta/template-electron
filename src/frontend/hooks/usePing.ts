import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ping } from "../lib/ping";

export const usePing = () => {
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: ping,
  });

  const errorMessage = (() => {
    if (mutation.error) {
      return t("error.unknown");
    }

    if (!mutation.data || mutation.data.ok) {
      return null;
    }

    switch (mutation.data.error.code) {
      case "EMPTY_PING_MESSAGE":
        return t("ping.error.emptyMessage");
      case "UNKNOWN_ERROR":
        return t("error.unknown");
    }
  })();

  return {
    ping: mutation.mutateAsync,
    result: mutation.data,
    isPending: mutation.isPending,
    unexpectedError: mutation.error,
    errorMessage,
  };
};
