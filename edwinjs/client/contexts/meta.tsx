import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";

type PageMetadata = {
  title: string;
};

const MetaContext = createContext<{
  meta: PageMetadata;
  setMeta: Dispatch<SetStateAction<PageMetadata>>;
}>(null!);

export function MetaProvider({ children }: { children: ReactNode }) {
  const [meta, setMeta] = useState<PageMetadata>(null!);
  return (
    <MetaContext.Provider value={{ meta, setMeta }}>
      {children}
    </MetaContext.Provider>
  );
}

export function useSetTitle(eventualTitle?: string) {
  const { setMeta } = useContext(MetaContext);
  const setTitle = (title: string) => {
    setMeta((old) => ({ ...old, title }));
    document.title = title;
  };
  useEffect(() => {
    if (!eventualTitle) return;
    setTitle(eventualTitle);
  }, [eventualTitle]);
  return setTitle;
}
