import React, { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { setConfig } from "../config";
import { AuthProvider } from "../contexts/auth";
import { MessageProvider } from "../contexts/message";
import { MetaProvider } from "../contexts/meta";
import "../lib/i18n";
import i18n from "../lib/i18n";

type Props = {
  translation?: Record<string, string>;
  messageTimeout?: number;
  children: ReactNode;
};

export default function EdwinApp({
  translation,
  messageTimeout,
  children,
}: Props) {
  if (messageTimeout) setConfig({ messageTimeout });
  if (translation)
    i18n.addResourceBundle("default", "translation", translation);

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <MetaProvider>
          <AuthProvider>
            <MessageProvider>{children}</MessageProvider>
          </AuthProvider>
        </MetaProvider>
      </I18nextProvider>
    </React.StrictMode>
  );
}
