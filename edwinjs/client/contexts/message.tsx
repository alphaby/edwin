import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { ServerMessage } from "../lib/prisma";
import runtimeConfig from "../config";

type Message = ServerMessage | null;

const MessageContext = createContext<{
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}>(null!);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<Message>(null);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const { message, setMessage } = useContext(MessageContext);
  useEffect(() => {
    if (!message) return;
    setTimeout(function () {
      setMessage(null);
    }, (runtimeConfig().messageTimeout || 4) * 1000);
  }, [message]);
  return message;
}

export function useSetMessage() {
  const { setMessage } = useContext(MessageContext);
  return (message: string | Message) =>
    setMessage(
      typeof message === "string" ? { status: 200, message } : message
    );
}
