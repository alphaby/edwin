import { ServerMessage, useTranslation } from "@edwin/client";

export default function Error(serverMessage: Partial<ServerMessage>) {
  const t = useTranslation();
  return (
    <div>
      {t("error")} {serverMessage.status} {" : "}
      {serverMessage.message || t(serverMessage.status)}
    </div>
  );
}
