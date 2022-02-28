import { useTranslation } from "@edwin/client";

export default function Loading() {
  const t = useTranslation();
  return <div>{t("loading")}</div>;
}
